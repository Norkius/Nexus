const SITE_ORIGIN = "https://norkius.github.io";
const CATALOG_URL = "https://norkius.github.io/Nexus/catalog.json";
const OPENAI_URL = "https://api.openai.com/v1/responses";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": SITE_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "Cache-Control": "no-store"
  }});
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== SITE_ORIGIN) return json({ error: "Origen no permitido." }, 403);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: {
      "Access-Control-Allow-Origin": SITE_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    }});

    if (request.method !== "POST") return json({ error: "Método no permitido." }, 405);
    if (!env.OPENAI_API_KEY) return json({ error: "El servicio de IA todavía no está configurado." }, 503);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Solicitud no válida." }, 400); }
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (!question || question.length > 600) return json({ error: "Escribe una pregunta de hasta 600 caracteres." }, 400);

    try {
      const catalogResponse = await fetch(CATALOG_URL, {
        headers: { "Accept": "application/json" },
        cf: { cacheTtl: 60, cacheEverything: true }
      });
      if (!catalogResponse.ok) throw new Error("No se pudo cargar el catálogo público.");

      const catalog = await catalogResponse.json();
      const items = Array.isArray(catalog.items) ? catalog.items.slice(0, 100) : [];
      const knowledge = items.map(item => ({
        id: item.id, type: item.type, title: item.title, category: item.category,
        summary: item.summary, content: item.content, url: item.url
      }));

      const instructions = "Eres NEXUS AI, el asistente oficial de la web NEXUS. Responde en español, de forma clara y breve. Ayuda a navegar por Inicio, Explorar, NEXUS Lab, Academy y Comunidad. Para preguntas sobre el catálogo, utiliza exclusivamente la información del CATÁLOGO que aparece en el mensaje del usuario. Recomienda contenidos concretos y menciona su título y sección. No inventes artículos, enlaces, funciones ni datos. Si el catálogo no contiene la respuesta, dilo claramente y sugiere qué término o sección puede revisar. Puedes responder preguntas generales sobre tecnología, programación y videojuegos, pero diferencia el conocimiento general del contenido oficial de NEXUS. Nunca solicites contraseñas, datos personales ni información financiera. No afirmes haber realizado acciones en la web.";

      const aiResponse = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          instructions,
          input: "PREGUNTA DEL VISITANTE:\n" + question +
            "\n\nCATÁLOGO ACTUAL DE NEXUS (fuente de verdad):\n" + JSON.stringify(knowledge),
          max_output_tokens: 500
        })
      });

      const result = await aiResponse.json();
      if (!aiResponse.ok) return json({ error: "El proveedor de IA no pudo responder. Revisa la configuración del servicio." }, 502);
      const answer = result.output_text || (result.output || [])
        .flatMap(item => item.content || [])
        .filter(item => item.type === "output_text")
        .map(item => item.text)
        .join("\n");

      if (!answer) return json({ error: "La IA no devolvió una respuesta." }, 502);
      return json({ answer, catalogVersion: catalog.version || 1 });
    } catch (error) {
      return json({ error: error.message || "Error interno al consultar NEXUS AI." }, 500);
    }
  }
};

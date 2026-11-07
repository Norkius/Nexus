# NEXUS

**Conectando ideas, creando futuro.**

Plataforma web estática de tecnología, innovación, ciencia y aprendizaje. Diseñada para escritorio y móviles.

## Secciones

- **Explore:** artículos, búsqueda, filtros y lectura ampliada.
- **Lab:** proyectos, recursos y experimentos digitales.
- **Academy:** rutas introductorias de aprendizaje.
- **Community:** formulario local para proponer temas.
- **Panel de gestión local:** permite crear y borrar artículos desde el navegador.

## Archivos

- `index.html`: estructura y contenido.
- `styles.css`: diseño adaptable.
- `app.js`: navegación, tema, filtros, lector, panel y almacenamiento local.
- `.github/workflows/pages.yml`: despliegue automático con GitHub Actions.

## Publicación

El sitio se publica en GitHub Pages mediante GitHub Actions al actualizar `main`. Configura **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Limitaciones actuales importantes

NEXUS es actualmente una **web estática**. El panel de gestión, los artículos creados desde él y las sugerencias se guardan en `localStorage` del navegador que los crea. No se sincronizan con otros dispositivos ni con otros visitantes. No existe todavía registro/inicio de sesión, base de datos compartida, moderación, envío de formularios ni backend.

No introduzcas contraseñas, datos personales ni información privada en los formularios. El panel local no es un sistema de administración seguro y no debe utilizarse para proteger contenido sensible.

Para convertirlo en un CMS real con cuentas y contenido compartido será necesario elegir y configurar un backend o servicio de base de datos, reglas de acceso y autenticación. GitHub Pages solo aloja el frontend estático y no ejecuta código de servidor.

## Ejecutar localmente

Abre `index.html` en un navegador moderno. No requiere instalación.


## NEXUS AI (nuevo)

Se añadió la interfaz del asistente y un backend independiente para Cloudflare Workers. El backend obtiene el catálogo público desde `catalog.json` en cada consulta (con caché corta), de modo que los cambios publicados en ese archivo se incorporan sin editar el código del asistente. La clave de OpenAI debe guardarse como secreto del Worker; nunca debe ponerse en `app.js` ni en archivos públicos.

### Activación pendiente

1. Desplegar la carpeta `nexus-ai-worker` como un Cloudflare Worker.
2. Configurar el secreto `OPENAI_API_KEY` en el Worker (no compartirlo ni subirlo a GitHub).
3. Configurar el origen permitido en `nexus-ai-worker/src/index.js` si cambia el dominio público.
4. Copiar la URL pública del Worker y pegar la URL del Worker en la constante `NEXUS_AI_ENDPOINT` de `app.js` (inicialmente está vacía).
5. Publicar un artículo nuevo añadiendo un objeto a `catalog.json` y desplegar GitHub Pages. El asistente leerá el catálogo actualizado automáticamente.

El panel de gestión actual sigue guardando borradores solo en el navegador. No publica contenido en el catálogo compartido; para publicar, edita `catalog.json` desde GitHub. El asistente no se activa hasta configurar y desplegar el Worker y añadir el secreto. Puede haber costes por uso de la API; establece límites y supervisa el consumo antes de compartirlo ampliamente.

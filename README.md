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

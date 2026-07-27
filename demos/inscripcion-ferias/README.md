# Demo: Inscripción Ferias

Esta demo reproduce una experiencia reducida de una aplicación de inscripción a ferias.

## Qué muestra

- Una pantalla inicial de login con dos botones: `Ingresar como usuario` y `Ingresar como admin`.
- El usuario ve la página de una feria con el botón `Inscribirse`.
- El admin ve la misma página y puede ir a la lista de inscriptos.
- La lista de inscriptos está cargada con datos mock.

## Tecnología

- HTML
- CSS
- JavaScript
- Nginx para servir el sitio
- Docker Compose para levantar el gateway y el demo

## Cómo ejecutar

Desde la carpeta raíz del repositorio:

```bash
docker compose up --build
```

Luego abre:

```text
http://localhost:8080/demos/inscripcion-ferias
```

## Qué está simulado

- No hay backend real.
- El login no solicita credenciales.
- Los datos de la feria y los inscriptos son inventados.
- La inscripción sólo actualiza un mensaje local.

## Estructura

- `Dockerfile` — contenedor de Nginx para servir la demo.
- `nginx.conf` — configuración SPA.
- `index.html` — punto de entrada.
- `style.css` — estilos visuales.
- `src/app/main.js` — lógica de la demo y navegación.
- `src/app/feria/page.js` — vista de feria.
- `src/components/ListadoInscriptos.js` — vista de inscriptos.
- `src/data.js` — datos de feria e inscriptos.

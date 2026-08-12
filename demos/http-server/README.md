# HTTP Server Playground

Demo interactiva para experimentar con el servidor HTTP real escrito en C#.

## Qué hace

- `Echo`: devuelve el texto enviado con `GET /echo/<texto>`.
- `Create File`: crea un archivo de texto real dentro de un directorio aislado.
- `Read File`: lee un archivo real con `GET /files/<filename>` y muestra el contenido devuelto.

## Cómo funciona

La interfaz web actúa como cliente del servidor HTTP real. Cada interacción genera una request real y muestra la response exacta que devuelve el servidor, incluyendo headers y cuerpo.

## Ejecución local

```bash
docker compose up --build
```

Y abrir la demo desde el portal principal en:

```text
http://localhost:8080/demos/http-server/
```

## Reglas de la demo

- Los archivos se escriben en `demo-files/`, un directorio aislado dentro del contenedor.
- El nombre del archivo se sanitiza para evitar traversal y sólo se permiten archivos de texto pequeños.
- La demo no simula respuestas con `if` en JavaScript; cada acción llama al servidor HTTP real.

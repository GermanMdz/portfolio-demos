# Demo: Clasificador de números manuscritos

Demo interactiva del proyecto de IA que clasifica dígitos escritos a mano usando un modelo entrenado con MNIST.

## Funcionalidad

- Dibujar un único número sobre un canvas.
- Borrar el dibujo.
- Normalizar el trazo a una imagen de 28x28 píxeles.
- Enviar los 784 píxeles al backend Flask.
- Obtener la predicción del modelo y mostrarla en pantalla.

## Ejecución

Desde la raíz de `portfolio-demos`:

```bash
docker compose up --build
```

Abrir:

```text
http://localhost:8080/demos/ia/
```

## Arquitectura

- `app.py`: API Flask, carga del modelo e inferencia.
- `templates/index.html`: vista del proyecto.
- `static/app.js`: canvas, normalización y llamada a la API.
- `static/style.css`: estilos de la interfaz original.
- `model/numberClassifier.json`: copia del modelo necesario para la demo.

La demo es autónoma y no importa código desde `proyectos_reales`.

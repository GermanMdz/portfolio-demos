const canvas = document.getElementById("drawing-canvas");
const context = canvas.getContext("2d", { willReadFrequently: true });
const prediction = document.getElementById("prediction");
const predictButton = document.getElementById("predict-button");
const clearButton = document.getElementById("clear-button");
const apiBase = window.location.pathname.startsWith("/demos/ia") ? "/demos/ia" : "";

let drawing = false;
let modelReady = false;

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const source = event.touches ? event.touches[0] : event;
  return {
    x: (source.clientX - rect.left) * (canvas.width / rect.width),
    y: (source.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function startDrawing(event) {
  event.preventDefault();
  drawing = true;
  const point = canvasPoint(event);
  context.beginPath();
  context.moveTo(point.x, point.y);
  context.lineTo(point.x + 0.1, point.y + 0.1);
  context.stroke();
}

function draw(event) {
  if (!drawing) return;
  event.preventDefault();
  const point = canvasPoint(event);
  context.lineTo(point.x, point.y);
  context.stroke();
}

function stopDrawing() {
  drawing = false;
  context.closePath();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  prediction.textContent = modelReady ? "Modelo listo" : "Cargando modelo...";
}

function normalizedPixels() {
  const source = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const alpha = source[(y * canvas.width + x) * 4 + 3];
      if (alpha > 20) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < 0) return null;

  const sourceWidth = maxX - minX + 1;
  const sourceHeight = maxY - minY + 1;
  const scale = 20 / Math.max(sourceWidth, sourceHeight);
  const targetWidth = sourceWidth * scale;
  const targetHeight = sourceHeight * scale;
  const normalizedCanvas = document.createElement("canvas");
  normalizedCanvas.width = 28;
  normalizedCanvas.height = 28;
  const normalizedContext = normalizedCanvas.getContext("2d", { willReadFrequently: true });

  normalizedContext.drawImage(canvas, minX, minY, sourceWidth, sourceHeight, (28 - targetWidth) / 2, (28 - targetHeight) / 2, targetWidth, targetHeight);

  const preliminary = normalizedContext.getImageData(0, 0, 28, 28).data;
  let totalWeight = 0;
  let weightedX = 0;
  let weightedY = 0;
  for (let y = 0; y < 28; y += 1) {
    for (let x = 0; x < 28; x += 1) {
      const weight = preliminary[(y * 28 + x) * 4 + 3];
      totalWeight += weight;
      weightedX += x * weight;
      weightedY += y * weight;
    }
  }

  if (totalWeight > 0) {
    const centeredCanvas = document.createElement("canvas");
    centeredCanvas.width = 28;
    centeredCanvas.height = 28;
    const centeredContext = centeredCanvas.getContext("2d");
    centeredContext.drawImage(normalizedCanvas, 13.5 - weightedX / totalWeight, 13.5 - weightedY / totalWeight);
    normalizedContext.clearRect(0, 0, 28, 28);
    normalizedContext.drawImage(centeredCanvas, 0, 0);
  }

  const pixels = normalizedContext.getImageData(0, 0, 28, 28).data;
  const values = [];
  for (let index = 0; index < pixels.length; index += 4) values.push(pixels[index + 3]);
  return values;
}

async function predict() {
  if (!modelReady) {
    prediction.textContent = "Cargando modelo...";
    return;
  }

  const input = normalizedPixels();
  if (!input) {
    prediction.textContent = "Escribe un número primero";
    return;
  }

  prediction.textContent = "Prediciendo...";
  predictButton.disabled = true;
  try {
    const response = await fetch(`${apiBase}/process_data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) throw new Error(`Servidor respondió ${response.status}`);
    const result = await response.json();
    prediction.textContent = `Predicción: ${result}`;
  } catch (error) {
    console.error(error);
    prediction.textContent = "No se pudo realizar la predicción";
  } finally {
    predictButton.disabled = false;
  }
}

context.lineWidth = 20;
context.lineCap = "round";
context.lineJoin = "round";
context.strokeStyle = "#111827";
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);
clearButton.addEventListener("click", clearCanvas);
predictButton.addEventListener("click", predict);

fetch(`${apiBase}/health`)
  .then((response) => { if (!response.ok) throw new Error("Modelo no disponible"); return response.json(); })
  .then(() => { modelReady = true; prediction.textContent = "Modelo listo"; })
  .catch(() => { prediction.textContent = "No se pudo cargar el modelo"; });

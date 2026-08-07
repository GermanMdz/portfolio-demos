import json
import os
from pathlib import Path

import numpy as np
from flask import Flask, jsonify, render_template, request

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "numberClassifier.json"


def sigmoid(values):
    values = np.clip(values, -500, 500)
    return 1 / (1 + np.exp(-values))


def load_model():
    with MODEL_PATH.open(encoding="utf-8") as model_file:
        raw_model = json.load(model_file)
    weights = []
    biases = []
    layer_index = 0
    while f"layer{layer_index}" in raw_model:
        layer = raw_model[f"layer{layer_index}"]
        weights.append(np.asarray(layer["weights"], dtype=np.float64))
        biases.append(np.asarray(layer["biases"], dtype=np.float64))
        layer_index += 1
    return weights, biases


WEIGHTS, BIASES = load_model()
app = Flask(__name__)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/health")
def health():
    return jsonify({"status": "ok", "layers": len(WEIGHTS)})


@app.post("/process_data")
def process_data():
    payload = request.get_json(silent=True) or {}
    raw_input = payload.get("input")
    if not isinstance(raw_input, list) or len(raw_input) != 784:
        return jsonify({"error": "La entrada debe contener 784 píxeles."}), 400

    values = np.asarray(raw_input, dtype=np.float64).reshape(784, 1)
    values = np.clip(values, 0, 255) / 255.0
    for weights, biases in zip(WEIGHTS, BIASES):
        values = sigmoid(weights @ values + biases)

    return jsonify(int(np.argmax(values)))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))

# Fruit Type & Ripeness Classifier

An interactive web-based classifier that identifies fruit types and evaluates their ripeness using **TensorFlow.js** and **Teachable Machine** models. It supports both a universal combined classification model and a more accurate two-stage cascading classification pipeline.

---

## Features

- **Dual Modes of Classification**:
  - **Universal Classifier (`index.html`)**: A single unified model that classifies both fruit type and ripeness simultaneously.
  - **Two-Stage Cascading Pipeline (`pipeline.html`)**: A modular pipeline that first detects the type of fruit (Apple, Banana, or Mango), dynamically loads the specialized model for that specific fruit, and then predicts its ripeness.
- **Flexible Inputs**: Live webcam feed or image upload.
- **Dynamic UI**: Responsive progress bars, visual feedback with confidence levels, and active status tracking.
- **Caching Optimization**: The two-stage pipeline caches models in memory to avoid redundant loads, ensuring fast subsequent predictions.

---

## Repository Structure

```text
├── public/                     # Static frontend files and models
│   ├── combined_class/         # Universal classification models (TFJS format)
│   │   └── tfjs/
│   │       ├── model.json
│   │       └── metadata.json
│   ├── split_class/            # Specialized models for individual fruits
│   │   ├── type/               # Fruit detector (Apple, Banana, Mango, Other)
│   │   ├── apel/               # Specialized Apple ripeness model
│   │   ├── banan/              # Specialized Banana ripeness model
│   │   └── mango/              # Specialized Mango ripeness model
│   ├── index.html              # Main page (Universal Classifier)
│   └── pipeline.html           # Cascading pipeline page (Two-stage Classifier)
├── server.js                   # Express.js backend server
├── package.json                # Node.js dependencies and configurations
├── pyproject.toml              # Python environment definition
└── README.md                   # Project documentation
```

---

## How to Run the App

Running the application requires running both the Node.js Express server and the Python HTTP static server concurrently.

### Step 1: Start the Node.js Express Backend
This server runs the backend logic and serves the application routes.

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```
2. **Start the Express server**:
   ```bash
   node server.js
   ```
   *(By default, this server runs on [http://localhost:3000](http://localhost:3000))*

---

### Step 2: Start the HTTP Static File Server
This server hosts the static frontend assets and the TensorFlow.js model files inside the `public` directory. Any tool that can serve static files will work.

For example, using Python's built-in HTTP server:

1. **Navigate to the public directory**:
   ```bash
   cd public
   ```
2. **Start the server**:
   ```bash
   python -m http.server 8000
   ```
   *(By default, this server runs on [http://localhost:8000](http://localhost:8000))*

---
## Comparison: Universal Model vs. Two-Stage Pipeline
| Metric | Single Universal Model | Two-Stage Cascading Pipeline |
| :--- | :--- | :--- |
| **Accuracy** | Moderate (prone to class confusion) | **High** (highly specialized sub-models) |
| **Inference Speed** | **Fast** (single forward pass) | Slower (sequential forward passes) |
| **Model Size / Bandwidth** | Small (single model download) | Large (initial download of all models) |
| **Scalability** | Hard (requires full model retrains) | **Easy** (modular plug-and-play/extendable models) |
| **Logic Complexity** | **Simple** (no complex state management) | Complex (requires dynamic caching and GPU memory management) |
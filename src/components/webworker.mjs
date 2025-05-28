import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/pyodide.mjs";

let pyodideReadyPromise = loadPyodide().then((pyodide) => {
  self.postMessage({ ready: true });
  return pyodide;
});

self.onmessage = async (event) => {
  const pyodide = await pyodideReadyPromise;
  const { id, python, context } = event.data;
  await pyodide.loadPackagesFromImports(python);
  const dict = pyodide.globals.get("dict");
  const globals = dict(Object.entries(context));
  try {
    const result = await pyodide.runPythonAsync(python, { globals });
    self.postMessage({ result: String(result), id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};
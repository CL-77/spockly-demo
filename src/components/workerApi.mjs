function getPromiseAndResolve() {
  let resolve;
  let promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

let lastId = 1;
function getId() {
  return lastId++;
}

function requestResponse(worker, msg) {
  const { promise, resolve } = getPromiseAndResolve();
  const idWorker = getId();
  worker.addEventListener("message", function listener(event) {
    if (event.data?.id !== idWorker) {
      return;
    }
    worker.removeEventListener("message", listener);
    const { id, ...rest } = event.data;
    resolve(rest);
  });
  worker.postMessage({ id: idWorker, ...msg });
  return promise;
}

const pyodideWorker = new Worker(new URL("./webworker.mjs", import.meta.url), { type: "module" });

export { pyodideWorker };

export function asyncRun(script, context) {
  return requestResponse(pyodideWorker, {
    context,
    python: script,
  });
}

export function writeFile(filename, data) { 
  return requestResponse(pyodideWorker, {
    type: "writeFile",
    filename,
    data,
  });
}
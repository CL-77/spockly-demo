import { asyncRun } from "./workerApi.mjs";

const main = async function(code) {
  const installAndImportCode = `
import sys
import io
_stdout = io.StringIO()
sys.stdout = _stdout
`;

  const captureOutput = `
_output = _stdout.getvalue()
`;
//
  const script = `${installAndImportCode ? installAndImportCode + '\n' : ''}\n${code}\n${captureOutput}\n_output`;
  console.log("%cThis code is being compiled:\n", "font-size: 2em; color: violet", "\n" + script);

  const context = {};

  const { result, error } = await asyncRun(script, context);
  if (result) {
    console.log("%cOutput:", "font-size: 1.5em; color: green", '\n' + result);
  } else if (error) {
    console.error("Error:\n", error);
  }
  return result || error;
};

export default main;
import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "linear_regression",
    message0: "linear model: %1 ~ %2",
    args0: [
      { type: "field_input", name: "RESPONSE", text: "y" },
      { type: "field_input", name: "PREDICTOR", text: "x" },
    ],
    output: null,
    colour: "#A1887F",
    tooltip: "Run a linear regression",
  },
  {
    type: "semivariogram",
    message0: "compute semivariogram of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Compute a semivariogram",
  },
  {
    type: "kriging_interpolation",
    message0: "interpolate using kriging on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform kriging interpolation",
  },
  {
    type: "idw_interpolation",
    message0: "interpolate using IDW on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using inverse distance weighting"
  },
  {
    type: "nn_interpolation",
    message0: "interpolate using nearest neighbour on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using nearest neighbour"
  }
]);
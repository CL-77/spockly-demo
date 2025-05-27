import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "calculate_mean",
    message0: "mean of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    previousStatement: null,
    nextStatement: null,
    colour: "#BA68C8",
    tooltip: "Calculate mean of a column",
  },
  {
    type: "calculate_sd",
    message0: "standard deviation of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate standard deviation",
  },
  {
    type: "summary_statistics",
    message0: "summary of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Show summary statistics",
  },
  {
    type: "quantile_column",
    message0: "quantile of %1 at %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "field_input", name: "VALUES", text: "0.1, 0.5, 0.9" }
    ],
    output: null,
    colour: "#BA68C8",
    tooltip: "Compute quantiles at given probabilities",
  },
  {
    type: "sorted_element_at",
    message0: "sorted element of %1 at position %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "field_number", name: "INDEX", value: 1 }
    ],
    output: null,
    colour: "#BA68C8",
    tooltip: "Access an element from sorted vector",
  }
]);
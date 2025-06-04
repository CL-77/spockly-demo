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
  },
  {
    type: "calculate_median",
    message0: "median of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate the median of a column"
  },
  {
    type: "calculate_mse",
    message0: "mean squared error of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate the mean squared error of a column"
  },
  {
    type: "calculate_max",
    message0: "maximum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the maximum value of a column"
  },
  {
    type: "calculate_min",
    message0: "minimum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the minimum value of a column"
  },
  {
    type: "calculate_sum",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the sum of values in a column"
  }
]);

Blockly.Generator.R.forBlock["calculate_mean"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`mean(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_sd"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`sd(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["summary_statistics"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE);
  return [`summary(${data})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["quantile_column"] = function (block, generator) {
  const col = generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE);
  const probs = block.getFieldValue("VALUES");
  return [`quantile(${col}, probs = c(${probs}))`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["sorted_element_at"] = function (block, generator) {
  const vec = generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE);
  const index = block.getFieldValue("INDEX");
  return [`sort(${vec})[${index}]`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_median"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`median(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_mse"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`mean(((${col}) - mean(${col}))^2)`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_max"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`max(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_min"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`min(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_sum"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`sum(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};
import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "print_output",
    message0: "print output %1",
    args0: [{ type: "input_value", name: "TEXT" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Print output to the console",
  },
  {
    type: "preview_data",
    message0: "preview data %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Preview first rows of data",
  },
  {
    type: "show_structure",
    message0: "show structure of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show structure of an object",
  }
]);

// Histrogram block
Blockly.defineBlocksWithJsonArray([
	{
		type: "histogram_block",
		message0: "histogram of %1",
		args0: [
			{
				type: "input_value",
				name: "VECTOR",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 230,
		tooltip: "Generate a histogram of a given vector",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["histogram_block"] = function (block, generator) {
	const vector =
		generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
		"c()";
	return `hist(${vector})\n`;
};
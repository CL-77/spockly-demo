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
		colour: "#90A4AE",
		tooltip: "Generate a histogram of a given vector",
		helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/hist",
	},
]);

Blockly.Generator.R.forBlock["histogram_block"] = function (block, generator) {
	const vector =
		generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
		"c()";
	return `hist(${vector})\n`;
};

// Visualization blocks: boxplot, barplot, piechart, scatterplot
Blockly.defineBlocksWithJsonArray([
  {
    type: "boxplot_block",
    message0: "boxplot of %1",
    args0: [{ type: "input_value", name: "VECTOR" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Create a boxplot of the selected column",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/boxplot"
  },
  {
    type: "barplot_block",
    message0: "bar chart of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a bar chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/barplot"
  },
  {
    type: "piechart_block",
    message0: "pie chart of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a pie chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/pie"
  },
  {
    type: "scatterplot_block",
    message0: "scatterplot x: %1 y: %2",
    args0: [
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a scatterplot with x and y vectors",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/plot"
  }
]);
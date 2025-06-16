import * as Blockly from "blockly";

// --- Data Inspection Blocks ---
// Blocks for inspecting and previewing dataframes

Blockly.defineBlocksWithJsonArray([
    {
      type: "preview_head_n",
      message0: "preview first %1 rows of %2",
      args0: [
        {
          type: "field_number",
          name: "N",
          value: 5,
          min: 1
        },
        {
          type: "input_value",
          name: "DATA",
          check: "DataFrame"
        }
      ],
      output: "DataFrame",
      colour: "#FFA726",
      tooltip: "Preview the first N rows of a dataframe",
      helpUrl: "https://www.rdocumentation.org/packages/SparkR/versions/3.1.2/topics/head"
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
      type: "structure_overview",
      message0: "get structure of %1",
      args0: [
        {
          type: "input_value",
          name: "DATA",
          check: "DataFrame"
        }
      ],
	  previousStatement: null,
	  nextStatement: null,
      output: "String",
      colour: "#FFA726",
      tooltip: "Get the structure of a dataframe",
      helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/str"
    }
  ]);

Blockly.Generator.R.forBlock["structure_overview"] = function (block, generator) {
	const data =
	generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) ||
	'""';
	return `str(${data})\n`;
  };


  Blockly.defineBlocksWithJsonArray([
	{
		type: "data_summary",
		message0: "summary of %1",
		args0: [
			{
				type: "input_value",
				name: "DATA",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FFA726",
		tooltip: "Get summary statistics of a dataset.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["data_summary"] = function (block, generator) {
	const data =
		generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) ||
		'""';
	return `summary(${data})\n`;
};
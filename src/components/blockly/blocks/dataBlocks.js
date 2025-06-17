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

// --- Data Transformation Blocks ---
// Blocks to manipulate and transform dataframes

Blockly.defineBlocksWithJsonArray([
  {
    type: "data_shape",
    message0: "get shape of %1",
    args0: [
      {
        type: "input_value",
        name: "DATA",
        check: "DataFrame"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#FFA726",
    tooltip: "Get the shape of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
  },
  {
    type: "filter_rows",
    message0: "filter rows with condition %1",
    args0: [{ type: "field_input", name: "CONDITION", text: "value > 10" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Filter rows from a dataframe",
  },
  {
    type: "select_columns",
    message0: "select columns %1",
    args0: [{ type: "field_input", name: "COLUMNS", text: "col1, col2" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Select specific columns from a dataframe",
  },
  {
    type: "group_by_summarise",
    message0: "group by %1 and summarise %2",
    args0: [
      { type: "field_input", name: "GROUP_COL", text: "group" },
      { type: "field_input", name: "SUMMARISE", text: "mean(value)" }
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Group and summarise a dataset",
  },
  {
    type: "subset_rows",
    message0: "subset %1 from row %2 to %3",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" },
      { type: "field_number", name: "START", value: 1 },
      { type: "field_number", name: "END", value: 10 },
    ],
    output: "DataFrame",
    previousStatement: null,
    nextStatement: null,
    colour: "#FFA726",
    tooltip: "Subset rows of a dataset",
  },
  {
    type: "subset_column_range",
    message0: "column %1 of %2 from row %3 to %4",
    args0: [
      { type: "field_input", name: "COLUMN", text: "Sepal.Length" },
      { type: "field_dropdown", name: "DATASET", options: [["iris", "iris"]] },
      { type: "field_number", name: "START", value: 40 },
      { type: "field_number", name: "END", value: 60 }
    ],
    output: "Vector",
    colour: "#FFA726",
    tooltip: "Access a column range from a dataframe"
  }
]);

// --- Utility and Array Operation Blocks ---
// Blocks for array manipulation and other utility functions

Blockly.defineBlocksWithJsonArray([
  {
    type: "stack_data",
    message0: "stack data %1 and %2 using %3",
    args0: [
      { type: "input_value", name: "DATA1" },
      { type: "input_value", name: "DATA2" },
      {
        type: "field_dropdown",
        name: "METHOD",
        options: [
          ["rbind", "rbind"],
          ["cbind", "cbind"]
        ]
      }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Stack two data objects using rbind() or cbind()",
    helpUrl: "https://www.rdocumentation.org/packages/R6Frame/versions/0.1.0/topics/rbind"
  },
  {
    type: "append_array",
    message0: "append value %1 to %2",
    args0: [
      { type: "input_value", name: "VALUE" },
      { type: "input_value", name: "ARRAY" }
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Append a value to a vector using append()",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/append"
  },
  {
    type: "create_array",
    message0: "create array from %1 with dimension %2",
    args0: [
      { type: "input_value", name: "DATA" },
      { type: "input_value", name: "DIM" }
    ],
    output: "Array",
    colour: "#FFA726",
    tooltip: "Create an array from a dataset and a dimension vector",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/array"
  },
  {
    type: "sort_array",
    message0: "sort array %1 by %2 in %3 order",
    args0: [
      { type: "input_value", name: "ARRAY" },
      { type: "field_input", name: "COLUMN", text: "1" },
      {
        type: "field_dropdown",
        name: "ORDER",
        options: [["ascending", "TRUE"], ["descending", "FALSE"]]
      }
    ],
    output: "Array",
    colour: "#FFA726",
    tooltip: "Sort an array by a specific column in ascending or descending order",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sort"
  },
  {
    type: "slice_file",
    message0: "subset %1 with condition %2",
    args0: [
      { type: "input_value", name: "DATA" },
      { type: "field_input", name: "CONDITION", text: "value > 10" }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Subset data by condition, like data[condition, ]",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/data"
  }
]);
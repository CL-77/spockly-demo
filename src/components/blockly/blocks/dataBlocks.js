import * as Blockly from "blockly";

//
// ─── DATA INSPECTION BLOCKS ─────────────────────────────────────────────────────
//

Blockly.defineBlocksWithJsonArray([
  {
    type: "preview_head_n",
    message0: "preview first %1 rows of %2",
    args0: [
      { type: "field_number", name: "N", value: 5, min: 1 },
      { type: "input_value", name: "DATA", check: "DataFrame" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FF7043",
    tooltip: "Preview the first N rows of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/SparkR/versions/3.1.2/topics/head"
  },
  {
    type: "structure_overview",
    message0: "get structure of %1",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "String",
    colour: "#FF7043",
    tooltip: "Get the structure of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/str"
  },
  {
    type: "data_summary",
    message0: "summary of %1",
    args0: [
      { type: "input_value", name: "DATA" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Get summary statistics of a dataset.",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/summary"
  },
  {
	type: "length_data",
	message0: "length of %1",
	args0: [
		{ type: "input_value", name: "DATA", check: ["Vector", "Array", "DataFrame", "Variable"] }
	],
	previousStatement: null,
	nextStatement: null,
	output: "Number",
	colour: "#FF7043",
	tooltip: "Get the length of a vector or number of rows in a dataframe",
	helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/length"
	}
]);

Blockly.Generator.R.forBlock["structure_overview"] = function (block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || '""';
	return `str(${data})\n`;
  };
  
  Blockly.Generator.R.forBlock["data_summary"] = function (block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || '""';
	return `summary(${data})\n`;
  };

  Blockly.Generator.R.forBlock["preview_head_n"] = function (block, generator) {
	const n = block.getFieldValue("N");
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || '""';
	return `head(${data}, n = ${n})\n`;
  };
  
  // Block to implement the "table" function in R
  Blockly.defineBlocksWithJsonArray([
	  {
		  type: "data_table",
		  message0: "table of %1",
		  args0: [
			  {
				  type: "input_value",
				  name: "DATA",
			  },
		  ],
		  previousStatement: null,
		  nextStatement: null,
		  output: "String",
		  colour: "#FF7043",
		  tooltip: "Create a frequency table of a dataset.",
		  helpUrl: "",
	  },
  ]);
  
  Blockly.Generator.R.forBlock["data_table"] = function (block, generator) {
	  const data =
		  generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE)
	  return [`table(${data})`];
  };


  Blockly.Generator.R.forBlock['length_data'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	
	const code = `length(${data})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };

//
// ─── DATA TRANSFORMATION BLOCKS ─────────────────────────────────────────────────
//
Blockly.defineBlocksWithJsonArray([
	{
	  type: "data_shape",
	  message0: "get shape of %1",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "Vector",
	  colour: "#FF7043",
	  tooltip: "Get the dimensions (rows, columns) of a dataframe",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
	},
	{
	  type: "filter_rows",
	  message0: "filter %1 where %2",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
		{ type: "field_input", name: "CONDITION", text: "column > 10" }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Filter rows from a dataframe based on a condition",
	  helpUrl: "https://dplyr.tidyverse.org/reference/filter.html"
	},
	{
	  type: "select_columns",
	  message0: "select columns %1 from %2",
	  args0: [
		{ type: "field_input", name: "COLUMNS", text: "col1, col2" },
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Select specific columns from a dataframe",
	  helpUrl: "https://dplyr.tidyverse.org/reference/select.html"
	},
	{
	  type: "group_by_summarise",
	  message0: "group %1 by %2 and calculate %3",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
		{ type: "field_input", name: "GROUP_COL", text: "group" },
		{ type: "field_input", name: "SUMMARISE", text: "mean(value)" }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Group by a column and summarise with an expression (e.g. mean(value), sum(count))",
	  helpUrl: "https://dplyr.tidyverse.org/reference/summarise.html"
	},  
	{
	  type: "subset_rows",
	  message0: "subset %1 from row %2 to %3",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
		{ type: "field_number", name: "START", value: 1, min: 1 },
		{ type: "field_number", name: "END", value: 10, min: 1 }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Subset rows of a dataset from START to END",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset"
	},
	{
	  type: "subset_column_range",
	  message0: "column %1 of %2 from row %3 to %4",
	  args0: [
		{ type: "field_input", name: "COLUMN", text: "Sepal.Length" },
		{ type: "input_value", name: "DATASET", check: ["DataFrame", "Variable"] },
		{ type: "field_number", name: "START", value: 40, min: 1 },
		{ type: "field_number", name: "END", value: 60, min: 1 }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "Vector",
	  colour: "#FF7043",
	  tooltip: "Access a column range from a dataframe",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset"
	},
	{
	  type: "mutate_column",
	  message0: "add column %1 = %2 to %3",
	  args0: [
		{ type: "field_input", name: "COLUMN_NAME", text: "new_column" },
		{ type: "field_input", name: "EXPRESSION", text: "column1 + column2" },
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Add or modify a column with a calculated expression",
	  helpUrl: "https://dplyr.tidyverse.org/reference/mutate.html"
	},
	{
	  type: "arrange_data",
	  message0: "sort %1 by %2 %3",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
		{ type: "field_input", name: "COLUMN", text: "column" },
		{ type: "field_dropdown", name: "ORDER", options: [
		  ["ascending", "asc"],
		  ["descending", "desc"]
		]}
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FF7043",
	  tooltip: "Sort dataframe by a column in ascending or descending order",
	  helpUrl: "https://dplyr.tidyverse.org/reference/arrange.html"
	}
  ]);
  
  Blockly.Generator.R.forBlock['data_shape'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `dim(${data})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['filter_rows'] = function(block, generator) {
	generator.requirePackage('dplyr');
	
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const condition = block.getFieldValue('CONDITION') || 'TRUE';
	
	const code = `${data} %>% filter(${condition})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['select_columns'] = function(block, generator) {
	generator.requirePackage('dplyr');
	
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const columns = block.getFieldValue('COLUMNS') || '';
	
	const columnList = columns.split(',').map(col => col.trim()).filter(col => col.length > 0);
	
	let code;
	if (columnList.length > 0) {
	  const formattedColumns = columnList.map(col => {
		if ((col.startsWith('"') && col.endsWith('"')) || (col.startsWith("'") && col.endsWith("'"))) {
		  return col;
		}
		if (col.includes('(') || col.includes('=') || col.includes(':')) {
		  return col;
		}
		return col;
	  });
	  
	  code = `${data} %>% select(${formattedColumns.join(', ')})`;
	} else {
	  code = `${data} %>% select(everything())`;
	}
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['group_by_summarise'] = function(block, generator) {
	generator.requirePackage('dplyr');
	
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const groupCol = block.getFieldValue('GROUP_COL') || 'group';
	const summarise = block.getFieldValue('SUMMARISE') || 'n()';
	
	let summariseExpression;
	if (summarise.includes('=')) {
	  summariseExpression = summarise;
	} else {
	  summariseExpression = `result = ${summarise}`;
	}
	
	const code = `${data} %>% group_by(${groupCol}) %>% summarise(${summariseExpression})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['subset_rows'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const start = block.getFieldValue('START');
	const end = block.getFieldValue('END');
	
	const code = `${data}[${start}:${end}, ]`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['subset_column_range'] = function(block, generator) {
	const dataset = generator.valueToCode(block, 'DATASET', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const column = block.getFieldValue('COLUMN') || 'column';
	const start = block.getFieldValue('START');
	const end = block.getFieldValue('END');
	
	const cleanColumn = column.replace(/["']/g, '');
	
	const code = `${dataset}${cleanColumn}[${start}:${end}]`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['mutate_column'] = function(block, generator) {
	generator.requirePackage('dplyr');
	
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const columnName = block.getFieldValue('COLUMN_NAME') || 'new_column';
	const expression = block.getFieldValue('EXPRESSION') || '0';
	
	const code = `${data} %>% mutate(${columnName} = ${expression})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Generator.R.forBlock['arrange_data'] = function(block, generator) {
	generator.requirePackage('dplyr');
	
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const column = block.getFieldValue('COLUMN') || 'column';
	const order = block.getFieldValue('ORDER');
	
	let code;
	if (order === 'desc') {
	  code = `${data} %>% arrange(desc(${column}))`;
	} else {
	  code = `${data} %>% arrange(${column})`;
	}
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
  };



// Preview dataset (head + tail)
Blockly.defineBlocksWithJsonArray([
	{
		type: "preview_data",
		message0: "preview dataset(view head and tail) of %1",
		args0: [
			{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FF7043",
		tooltip: "Preview the dataset by showing the top and bottom rows",
		helpUrl: ""
	}
]);

Blockly.Generator.R.forBlock["preview_data"] = function (block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
	return `rbind(head(${data}, 3), tail(${data}, 3))\n`;
};

// Print full dataset
Blockly.defineBlocksWithJsonArray([
	{
		type: "print_data",
		message0: "print dataset %1",
		args0: [
			{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FF7043",
		tooltip: "Prints the entire loaded dataset",
		helpUrl: ""
	}
]);

Blockly.Generator.R.forBlock["print_data"] = function (block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
	return `print(${data})\n`;
};

// Show structure of the dataset
Blockly.defineBlocksWithJsonArray([
	{
		type: "show_structure",
		message0: "show structure of %1",
		args0: [
			{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FF7043",
		tooltip: "Show the structure of the loaded dataset (e.g., columns, types)",
		helpUrl: ""
	}
]);

Blockly.Generator.R.forBlock["show_structure"] = function (block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
	return `cat(capture.output(str(${data})), sep = "\\n")\n`;
};

// Show last N rows
Blockly.defineBlocksWithJsonArray([
	{
		type: "show_tail",
		message0: "tail %1 rows of %2",
		args0: [
			{ type: "field_number", name: "ROWS", value: 5, min: 1, max: 1000 },
			{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FF7043",
		tooltip: "Show tail n rows of the loaded dataset",
		helpUrl: ""
	}
]);

Blockly.Generator.R.forBlock["show_tail"] = function (block, generator) {
	const rows = block.getFieldValue("ROWS");
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
	return `tail(${data}, ${rows})\n`;
};

// Show first N rows
Blockly.defineBlocksWithJsonArray([
	{
		type: "show_rows",
		message0: "show first %1 rows of %2",
		args0: [
			{ type: "field_number", name: "ROWS", value: 5, min: 1, max: 1000 },
			{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] }
		],
		previousStatement: null,
		nextStatement: null,
		colour: "#FF7043",
		tooltip: "Show the first n rows of the loaded dataset",
		helpUrl: ""
	}
]);

Blockly.Generator.R.forBlock["show_rows"] = function (block, generator) {
	const rows = block.getFieldValue("ROWS");
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || "data";
	return `head(${data}, ${rows})\n`;
};
//
// ─── GENERATOR FUNCTIONS ────────────────────────────────────────────────────────
//



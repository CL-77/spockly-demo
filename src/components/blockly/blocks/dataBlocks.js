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
  }
]);

//
// ─── DATA TRANSFORMATION BLOCKS ─────────────────────────────────────────────────
//

Blockly.defineBlocksWithJsonArray([
  {
    type: "data_shape",
    message0: "get shape of %1",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#FF7043",
    tooltip: "Get the shape of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
  },
  {
    type: "filter_rows",
    message0: "filter rows with condition %1",
    args0: [
      { type: "field_input", name: "CONDITION", text: "value > 10" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF7043",
    tooltip: "Filter rows from a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/filter"
  },
  {
    type: "select_columns",
    message0: "select columns %1",
    args0: [
      { type: "field_input", name: "COLUMNS", text: "col1, col2" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF7043",
    tooltip: "Select specific columns from a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/sparklyr/versions/1.8.2/topics/select"
  },
  {
    type: "group_by_summarise",
    message0: "group by %1 and summarise %2",
    args0: [
      { type: "field_input", name: "GROUP_COL", text: "group" },
      { type: "field_input", name: "SUMMARISE", text: "mean(value)" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF7043",
    tooltip: "Group by a column and summarise with an expression (e.g. mean, sum)",
    helpUrl: "https://www.rdocumentation.org/packages/dplyr/topics/summarise"
  },  
  {
    type: "subset_rows",
    message0: "subset %1 from row %2 to %3",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" },
      { type: "field_number", name: "START", value: 1 },
      { type: "field_number", name: "END", value: 10 }
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
      { type: "field_dropdown", name: "DATASET", options: [["iris", "iris"]] },
      { type: "field_number", name: "START", value: 40 },
      { type: "field_number", name: "END", value: 60 }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#FF7043",
    tooltip: "Access a column range from a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/subset"
  }
]);

//
// ─── GENERATOR FUNCTIONS ────────────────────────────────────────────────────────
//

Blockly.Generator.R.forBlock["structure_overview"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || '""';
  return `str(${data})\n`;
};

Blockly.Generator.R.forBlock["data_summary"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || '""';
  return `summary(${data})\n`;
};

import * as Blockly from "blockly";

// --- Data Loading Blocks ---
// Blocks to load various types of data sources into the workspace

Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_csv",
	  message0: "load CSV file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.csv",
		},
	  ],
	  output: "DataFrame",
	  colour: "#FFA726",
	  tooltip: "Load a CSV file from WebR filesystem",
	  helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_csv"] = function (block, generator) {
	const filename = block.getFieldValue("FILENAME");
	return [`read.csv("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };
	  
Blockly.defineBlocksWithJsonArray([
  {
    type: "load_shapefile",
    message0: "load shapefile %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "map.shp",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a shapefile with st_read()",
    helpUrl: ""
  },
  {
    type: "load_raster",
    message0: "load raster file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "raster.tif",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a raster file using stars",
    helpUrl: ""
  },
  {
    type: "load_txt",
    message0: "load text file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "data.txt",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a text file using read.table()",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },
  {
    type: "load_json",
    message0: "load JSON file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "data.json",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a JSON file using jsonlite",
  },
  {
    type: "load_csv_url",
    message0: "load CSV from URL %1",
    args0: [
      {
        type: "field_input",
        name: "URL",
        text: "https://example.com/data.csv",
      },
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from a URL",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },
  {
    type: "load_builtin_dataset",
    message0: "load built-in dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a built-in dataset like iris",
    helpUrl: "https://www.rdocumentation.org/packages/datasets/versions/3.6.2/topics/iris"
  },
  {
    type: "get_dataset",
    message0: "use dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"]]
      }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Reference a built-in dataset"
  },
  {
    type: "load_api_data",
    message0: "load data from API %1",
    args0: [
      {
        type: "field_input",
        name: "API_URL",
        text: "https://api.example.com/data",
      },
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load data from a REST API endpoint",
    helpUrl: "https://www.rdocumentation.org/packages/httr/versions/1.4.2/topics/GET"
  }
]);

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

Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_geojson",
	  message0: "load GeoJSON file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.geojson",
		},
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a GeoJSON file",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_geojson"] = function (block, generator) {
	generator.requirePackage("sf");
	const filename = block.getFieldValue("FILENAME");
	return [`sf::st_read("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };

  Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_tif",
	  message0: "load GeoTIF file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.tif",
		},
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a tif file",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_tif"] = function (block, generator) {
	generator.requirePackage("terra");
	const filename = block.getFieldValue("FILENAME");
	return [`terra::rast("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };
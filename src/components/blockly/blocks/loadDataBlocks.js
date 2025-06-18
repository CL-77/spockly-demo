import * as Blockly from "blockly";

// ─── Data Loading Blocks ───────────────────────────────────────────────────────

Blockly.defineBlocksWithJsonArray([
  // Load CSV
  {
    type: "load_csv",
    message0: "load CSV file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.csv" }],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from WebR filesystem",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load TIF
  {
    type: "load_tif",
    message0: "load TIF file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.tif" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a tif file using terra::rast()",
    helpUrl: "https://www.rdocumentation.org/packages/terra/versions/1.7-39/topics/rast"
  },

  // Load GeoJSON
  {
    type: "load_geojson",
    message0: "load GeoJSON file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.geojson" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a GeoJSON file using sf::st_read()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_read"
  },

  // Load Shapefile
  {
    type: "load_shapefile",
    message0: "load shapefile %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "map.shp" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a shapefile (.shp) from WebR filesystem using sf::st_read()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_read"
  },

  // Load Raster (stars)
  {
    type: "load_raster",
    message0: "load raster file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "raster.tif" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a raster file using stars",
    helpUrl: "https://www.rdocumentation.org/packages/stars/versions/0.6-3/topics/read_stars"
  },

  // Load TXT
  {
    type: "load_txt",
    message0: "load text file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.txt" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a text file using read.table()",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load JSON
  {
    type: "load_json",
    message0: "load JSON file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.json" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a JSON file using jsonlite",
    helpUrl: "https://www.rdocumentation.org/packages/jsonlite/versions/1.8.7/topics/read_json"
  },

  // Load CSV from URL
  {
    type: "load_csv_url",
    message0: "load CSV from URL %1",
    args0: [{ type: "field_input", name: "URL", text: "https://example.com/data.csv" }],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from a URL",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load API data
  {
    type: "load_api_data",
    message0: "load data from API %1",
    args0: [{ type: "field_input", name: "API_URL", text: "https://api.example.com/data" }],
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load data from a REST API endpoint",
    helpUrl: "https://www.rdocumentation.org/packages/httr/versions/1.4.2/topics/GET"
  },

  // Load built-in dataset
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
    tooltip: "Load a built-in dataset like iris, mtcars or airquality. See full list in R's dataset package.",
    helpUrl: "https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/00Index.html"
  },

  // Reference built-in dataset
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
    previousStatement: null,
    nextStatement: null,
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Reference a built-in dataset"
  }
]);

//
// ─── GENERATOR FUNCTIONS ────────────────────────────────────────────────────────
//

// Generator for load_csv
Blockly.Generator.R.forBlock["load_csv"] = function (block, generator) {
  const filename = block.getFieldValue("FILENAME");
  return [`read.csv("${filename}")`, Blockly.Generator.R.ORDER_NONE];
};

// Generator for load_tif
Blockly.Generator.R.forBlock["load_tif"] = function (block, generator) {
  generator.requirePackage("terra");
  const filename = block.getFieldValue("FILENAME");
  return [`terra::rast("${filename}")`, Blockly.Generator.R.ORDER_NONE];
};

// Generator for load_geojson
Blockly.Generator.R.forBlock["load_geojson"] = function (block, generator) {
  generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
  const filename = block.getFieldValue("FILENAME");
  return [`sf::st_read("${filename}")`, Blockly.Generator.R.ORDER_NONE];
};

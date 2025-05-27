import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "read_stars",
    message0: "read raster using stars from %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "raster.tif" }],
    output: null,
    colour: "#64B5F6",
    tooltip: "Read raster data using the stars package",
  },
  {
    type: "crop_raster",
    message0: "crop raster %1 to extent %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_input", name: "EXTENT", text: "xmin, xmax, ymin, ymax" },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Crop raster data",
  },
  {
    type: "aggregate_raster",
    message0: "aggregate raster %1 with factor %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_number", name: "FACTOR", value: 2 },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Aggregate raster data",
  }
]);

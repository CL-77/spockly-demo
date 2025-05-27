import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "st_centroid",
    message0: "calculate centroid of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Calculate centroids of geometries",
  },
  {
    type: "st_transform",
    message0: "transform %1 to CRS %2",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_input", name: "CRS", text: "4326" },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Transform coordinate reference system",
  },
  {
    type: "st_buffer",
    message0: "buffer %1 by %2 units",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_number", name: "DISTANCE", value: 100 },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Create buffer around geometries",
  }
]);
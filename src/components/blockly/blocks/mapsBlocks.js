import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "plot_map",
    message0: "plot map of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Plot spatial data",
  },
  {
    type: "set_map_title",
    message0: "set map title to %1",
    args0: [{ type: "field_input", name: "TITLE", text: "Map Title" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Set the main title of the map",
  },
  {
    type: "color_by_attribute",
    message0: "color map by attribute %1",
    args0: [{ type: "field_input", name: "ATTRIBUTE", text: "value" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Color geometries by attribute",
  }
]);
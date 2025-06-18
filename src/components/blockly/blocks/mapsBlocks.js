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
    helpUrl: "https://www.rdocumentation.org/packages/ggplot2/versions/3.3.3/topics/ggplot"
  },
  {
    type: "set_map_title",
    message0: "set map title to %1",
    args0: [{ type: "field_input", name: "TITLE", text: "Map Title" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Set the main title of the map",
    helpUrl: "https://www.rdocumentation.org/packages/ggplot2/versions/3.3.3/topics/ggtitle"
  },
  {
    type: "color_by_attribute",
    message0: "color map by attribute %1",
    args0: [{ type: "field_input", name: "ATTRIBUTE", text: "value" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Color geometries by attribute",
  },
  {
    type: "create_map",
    message0: "create empty map",
    output: "Map",
    colour: "#81C784",
    tooltip: "Initialize an empty map",
    helpUrl: ""
  },
  {
    type: "create_marker",
    message0: "add marker at coordinates (x: %1, y: %2)",
    args0: [
      { type: "field_number", name: "X", value: 0 },
      { type: "field_number", name: "Y", value: 0 }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Add a marker to a map at specified coordinates",
    helpUrl: ""
  },
  {
    type: "create_polygon",
    message0: "add polygon with coordinates list %1",
    args0: [{ type: "input_value", name: "COORDS" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Add a polygon to the map",
    helpUrl: ""
  },
  {
    type: "create_circle",
    message0: "add circle at (x: %1, y: %2) with radius %3",
    args0: [
      { type: "field_number", name: "X", value: 0 },
      { type: "field_number", name: "Y", value: 0 },
      { type: "field_number", name: "RADIUS", value: 100 }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Draw a circle on the map",
    helpUrl: ""
  },
  {
    type: "create_polyline",
    message0: "add polyline with coordinates list %1",
    args0: [{ type: "input_value", name: "COORDS" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Add a polyline to the map",
    helpUrl: ""
  },
  {
    type: "create_rectangle",
    message0: "add rectangle bounds %1",
    args0: [{ type: "input_value", name: "BOUNDS" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Add a rectangle to the map using bounds",
    helpUrl: ""
  },
  {
    type: "choropleth_map",
    message0: "draw choropleth map with data %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Visualize data as a choropleth map",
    helpUrl: ""
  },
  {
    type: "add_geojson",
    message0: "add GeoJSON layer %1",
    args0: [{ type: "input_value", name: "GEOJSON" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Overlay a GeoJSON layer on the map",
    helpUrl: ""
  }
]);



import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "convert_to_bool",
    message0: "convert %1 to boolean",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Convert a value to TRUE or FALSE using as.logical()",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  },
  {
    type: "boolean_true",
    message0: "TRUE",
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Logical constant TRUE",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  },
  {
    type: "boolean_false",
    message0: "FALSE",
    output: "Boolean",
    colour: "#D32F2F",
    tooltip: "Logical constant FALSE",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/logical"
  }
]);
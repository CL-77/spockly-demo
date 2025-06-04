import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "export_plot_png",
    message0: "export plot to file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "plot.png",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Export the current plot to a PNG file",
    helpUrl: "https://www.rdocumentation.org/packages/Rcssplot/versions/1.0.0/topics/png"
  },
  {
    type: "export_data_csv",
    message0: "export data %1 to CSV file %2",
    args0: [
      {
        type: "input_value",
        name: "DATA",
        check: "DataFrame"
      },
      {
        type: "field_input",
        name: "FILENAME",
        text: "output.csv",
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Export a dataframe to a CSV file",
    helpUrl: "https://www.rdocumentation.org/packages/utils/topics/write.table"
  },
  {
    type: "save_workspace",
    message0: "save R workspace to file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "workspace.RData",
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Save the current R workspace",
    helpUrl: "https://www.rdocumentation.org/packages/imager/versions/0.45.2/topics/save.image"
  }
]);

// R code generators for export-related blocks
Blockly.Generator.R.forBlock["export_plot_png"] = function (block, generator) {
  const filename = block.getFieldValue("FILENAME");
  return `png("${filename}")\nplot()\ndev.off()\n`;
};

Blockly.Generator.R.forBlock["export_data_csv"] = function (block, generator) {
  const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE);
  const filename = block.getFieldValue("FILENAME");
  return `write.csv(${data}, file = "${filename}")\n`;
};

Blockly.Generator.R.forBlock["save_workspace"] = function (block, generator) {
  const filename = block.getFieldValue("FILENAME");
  return `save.image(file = "${filename}")\n`;
};
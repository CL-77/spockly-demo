import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import "./blockly/customBlocks"; // Import custom blocks
import { Box } from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";

const BlocklyComponent = ({ setCode, isDarkMode }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      // renderer: "zelos",
      toolbox: `
        <xml>
          <category name="Math" colour="#FF8A65">
            <block type="math_number"></block>
            <block type="consts"></block>
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="logic_compare"></block>
            <block type="math_square"></block>
            <block type="sqrt_of"></block>
            <block type="exp_of"></block>
            <block type="log_of"></block>
            <block type="trigo"></block>
            <block type="round"></block>
            <block type="modulo"></block>
          </category>

          <category name="Booleans" colour="#1d8425">
            <block type="to_bool"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
          </category>

          <category name="Data" colour="#FA2">
            <block type="load_csv"></block>
            <block type="load_csv_from_url"></block>
            <block type="load_txt"></block>
            <block type="load_json"></block>
            <block type="data_shape"></block>
            <block type="stacking"></block>
            <block type="add_object"></block>
            <block type="delete_object"></block>
            <block type="create_array"></block>
            <block type="list_filter"></block>
            <block type="sort"></block>
            <block type="reshape"></block>
            <block type="slice_file"></block>
          </category>

          <category name="Visualisation" colour="#90A4AE">
            <block type="create_folder"></block>
            <block type="func_download"></block>
            <block type="read_file"></block>
            <block type="write_file"></block>
            <block type="listdir"></block>
            <block type="chdir"></block>
            <block type="plot">
              <value name="title">
                <shadow type="text">
                  <field name="TEXT">Title</field>
                </shadow>
              </value>
              <value name="XLabel">
                <shadow type="text">
                  <field name="TEXT">X-axis</field>
                </shadow>
              </value>
              <value name="YLabel">
                <shadow type="text">
                  <field name="TEXT">Y-axis</field>
                </shadow>
              </value>
              <value name="Legend">
                <shadow type="text">
                  <field name="TEXT">Legend</field>
                </shadow>
              </value>
            </block>
            <block type="scatter">
              <value name="title">
                <shadow type="text">
                  <field name="TEXT">Title</field>
                </shadow>
              </value>
              <value name="XLabel">
                <shadow type="text">
                  <field name="TEXT">X-axis</field>
                </shadow>
              </value>
              <value name="YLabel">
                <shadow type="text">
                  <field name="TEXT">Y-axis</field>
                </shadow>
              </value>
              <value name="Legend">
                <shadow type="text">
                  <field name="TEXT">Legend</field>
                </shadow>
              </value>
            </block>
          </category>

          <category name="Statistics" colour="#BA68C8">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>

          <category name="Variables" custom="VARIABLE" colour="#A65E2E"></category>

          <category name="Imports" colour="#888">
            <block type="import0"></block>
            <block type="import1"></block>
            <block type="import2"></block>
            <block type="import3"></block>
          </category>

          <category name="Basic functions" colour="#123456">
            <block type="input"></block>
            <block type="slice"></block>
            <block type="lambda"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_access"></block>
            <block type="type"></block>
          </category>

          <category name="Functions" custom="PROCEDURE" colour="#05a219"></category>

          <category name="Geometry" colour="#4DD0E1">
            <block type="coords"></block>
            <block type="create_point"></block>
            <block type="buffer"></block>
            <block type="line_segment"></block>
            <block type="polygon"></block>
            <block type="multipolygon"></block>
            <block type="distance_calc"></block>
            <block type="centroid"></block>
            <block type="polygon_area"></block>
            <block type="polygon_perimeter"></block>
            <block type="bounding_box"></block>
          </category>

          <category name="Map" colour="#3E65F8">
            <block type="create_map"></block>
            <block type="create_marker"></block>
            <block type="create_polygon"></block>
            <block type="create_circle"></block>
            <block type="JSON_on_map"></block>
          </category>

          <category name="Other" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="operators"></block>
            <block type="repeat_times"></block>
            <block type="temp_var"></block>
            <block type="text"></block>
            <block type="line_break"></block>
            <block type="list_create"></block>
            <block type="arange">
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="step">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="linspace">
              <value name="number">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
          </category>
        </xml>
      `,
      theme: isDarkMode ? darkTheme : lightTheme,
      grid: {
        spacing: 40,
        length:4,
        colour: "#fff",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      trashcan: {

      }
    });
    
    return () => {
      if (linkRef.current) {
        linkRef.current.remove();
        linkRef.current = null;
      }
      workspaceRef.current?.dispose();
    };
  }, [isDarkMode]);

  globalThis.generateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialised.");
      return;
    }
    var libs = "", np, pd, gpd, sns, plt, requests, os, def_download;
    var pythonCode = pythonGenerator.workspaceToCode(workspaceRef.current);
    if(~pythonCode.indexOf('np.')) np = true;
    if(~pythonCode.indexOf('pd.')) pd = true;
    if(~pythonCode.indexOf('sns.')) sns = true;
    if(~pythonCode.indexOf('plt.')) plt = true;
    if(~pythonCode.indexOf('gpd.')) gpd = true;
    if(~pythonCode.indexOf('requests.')) requests = true;
    if(~pythonCode.indexOf('os.')) os = true;
    if(~pythonCode.indexOf('download(')) def_download = true;	
    libs += np ? "import numpy as np\n" : "";
    libs += pd ? "import pandas as pd\n" : "";
    libs += sns ? "import seaborn as sns\n" : ""; 
    libs += plt ? "import matplotlib.pyplot as plt\n" : "";
    libs += gpd ? "import geopandas as gpd\n" : "";
    libs += requests ? "import requests\n" : "";
    libs += os ? "import os\n" : "";
    libs += def_download ?  '' +
                            'def download(url, folder):\n' +
                            '\tfilename = os.path.join(folder, os.path.basename(url))\n' +
                            '\tif not os.path.exists(filename):\n' + 
                              '\t\twith requests.get(url, stream=True, allow_redirects=True) as r:\n' +
                                  '\t\t\twith open(filename, "wb") as f:\n' + 
                                      '\t\t\t\tfor chunk in r.iter_content(chunk_size=8192):\n' +
                                          '\t\t\t\t\tf.write(chunk)\n' + 
                              '\t\tprint("Downloaded ", filename)\n\n'
    : '';

    setCode(libs + '\n' + pythonCode);
  };

  return (
    <Box
      ref={ blocklyDiv }
      sx={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default BlocklyComponent;
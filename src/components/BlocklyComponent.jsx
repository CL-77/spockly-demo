import React, { useEffect, useRef, useMemo, useState } from "react";
import * as Blockly from "blockly";
import "./blockly/customBlocks";
import { Box, Fab, Typography, useTheme, Button } from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";
import { Upload, UploadFile } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import { FaBookOpen, FaMapMarkedAlt, FaQuestionCircle } from "react-icons/fa";
import { pythonGenerator } from "blockly/python";
import { english } from "../locales/english"
import { german } from "../locales/german"
import * as De from "blockly/msg/de";
import * as En from "blockly/msg/en"

const lang = navigator.languages;
// if(lang.some((l) => l.startsWith('de'))) { //Reactivate after testing
    Blockly.setLocale(De);
    Blockly.setLocale(german);
// } else {
  // Blockly.setLocale(En);
  // Blockly.setLocale(english);
// }

const BlocklyComponent = ({ setCode, isDarkMode, onUploadClick, workspaceRef }) => {
  const theme = useTheme();
  const blocklyDiv = useRef(null);
  const linkRef = useRef(null);

     // State to toggle between beginner and advanced block toolboxes
  const [level, setLevel] = useState("level1");

  // Blockly toolbox definition for Level 1 (Beginner)
  // Change content later
  const beginnerToolbox = `
        <xml>
          <category name="${Blockly.Msg.Categories["MATH"]}" colour="#FF8A65">
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

          <category name="${Blockly.Msg.Categories["BOOLEANS"]}" colour="#1d8425">
            <block type="to_bool"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
          </category>

          <category name="${Blockly.Msg.Categories["DATA"]}" colour="#FA2">
            <block type="sampleData"></block>
            <block type="read_file"></block>
            <block type="data_shape"></block>
            <block type="add_object"></block>
            <block type="delete_object"></block>
            <block type="sort"></block>
            <block type="delete_axes">
              <value name="ColArr">
                <block type="list_create">
                  <field name=""></field>
                </block>
              </value>
              <value name="IndArr">
                <block type="list_create">
                  <field name=""></field>
                </block>
              </value>
            </block>
          </category>

          <category name="${Blockly.Msg.Categories["VISUALISATION"]}" colour="#90A4AE">
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
          </category>

          <category name="${Blockly.Msg.Categories["STATISTICS"]}" colour="#BA68C8">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>

          <category name="${Blockly.Msg.Categories["VARIABLES"]}" custom="VARIABLE" colour="#A65E2E"></category>

          <category name="${Blockly.Msg.Categories["BASIC_FUNCTIONS"]}" colour="#123456">
            <block type="input"></block>
            <block type="slice"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_access"></block>
            <block type="type"></block>
          </category>

          <category name="${Blockly.Msg.Categories["GEOMETRY"]}" colour="#4DD0E1">
            <block type="coords"></block>
            <block type="create_point"></block>
            <block type="buffer"></block>
            <block type="line_segment"></block>
            <block type="polygon"></block>
            <block type="distance_calc"></block>
            <block type="centroid"></block>
            <block type="polygon_area"></block>
            <block type="polygon_perimeter"></block>
          </category>

          <category name="${Blockly.Msg.Categories["OTHER"]}" colour="#5C81A6">
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
          </category>
        </xml>
      `;
      const advancedToolbox = `
        <xml>
          <category name="${Blockly.Msg.Categories["MATH"]}" colour="#FF8A65">
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

          <category name="${Blockly.Msg.Categories["BOOLEANS"]}" colour="#1d8425">
            <block type="to_bool"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
          </category>

          <category name="${Blockly.Msg.Categories["DATA"]}" colour="#FA2">
            <block type="sampleData"></block>
            <block type ="plotly_scatter_mapbox"></block>
            <block type="create_folder"></block>
            <block type="func_download"></block>
            <block type="read_file"></block>
            <block type="write_file"></block>
            <block type="listdir"></block>
            <block type="chdir"></block>
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
            <block type="delete_axes">
              <value name="ColArr">
                <block type="list_create">
                  <field name=""></field>
                </block>
              </value>
              <value name="IndArr">
                <block type="list_create">
                  <field name=""></field>
                </block>
              </value>
            </block>
          </category>

          <category name="${Blockly.Msg.Categories["VISUALISATION"]}" colour="#90A4AE">
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
            <block type="pie_chart">
              <value name="title">
                <shadow type="text">
                  <field name="TEXT">Title</field>
                </shadow>
              </value>
            </block>
            <block type="bar_chart">
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
            </block>
          </category>

          <category name="${Blockly.Msg.Categories["STATISTICS"]}" colour="#BA68C8">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>

          <category name="${Blockly.Msg.Categories["VARIABLES"]}" custom="VARIABLE" colour="#A65E2E"></category>

          <category name="${Blockly.Msg.Categories["IMPORTS"]}" colour="#888">
            <block type="import0"></block>
            <block type="import1"></block>
            <block type="import2"></block>
            <block type="import3"></block>
          </category>

          <category name="${Blockly.Msg.Categories["BASIC_FUNCTIONS"]}" colour="#123456">
            <block type="input"></block>
            <block type="slice"></block>
            <block type="lambda"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_access"></block>
            <block type="type"></block>
          </category>

          <category name="${Blockly.Msg.Categories["PROCEDURES"]}" custom="PROCEDURE" colour="#05a219"></category>

          <category name="${Blockly.Msg.Categories["GEOMETRY"]}" colour="#4DD0E1">
            <block type="coords"></block>
            <block type="create_point"></block>
            <block type="buffer"></block>
            <block type="line_segment"></block>
            <block type="polygon"></block>
            <block type="multipolygon"></block>
            <block type="distance_calc"></block>
            <block type="distance_vinc"></block>
            <block type="distance_sph"></block>
            <block type="distance_rect"></block>
            <block type="distance_manhattan"></block>
            <block type="distance_haversine"></block>
            <block type="centroid"></block>
            <block type="polygon_area"></block>
            <block type="polygon_perimeter"></block>
            <block type="bounding_box"></block>
          </category>

          <category name="${Blockly.Msg.Categories["MAPS"]}" colour="#3E65F8">
            <block type="create_map"></block>
            <block type="create_marker"></block>
            <block type="create_polygon"></block>
            <block type="create_circle"></block>
            <block type="create_rectangle"></block>
            <block type="create_polyline"></block>
            <block type="Choropleth_map"></block>
            <block type="JSON_on_map"></block>
          </category>

          <category name="${Blockly.Msg.Categories["OTHER"]}" colour="#5C81A6">
            <block type="while_loop"></block>
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
      `;
      const toolboxXml = useMemo(() => {
    return level === "level1" ? beginnerToolbox : advancedToolbox;
  }, [level, beginnerToolbox, advancedToolbox]);

  // Initialize Blockly with the selected theme and toolbox whenever the theme or level changes
  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXml,
      // renderer: "zelos",
      theme: isDarkMode ? darkTheme : lightTheme,
      grid: {
        spacing: 40,
        length: 4,
        colour: "#fff",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
      },
      move: {
        drag: true,
        wheel: true,
      },
      trashcan: {},
    });
    
    return () => {
      if (linkRef.current) {
        linkRef.current.remove();
        linkRef.current = null;
      }
      workspaceRef.current?.dispose();
    };
  }, [isDarkMode, toolboxXml, workspaceRef]);

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
    libs += plt ? 'import matplotlib.pyplot as plt' : "";
// import io
// import base64
// import js
// 
// class Dud:
    // def __init__(self, *args, **kwargs) -> None:
        // return
    // 
    // def __getattr__(self, __name: str):
        // return Dud
// 
// js.document = Dud()` : "";
    libs += gpd ? "import geopandas as gpd\n" : "";
    libs += requests ? "import requests\n" : "";
    libs += os ? "import os\n" : "";
    libs += def_download ?  'import requests\n' +
                            'import os\n' +
                            'def download(url, folder):\n' +
                            '\tfilename = os.path.join(folder, os.path.basename(url))\n' +
                            '\tif not os.path.exists(filename):\n' + 
                              '\t\twith requests.get(url, stream=True, allow_redirects=True) as r:\n' +
                                  '\t\t\twith open(filename, "wb") as f:\n' + 
                                      '\t\t\t\tfor chunk in r.iter_content(chunk_size=8192):\n' +
                                          '\t\t\t\t\tf.write(chunk)\n' + 
                              '\t\tprint("Downloaded ", filename)\n\n'
    : '';
    // if(plt) pythonCode += `
// bytes_io = io.BytesIO()
// plt.savefig(bytes_io, format='jpg')
// bytes_io.seek(0)
// base64_encoded_spectrogram = base64.b64encode(bytes_io.read())
// print(base64_encoded_spectrogram.decode('utf-8'))`;
    setCode((libs ? libs + '\n' : '') + pythonCode);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Top bar with Upload button and Level toggle */}
      <Box
        display="flex"
        alignItems="stretch"
        justifyContent="space-between"
        px={ 3 }
        py={ 1.5 }
        mb={ 2 }
        sx={{
          bgcolor: isDarkMode ? "#2b2d42" : "#e7ebf0",
          borderRadius: 2,
          boxShadow: 3,
          border: "1px solid",
          borderColor: isDarkMode ? "#4e5d6c" : "#ccd6df",
        }}
      >
        {/* <Box display="flex" alignItems="center" gap={ 2 } flex={ 1 } minWidth={ 0 }>
          <Button
            variant="contained"
            onClick={ onUploadClick }
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: isDarkMode ? "#FFFFFA" : "#000000",
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
                color: "#fff",
              },
              borderRadius: 2,
              textTransform: "none",
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Upload fontSize="medium" />
            UPLOAD DATA FILE
          </Button>
        </Box> */}
        <Box display="flex" alignItems="center" gap={ 2 } flex={ 1 } justifyContent="flex-end" minWidth={ 0 }>
          <ToggleButtonGroup
            exclusive
            value={ level }
            onChange={ (e, newLevel) => newLevel && setLevel(newLevel) }
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <ToggleButton value="level1" sx={{ px: 2, py: 1, gap: 1 }}>
              <FaBookOpen /> Beginner
            </ToggleButton>
            <ToggleButton value="level2" sx={{ px: 2, py: 1, gap: 1 }}>
              <FaMapMarkedAlt /> Advanced
            </ToggleButton>
          </ToggleButtonGroup>
          <Tooltip
            title={
              <Box>
                Beginner: built-in datasets & simple blocks.<br />
                Advanced: load files, model, visualise spatial data.<br />
                Click to see tutorials for more.
              </Box>
            }
            arrow
            enterDelay={ 0 }
          >
            <IconButton
              component="a"
              href="/tutorials"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit" }}
            >
              <FaQuestionCircle />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/* Blockly rendering area */}
      <Box
        ref={ blocklyDiv }
        sx={{
          height: "90%",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      />
    </Box>
  );
};

export default BlocklyComponent;
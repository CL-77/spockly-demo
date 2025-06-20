import React, { useEffect, useRef, useMemo, useState } from "react";
import * as Blockly from "blockly";
import "./blockly/customBlocks"; // Import custom blocks
import "./blockly/customGenerator"; // Import custom generator
import "./blockly/rBlocks"; // Import R blocks
import { Box, Fab, Typography, useTheme, Button } from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";
import { Upload, UploadFile } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import { FaBookOpen, FaMapMarkedAlt, FaQuestionCircle } from "react-icons/fa";
import { Toolbar } from "@mui/material";

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
  <category name="Tests" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="math_number"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
    <block type="sin_of"></block>
    <block type="round_value"></block>
    <block type="modulo_values"></block>
    <block type="math_arithmetic"></block>
    <block type="text"></block>
    <block type="text_print"></block>
    <block type="histogram_block"></block>
    <block type="rnorm_block"></block>
    <block type="print_files"></block> 
    <block type="head_print"></block>
    <block type="print_hello"></block>
    <block type="math_square"></block>
    <block type="text_greeting"></block>
    <block type="repeat_times"></block>
    <block type="dropdown_color"></block>
    <block type="create_vector"></block>
    <block type="plot_vector"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
    <block type="get_dataset"></block>
	  <block type="load_csv"></block>
	  <block type="load_geojson"></block>
	  <block type="load_tif"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="data_summary"></block>
    <block type="structure_overview"></block>
    <block type="preview_head_n"></block>
  </category>

  <category name="Variables" colour="#7d4561" custom="VARIABLE"></category>
  
  <category name="Booleans" colour="#D32F2F">
    <block type="convert_to_bool"></block>
    <block type="boolean_true"></block>
    <block type="boolean_false"></block>
  </category>

  <category name="Maths" colour="#FF8A65">
    <block type="math_number"></block>
    <block type="sum_vector"></block>
    <block type="vector_minus_scalar"></block>
    <block type="square_vector"></block>
    <block type="sqrt_vector"></block>
    <block type="divide_values"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="calculate_median"></block>
    <block type="calculate_max"></block>
    <block type="calculate_min"></block>
    <block type="calculate_sum"></block>
  </category>  

  <category name="Transformations" colour="#FFD54F">
    <block type="filter_rows"></block>
    <block type="select_columns"></block>
    <block type="subset_rows"></block>
    <block type="subset_column_range"></block>
	<block type="convert_to_sf"></block>
  </category>

  <category name="Maps" colour="#81C784">
    <block type="plot_map"></block>
    <block type="set_map_title"></block>
    <block type="color_by_attribute"></block>
    <block type="create_marker"></block>
    <block type="create_polygon"></block>
    <block type="create_circle"></block>
    <block type="create_polyline"></block>
    <block type="create_rectangle"></block>
    <block type="choropleth_map"></block>
    <block type="add_geojson"></block>
  </category>
  
  <category name="Visualization" colour="#90A4AE">
    <block type="print_output"></block>
    <block type="histogram_block"></block>
    <block type="boxplot_block"></block>
    <block type="barplot_block"></block>
    <block type="piechart_block"></block>
    <block type="scatterplot_block"></block>
  </category>

  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>
</xml>
`;

// Blockly toolbox definition for Level 2 (Advanced)
// Change content later
  const advancedToolbox = `
<xml>
  <category name="Tests" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="math_number"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
    <block type="sin_of"></block>
    <block type="round_value"></block>
    <block type="modulo_values"></block>
    <block type="math_arithmetic"></block>
    <block type="text"></block>
    <block type="text_print"></block>
    <block type="histogram_block"></block>
    <block type="rnorm_block"></block>
    <block type="print_files"></block> 
    <block type="head_print"></block>
    <block type="print_hello"></block>
    <block type="math_square"></block>
    <block type="text_greeting"></block>
    <block type="repeat_times"></block>
    <block type="dropdown_color"></block>
    <block type="create_vector"></block>
    <block type="plot_vector"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
    <block type="get_dataset"></block>
    <block type="load_csv"></block>
    <block type="load_shapefile"></block>
    <block type="load_raster"></block>
    <block type="load_txt"></block>
    <block type="load_json"></block>
    <block type="load_geojson"></block>
	  <block type="load_tif"></block>
    <block type="load_csv_url"></block>
    <block type="load_api_data"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="data_summary"></block>
    <block type="structure_overview"></block>
    <block type="preview_head_n"></block>
    <block type="data_shape"></block>
    <block type="filter_rows"></block>
    <block type="select_columns"></block>
    <block type="group_by_summarise"></block>
    <block type="subset_rows"></block>
    <block type="subset_column_range"></block>
  </category>

  <category name="Variables" colour="#7d4561" custom="VARIABLE"></category>
  
  <category name="Booleans" colour="#D32F2F">
    <block type="convert_to_bool"></block>
    <block type="boolean_true"></block>
    <block type="boolean_false"></block>
  </category>

  <category name="Maths" colour="#FF8A65">
    <block type="math_number"></block>
    <block type="sum_vector"></block>
    <block type="vector_minus_scalar"></block>
    <block type="square_vector"></block>
    <block type="sqrt_vector"></block>
    <block type="divide_values"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
    <block type="sin_of"></block>
    <block type="round_value"></block>
    <block type="modulo_values"></block>
    <block type="math_arithmetic"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="summary_statistics"></block>
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="quantile_column"></block>
    <block type="sorted_element_at"></block>
    <block type="calculate_median"></block>
    <block type="calculate_mse"></block>
    <block type="calculate_max"></block>
    <block type="calculate_min"></block>
    <block type="calculate_sum"></block>
  </category>

  <category name="Transformations" colour="#FFD54F">
	  <block type="convert_to_sf"></block>
    <block type="sort_array"></block>
    <block type="stack_data"></block>
    <block type="append_array"></block>
    <block type="create_array"></block>
    <block type="slice_file"></block>
  </category>

    <category name="Maps" colour="#81C784">
    <block type="plot_map"></block>
    <block type="set_map_title"></block>
    <block type="color_by_attribute"></block>
    <block type="create_marker"></block>
    <block type="create_polygon"></block>
    <block type="create_circle"></block>
    <block type="create_polyline"></block>
    <block type="create_rectangle"></block>
    <block type="choropleth_map"></block>
    <block type="add_geojson"></block>
  </category>y>

  <category name="Visualization" colour="#90A4AE">
    <block type="print_output"></block>
    <block type="histogram_block"></block>
    <block type="boxplot_block"></block>
    <block type="barplot_block"></block>
    <block type="piechart_block"></block>
    <block type="scatterplot_block"></block>
  </category>

  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>

  <category name="Modeling" colour="#A1887F">
    <block type="linear_model_block"></block>
    <block type="semivariogram"></block>
    <block type="kriging_interpolation"></block>
    <block type="idw_interpolation"></block>
    <block type="nn_interpolation"></block>
  </category>

  <category name="Geometry" colour="#4DD0E1">
    <block type="st_centroid"></block>
    <block type="st_transform"></block>
    <block type="st_buffer"></block>
    <block type="st_coords"></block>
    <block type="st_point"></block>
    <block type="st_linestring"></block>
    <block type="st_polygon"></block>
    <block type="st_multipolygon"></block>
    <block type="st_distance"></block>
    <block type="st_area"></block>
    <block type="st_length"></block>
    <block type="st_bbox"></block>
    <block type="st_crs"></block>
    <block type="st_geometry_type"></block>
  </category>

  <category name="Raster" colour="#64B5F6">
    <block type="crop_raster"></block>
    <block type="aggregate_raster"></block>
  </category>
</xml>
`;

  const toolboxXml = useMemo(() => {
    return level === "level1" ? beginnerToolbox : advancedToolbox;
  }, [level]);

  // Initialize Blockly with the selected theme and toolbox whenever the theme or level changes
  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      renderer: "zelos",
      toolbox: toolboxXml,
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
  }, [isDarkMode, toolboxXml]);

  // Render the Blockly workspace and UI for file upload and level selection
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
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: isDarkMode ? "#150e31" : "#f5f5f5",
          mb: 2,
          borderRadius: 4,
        }}
        >
        <Tooltip title="Upload your CSV, GeoJSON or TIF data." arrow>
          <Button
            id="uploadDataButton"
            variant="contained"
            onClick={onUploadClick}
            sx={{
              width: 48,
              height: 48,
              minWidth: 0,
              borderRadius: "50%",
              bgcolor: theme.palette.secondary.main,
              color: isDarkMode ? "#FFFFFA" : "#000000",
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
                color: "#fff",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
            }}
          >
            <Upload fontSize="medium" />
          </Button>
        </Tooltip>

        <Box display="flex" alignItems="center" gap={2} flex={1} justifyContent="flex-end" minWidth={0}>
        <Tooltip
            title={
              <Box>
                Beginner: built-in datasets & simple blocks.<br />
                Advanced: load files, model, visualize spatial data.<br />
                See tutorials for more information.
              </Box>
            }
            arrow
            enterDelay={0}
          >
          <ToggleButtonGroup
            exclusive
            value={level}
            onChange={(e, newLevel) => newLevel && setLevel(newLevel)}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
            id="switchLevelsButton"
          >
            <ToggleButton value="level1" sx={{ px: 2, py: 1, gap: 1 }}>
              <FaBookOpen /> Beginner
            </ToggleButton>
            <ToggleButton value="level2" sx={{ px: 2, py: 1, gap: 1 }}>
              <FaMapMarkedAlt /> Advanced
            </ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>

         { /* Help button to start Spockly tour */}
         <Tooltip title="Start Spockly Tour" arrow>
          <IconButton
            onClick={() => window?.__startSpocklyTour?.()}
            sx={{ color: "inherit" }}
          >
            <FaQuestionCircle />
          </IconButton>
        </Tooltip>
        </Box>
        </Toolbar>

      {/* Blockly rendering area */}
      <Box
        id="blocklyWorkspaceContainer"
        ref={blocklyDiv}
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
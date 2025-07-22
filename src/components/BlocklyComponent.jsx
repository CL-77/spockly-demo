import { useEffect, useRef, useMemo, useState } from "react";
import * as Blockly from "blockly";
import "./blockly/customBlocks";
import "./blockly/customGenerator";
import "./blockly/rBlocks";
import {
  Box,
  useTheme,
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";
import {
  Co2Outlined,
  QuestionMark,
  Upload,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { MdChecklist, MdCreate } from "react-icons/md";

import CreateDataDialog from "./CreateDataDialog.jsx";
import CheckUploadedDataDialog from "./CheckUploadedDataDialog.jsx";
import CO2Tutorial from "./Co2Tutorial.jsx";

const BlocklyComponent = ({ isDarkMode, onUploadClick, workspaceRef }) => {
  const theme = useTheme();
  const blocklyDiv = useRef(null);

  const [level, setLevel] = useState("level1");
  const [openCO2Tutorial, setOpenCO2Tutorial] = useState(false);
  const [openCreateDataDialog, setOpenCreateDataDialog] = useState(false);
  const [showCheckDataDialog, setShowCheckDataDialog] = useState(false);
  const [stepCO2Tutorial, setStepCO2Tutorial] = useState(0);

  // Tutorial Functions
  const handleOpenCO2Tutorial = () => {
    setStepCO2Tutorial(0);
    setOpenCO2Tutorial(true);
  };
  const handleCloseCO2Tutorial = () => setOpenCO2Tutorial(false);

  const nextStepCO2Tutorial = () => setStepCO2Tutorial((prev) => prev + 1);
  const prevStepCO2Tutorial = () => setStepCO2Tutorial((prev) => prev - 1);

  // Level Selectbox Functions
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  // Blockly toolbox definition for Level 1 (Beginner)
  const beginnerToolbox = `
<xml>
  <category name="Tests" colour="#5C81A6">
    <block type="head_print"></block>	
	<block type="install_package"></block>
	<block type="plot_vector"></block>
	<block type="load_geojson_to_leaflet"></block>
	<block type="load_csv_to_leaflet"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
	<block type="load_csv"></block>
	<block type="load_geojson"></block>
	<block type="load_tif"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="access_column"></block>
	<block type="structure_overview"></block>
    <block type="data_summary"></block>
    <block type="data_table"></block>
	<block type="length_data"></block>
	<block type="show_tail"></block>
	<block type="show_rows"></block>
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
	<block type="rnorm_block"></block>
  </category>
  
  <category name="Text" colour="#0f45a3">
    <block type="text"></block>
	<block type="text_print"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="calculate_quantile"></block>
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
	    <block type="rename_column">
      <value name="COLUMN_NUMBER">
        <block type="math_number">
          <field name="NUM"></field>
        </block>
      </value>
      <value name="NEW_NAME">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
	<block type="convert_to_sf"></block>
	<block type="convert_to_dataframe"></block>
  </category>

<category name="Maps" colour="#67c761">
  <label text="Create Map" web-class="toolboxLabel"></label>
  <block type="create_map_beginner">
    <field name="LOCATION">new_york</field>
    <field name="ZOOM">10</field>
	<field name="STYLE">osm</field>
  </block>
  
<label text="Load Your Data" web-class="toolboxLabel"></label>
<block type="load_data_to_map_beginner">
  <field name="DISPLAY_TYPE">markers</field>
  <field name="POPUP_FIELD">auto</field>
  <value name="DATA_FILE">
    <block type="text">
      <field name="TEXT">data.csv</field>
    </block>
  </value>
</block>
  
  <label text="Add to Map" web-class="toolboxLabel"></label>
  <block type="add_marker_beginner">
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">40.7128</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">-74.0060</field>
      </block>
    </value>
    <value name="LABEL">
      <block type="text">
        <field name="TEXT">New York City</field>
      </block>
    </value>
  </block>
  
  <block type="add_circle_beginner">
    <field name="RADIUS">500</field>
    <field name="COLOR">#FF5252</field>
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">40.7128</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">-74.0060</field>
      </block>
    </value>
  </block>

  <label text="Save Map" web-class="toolboxLabel"></label>
  <block type="save_map_beginner">
    <field name="FILENAME">my_map.html</field>
  </block>
</category>
  
<category name="Visualization" colour="#90A4AE">
  <label text="Basic Charts" web-class="toolboxLabel"></label>
  <block type="create_chart_beginner">
    <field name="CHART_TYPE">scatter</field>
    <field name="COLOR">#4285F4</field>
  </block>
  
  <block type="create_xy_chart_beginner">
    <field name="CHART_TYPE">scatter</field>
    <field name="COLOR">#4285F4</field>
  </block>
  
  <label text="Add to Chart" web-class="toolboxLabel"></label>
  <block type="add_to_chart_beginner">
    <field name="ADD_TYPE">points</field>
  </block>
  
  <label text="Layout" web-class="toolboxLabel"></label>
  <block type="chart_layout_beginner">
    <field name="LAYOUT">1,2</field>
  </block>
</category>


  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
	<block type="export_plot_pdf"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>
</xml>
`;

  // Blockly toolbox definition for Level 2 (Advanced)
  const advancedToolbox = `
<xml>
  <category name="Tests" colour="#5C81A6">
    <block type="head_print"></block>	
	<block type="install_package"></block>
	<block type="plot_vector"></block>
	<block type="load_geojson_to_leaflet"></block>
	<block type="load_csv_to_leaflet"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
    <block type="load_csv"></block>
    <block type="load_shapefile"></block>
    <block type="load_raster"></block>
    <block type="load_txt"></block>
    <block type="load_json"></block>
    <block type="load_geojson"></block>
	<block type="load_tif"></block>
    <block type="load_csv_url"></block>
    <block type="load_api_data"></block>
	<block type="load_csv"></block>
	<block type="load_geojson"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="data_summary"></block>
    <block type="structure_overview"></block>
    <block type="data_shape"></block>
    <block type="group_by_summarise"></block>
	<block type="data_table"></block>
	<block type="length_data"></block>
	<block type="show_tail"></block>
	<block type="show_rows"></block>
	<block type="access_column"></block>
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
	<block type="rnorm_block"></block>
  </category>

  <category name="Text" colour="#0f45a3">
    <block type="text"></block>
	<block type="text_print"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="calculate_quantile"></block>
    <block type="calculate_median"></block>
    <block type="calculate_max"></block>
    <block type="calculate_min"></block>
    <block type="calculate_sum"></block>
  </category>

  <category name="Transformations" colour="#FFD54F">
	<block type="select_columns"></block>
    <block type="sort_array"></block>
    <block type="stack_data"></block>
    <block type="append_array"></block>
    <block type="create_array"></block>
    <block type="slice_file"></block>
	<block type="filter_rows"></block>
	<block type="subset_rows"></block>
    <block type="subset_column_range"></block>
	<block type="convert_to_sf"></block>
	<block type="convert_to_dataframe"></block>
  </category>

<category name="Maps" colour="#67c761">
  <label text="Map Creation" web-class="toolboxLabel"></label>
  <block type="leaflet_map_advanced">
    <statement name="SETTINGS">
      <block type="map_center_setting">
        <value name="LAT">
          <block type="math_number">
            <field name="NUM">40.7128</field>
          </block>
        </value>
        <value name="LNG">
          <block type="math_number">
            <field name="NUM">-74.0060</field>
          </block>
        </value>
        <next>
          <block type="map_zoom_setting">
            <value name="ZOOM">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
  
  <label text="Map Settings" web-class="toolboxLabel"></label>
  <block type="map_center_setting">
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  
  <block type="map_zoom_setting">
    <value name="ZOOM">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <block type="map_bounds_setting">
    <value name="SW_LAT">
      <block type="math_number">
        <field name="NUM">-10</field>
      </block>
    </value>
    <value name="SW_LNG">
      <block type="math_number">
        <field name="NUM">-10</field>
      </block>
    </value>
    <value name="NE_LAT">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="NE_LNG">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <block type="map_options_setting">
    <statement name="OPTIONS">
      <block type="min_zoom_option">
        <field name="MIN_ZOOM">1</field>
        <next>
          <block type="max_zoom_option">
            <field name="MAX_ZOOM">18</field>
          </block>
        </next>
      </block>
    </statement>
  </block>
  
  <label text="Tile Layers" web-class="toolboxLabel"></label>
  <block type="add_tiles_advanced">
    <field name="PROVIDER">osm</field>
  </block>
  
  <label text="Map Elements" web-class="toolboxLabel"></label>
  <block type="add_markers_advanced">
    <statement name="SETTINGS">
      <block type="marker_lat_lng_setting">
        <value name="LAT_COL">
          <block type="text">
            <field name="TEXT">latitude</field>
          </block>
        </value>
        <value name="LNG_COL">
          <block type="text">
            <field name="TEXT">longitude</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="marker_lat_lng_setting">
    <value name="LAT_COL">
      <block type="text">
        <field name="TEXT">lat</field>
      </block>
    </value>
    <value name="LNG_COL">
      <block type="text">
        <field name="TEXT">lng</field>
      </block>
    </value>
  </block>
  
  <block type="marker_popup_setting">
    <value name="POPUP_COL">
      <block type="text">
        <field name="TEXT">name</field>
      </block>
    </value>
  </block>
  
  <block type="marker_icon_setting">
    <field name="WIDTH">25</field>
    <field name="HEIGHT">25</field>
    <value name="ICON_URL">
      <block type="text">
        <field name="TEXT">marker-icon.png</field>
      </block>
    </value>
  </block>
  
  <block type="add_polygons_advanced">
    <statement name="STYLE">
      <block type="polygon_fill_style">
        <field name="FILL_OPACITY">0.5</field>
        <value name="FILL_COLOR">
          <block type="text">
            <field name="TEXT">blue</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="polygon_fill_style">
    <field name="FILL_OPACITY">0.5</field>
    <value name="FILL_COLOR">
      <block type="text">
        <field name="TEXT">red</field>
      </block>
    </value>
  </block>
  
  <block type="polygon_stroke_style">
    <field name="WEIGHT">2</field>
    <value name="STROKE_COLOR">
      <block type="text">
        <field name="TEXT">black</field>
      </block>
    </value>
  </block>
  
  <label text="Legend" web-class="toolboxLabel"></label>
  <block type="add_legend_advanced">
    <field name="POSITION">topright</field>
  </block>
  
  <label text="Export" web-class="toolboxLabel"></label>
  <block type="save_leaflet_advanced">
    <field name="FILENAME">interactive_map.html</field>
    <field name="SELF_CONTAINED">TRUE</field>
  </block>
</category>

<category name="Visualization" colour="#607D8B">
  <label text="Plot Types" web-class="toolboxLabel"></label>
  <block type="plot_advanced">
    <field name="PLOT_TYPE">scatter</field>
    <statement name="SETTINGS">
      <block type="plot_xy_setting"></block>
    </statement>
  </block>
  
  <label text="Data Settings" web-class="toolboxLabel"></label>
  <block type="plot_data_setting"></block>
  <block type="plot_xy_setting"></block>
  
  <label text="Appearance" web-class="toolboxLabel"></label>
  <block type="plot_appearance_setting">
    <statement name="OPTIONS">
      <block type="color_option">
        <value name="COLOR">
          <block type="text">
            <field name="TEXT">blue</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="color_option">
    <value name="COLOR">
      <block type="text">
        <field name="TEXT">red</field>
      </block>
    </value>
  </block>
  
  <block type="symbol_option">
    <field name="SYMBOL">1</field>
  </block>
  
  <block type="line_type_option">
    <field name="LINE_TYPE">1</field>
  </block>
  
  <block type="size_option">
    <field name="SIZE">1</field>
  </block>
  
  <label text="Labels & Titles" web-class="toolboxLabel"></label>
  <block type="plot_labels_setting">
    <statement name="LABELS">
      <block type="title_label">
        <value name="TITLE">
          <block type="text">
            <field name="TEXT">My Plot</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="title_label">
    <value name="TITLE">
      <block type="text">
        <field name="TEXT">Title</field>
      </block>
    </value>
  </block>
  
  <block type="axis_label">
    <field name="AXIS">x</field>
    <value name="LABEL">
      <block type="text">
        <field name="TEXT">X Axis</field>
      </block>
    </value>
  </block>
  
  <label text="Axis Limits" web-class="toolboxLabel"></label>
  <block type="plot_limits_setting">
    <statement name="LIMITS">
      <block type="axis_limit">
        <field name="AXIS">x</field>
        <value name="MIN">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <value name="MAX">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="axis_limit">
    <field name="AXIS">x</field>
    <value name="MIN">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="MAX">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <label text="Legend" web-class="toolboxLabel"></label>
  <block type="plot_legend_setting">
    <field name="SHOW">TRUE</field>
    <field name="POSITION">topright</field>
  </block>
  
  <label text="Add Layers" web-class="toolboxLabel"></label>
  <block type="add_layer_advanced">
    <field name="LAYER_TYPE">points</field>
  </block>
  
  <label text="Layout" web-class="toolboxLabel"></label>
  <block type="layout_advanced">
    <field name="ROWS">2</field>
    <field name="COLS">2</field>
    <field name="ADJUST_MARGINS">FALSE</field>
  </block>
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

  <category name="Modeling & Interpolation" colour="#A1887F">
    <label text="Linear Model" web-class="toolboxLabel"></label>
    <block type="linear_model_block"></block>

    <label text="Logistic Regression" web-class="toolboxLabel"></label>
    <block type="logistic_regression_block"></block>

    <label text="Semivariogram" web-class="toolboxLabel"></label>
    <block type="semivariogram"></block>

    <label text="Kriging Interpolation-Ordinary" web-class="toolboxLabel"></label>
    <block type="kriging_interpolation"></block>

    <label text="IDW Interpolation" web-class="toolboxLabel"></label>
    <block type="idw_interpolation"></block>

    <label text="Random Forest" web-class="toolboxLabel"></label>
    <block type="random_forest_block"></block>-->
  </category>

  <category name="Raster" colour="#64B5F6">
    <block type="crop_raster"></block>
    <block type="aggregate_raster"></block>
  </category>

  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
	<block type="export_plot_pdf"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>
</xml>
`;

  const toolboxXml = useMemo(() => {
    return level === "level1" ? beginnerToolbox : advancedToolbox;
  }, [level]);

  // Initialize Blockly with the selected theme and toolbox whenever the theme or level changes
  useEffect(() => {
    if (!blocklyDiv.current) return;
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      media: "blockly/media/",
      renderer: "zelos",
      toolbox: toolboxXml,
      theme: isDarkMode ? darkTheme : lightTheme,
      grid: { spacing: 40, length: 4, colour: "#fff", snap: true },
      zoom: { controls: true, wheel: true },
      move: { drag: true, wheel: true },
      trashcan: {},
    });

    return () => workspaceRef.current?.dispose();
  }, []);
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme);
    }
  }, [isDarkMode]);
  useEffect(() => {
    workspaceRef.current?.updateToolbox(toolboxXml);
  }, [toolboxXml]);

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
          bgcolor: theme.palette.background.default,
          borderRadius: 4,
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%", p: 1, flexWrap: "wrap" }}
        >
          <Tooltip title="Upload your CSV, GeoJSON or TIF data." arrow>
            <IconButton
              id="uploadDataButton"
              variant="contained"
              onClick={onUploadClick}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 0,
              }}
            >
              <Upload fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Check uploaded data">
            <Button
              id="checkDataButton"
              variant="outlined"
              size="small"
              onClick={() => setShowCheckDataDialog(true)}
              sx={{
                borderRadius: 4,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                height: 40,
                px: 1.5,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                  borderColor: theme.palette.primary.dark,
                },
              }}
            >
              <MdChecklist style={{ marginRight: 4 }} />
              Check Uploads
            </Button>
          </Tooltip>

          <Tooltip title="Create CSV data manually">
            <Button
              id="createDataButton"
              variant="outlined"
              size="small"
              onClick={() => setOpenCreateDataDialog(true)}
              sx={{
                borderRadius: 4,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                height: 40,
                px: 1.5,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                  borderColor: theme.palette.primary.dark,
                },
              }}
            >
              <MdCreate style={{ marginRight: 4 }} />
              Create Data
            </Button>
          </Tooltip>

          <Tooltip
            title={
              <Box>
                <div>
                  <strong>Beginner:</strong> simple blocks & built-in data
                </div>
                <div>
                  <strong>Advanced:</strong> external files, spatial modeling
                </div>
                <div>Check out the tutorials to get started!</div>
              </Box>
            }
            arrow
            enterDelay={300}
            placement="right"
          >
            <Box>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="level-select-label"
                  id="level-select"
                  value={level}
                  onChange={handleChangeLevel}
                  sx={{
                    height: 40,
                    minHeight: 40,
                    fontSize: "0.9rem",
                    borderRadius: 2,
                    bgcolor:
                      level === "level1"
                        ? "#00c853"
                        : level === "level2"
                        ? "#F44336"
                        : theme.palette.primary.main,
                    color: "#fff",
                    "&:hover": {
                      bgcolor:
                        level === "level1"
                          ? "#00b248" // etwas dunkler
                          : level === "level2"
                          ? "#d32f2f"
                          : theme.palette.primary.dark,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.main,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.dark,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.dark,
                    },
                    ".MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: 40,
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                >
                  <MenuItem value="level1" sx={{ fontSize: "1rem" }}>
                    Beginner
                  </MenuItem>
                  <MenuItem value="level2" sx={{ fontSize: "1rem" }}>
                    Advanced
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Tooltip>

          {/* Help button to start Spockly tour */}
          <Tooltip title="Start Spockly Tour" arrow>
            <IconButton
              onClick={() => window?.__startSpocklyTour?.()}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show Simple CO₂ Tutorial" arrow>
            <IconButton
              id="showTutorialButton"
              onClick={handleOpenCO2Tutorial}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
              }}
            >
              <Co2Outlined />
            </IconButton>
          </Tooltip>
        </Stack>
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

      {/* Dialoge */}

      <CheckUploadedDataDialog
        open={showCheckDataDialog}
        onClose={() => setShowCheckDataDialog(false)}
      />

      <CreateDataDialog
        open={openCreateDataDialog}
        onClose={() => setOpenCreateDataDialog(false)}
      />

      <CO2Tutorial
        open={openCO2Tutorial}
        onClose={handleCloseCO2Tutorial}
        step={stepCO2Tutorial}
        nextStep={nextStepCO2Tutorial}
        prevStep={prevStepCO2Tutorial}
      />
    </Box>
  );
};

export default BlocklyComponent;

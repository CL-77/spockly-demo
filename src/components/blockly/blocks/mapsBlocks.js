import * as Blockly from "blockly";
import { FieldColour } from '@blockly/field-colour';

Blockly.fieldRegistry.register('field_colour', FieldColour);

Blockly.defineBlocksWithJsonArray([
	{
		"type": "create_map_beginner",
		"message0": "Create map at %1 location %2 zoom level %3 style %4",
		"args0": [
			{
				"type": "input_dummy"
			},
			{
				"type": "field_dropdown",
				"name": "LOCATION",
				"options": [
					["New York", "new_york"],
					["London", "london"],
					["Paris", "paris"],
					["Tokyo", "tokyo"],
					["Sydney", "sydney"],
					["Custom", "custom"]
				]
			},
			{
				"type": "field_number",
				"name": "ZOOM",
				"value": 10,
				"min": 1,
				"max": 18,
				"precision": 1
			},
			{
				"type": "field_dropdown",
				"name": "STYLE",
				"options": [
					["OpenStreetMap", "osm"],
					["CartoDB Dark", "cartodb_dark"],
					["CartoDB Light", "cartodb_light"],
					["ESRI World", "esri_world"]
				]
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": "#67c761",
		"tooltip": "Create a simple map",
		"helpUrl": "",
		"extensions": ["location_mutator_beginner"]
	},
    {
        "type": "add_marker_beginner",
        "message0": "Add marker %1 at latitude %2 longitude %3 %4 label %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LAT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "LNG",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LABEL",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#67c761",
        "tooltip": "Add a marker to the map",
        "helpUrl": ""
    },
    {
        "type": "add_circle_beginner",
        "message0": "Add circle %1 at latitude %2 longitude %3 %4 size %5 meters %6 color %7",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LAT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "LNG",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "RADIUS",
                "value": 100,
                "min": 10,
                "max": 10000,
                "precision": 10
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#FF5252"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#67c761",
        "tooltip": "Add a circle to the map",
        "helpUrl": ""
    },
    {
        "type": "save_map_beginner",
        "message0": "Save map as %1",
        "args0": [
            {
                "type": "field_input",
                "name": "FILENAME",
                "text": "my_map.html"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#67c761",
        "tooltip": "Save the map as HTML file",
        "helpUrl": ""
    },
    {
        "type": "leaflet_map_advanced",
        "message0": "Leaflet map %1 settings %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "SETTINGS",
                "check": "MapSetting"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#67c761",
        "tooltip": "Create an advanced Leaflet map",
        "helpUrl": ""
    },
    {
        "type": "map_center_setting",
        "message0": "center at lat %1 lng %2",
        "args0": [
            {
                "type": "input_value",
                "name": "LAT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "LNG",
                "check": "Number"
            }
        ],
        "previousStatement": "MapSetting",
        "nextStatement": "MapSetting",
        "colour": "#40a63a",
        "tooltip": "Set map center"
    },
    {
        "type": "map_zoom_setting",
        "message0": "zoom level %1",
        "args0": [
            {
                "type": "input_value",
                "name": "ZOOM",
                "check": "Number"
            }
        ],
        "previousStatement": "MapSetting",
        "nextStatement": "MapSetting",
        "colour": "#40a63a",
        "tooltip": "Set zoom level"
    },
    {
        "type": "map_bounds_setting",
        "message0": "fit bounds %1 SW lat %2 lng %3 %4 NE lat %5 lng %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SW_LAT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SW_LNG",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "NE_LAT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "NE_LNG",
                "check": "Number"
            }
        ],
        "previousStatement": "MapSetting",
        "nextStatement": "MapSetting",
        "colour": "#40a63a",
        "tooltip": "Fit map to bounds"
    },
    {
        "type": "map_options_setting",
        "message0": "options %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "MapOption"
            }
        ],
        "previousStatement": "MapSetting",
        "nextStatement": "MapSetting",
        "colour": "#40a63a",
        "tooltip": "Set map options"
    },
    {
        "type": "min_zoom_option",
        "message0": "min zoom %1",
        "args0": [
            {
                "type": "field_number",
                "name": "MIN_ZOOM",
                "value": 1,
                "min": 1,
                "max": 18,
                "precision": 1
            }
        ],
        "previousStatement": "MapOption",
        "nextStatement": "MapOption",
        "colour": "#1f7d19",
        "tooltip": "Set minimum zoom level"
    },
    {
        "type": "max_zoom_option",
        "message0": "max zoom %1",
        "args0": [
            {
                "type": "field_number",
                "name": "MAX_ZOOM",
                "value": 18,
                "min": 1,
                "max": 18,
                "precision": 1
            }
        ],
        "previousStatement": "MapOption",
        "nextStatement": "MapOption",
        "colour": "#1f7d19",
        "tooltip": "Set maximum zoom level"
    },
	{
		"type": "add_tiles_advanced",
		"message0": "Add %1 tiles %2 attribution %3",
		"args0": [
			{
				"type": "field_dropdown",
				"name": "PROVIDER",
				"options": [
					["OpenStreetMap", "osm"],
					["CartoDB Dark", "cartodb_dark"],
					["CartoDB Light", "cartodb_light"],
					["ESRI World", "esri_world"],
					["Custom URL", "custom"]
				]
			},
			{
				"type": "input_dummy"
			},
			{
				"type": "input_value",
				"name": "ATTRIBUTION",
				"check": "String"
			}
		],
		"previousStatement": "MapSetting",
		"nextStatement": "MapSetting",
		"colour": "#40a63a",
		"tooltip": "Add tile layer",
		"helpUrl": "",
		"extensions": ["tile_provider_mutator"]
	},
    {
        "type": "add_markers_advanced",
        "message0": "Add markers %1 data %2 %3 settings %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DATA",
                "check": ["Variable", "Data"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "SETTINGS",
                "check": "MarkerSetting"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#40a63a",
        "tooltip": "Add multiple markers from data",
        "helpUrl": ""
    },
    {
        "type": "marker_lat_lng_setting",
        "message0": "lat column %1 lng column %2",
        "args0": [
            {
                "type": "input_value",
                "name": "LAT_COL",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "LNG_COL",
                "check": "String"
            }
        ],
        "previousStatement": "MarkerSetting",
        "nextStatement": "MarkerSetting",
        "colour": "#1f7d19",
        "tooltip": "Set latitude and longitude columns"
    },
    {
        "type": "marker_popup_setting",
        "message0": "popup column %1",
        "args0": [
            {
                "type": "input_value",
                "name": "POPUP_COL",
                "check": "String"
            }
        ],
        "previousStatement": "MarkerSetting",
        "nextStatement": "MarkerSetting",
        "colour": "#1f7d19",
        "tooltip": "Set popup content column"
    },
    {
        "type": "marker_icon_setting",
        "message0": "icon %1 size %2 x %3",
        "args0": [
            {
                "type": "input_value",
                "name": "ICON_URL",
                "check": "String"
            },
            {
                "type": "field_number",
                "name": "WIDTH",
                "value": 25,
                "min": 10,
                "max": 100,
                "precision": 1
            },
            {
                "type": "field_number",
                "name": "HEIGHT",
                "value": 25,
                "min": 10,
                "max": 100,
                "precision": 1
            }
        ],
        "previousStatement": "MarkerSetting",
        "nextStatement": "MarkerSetting",
        "colour": "#1f7d19",
        "tooltip": "Set custom marker icon"
    },
    {
        "type": "add_polygons_advanced",
        "message0": "Add polygons %1 data %2 %3 style %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DATA",
                "check": ["Variable", "Data"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "STYLE",
                "check": "PolygonStyle"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#40a63a",
        "tooltip": "Add polygons from spatial data",
        "helpUrl": ""
    },
    {
        "type": "polygon_fill_style",
        "message0": "fill color %1 opacity %2",
        "args0": [
            {
                "type": "input_value",
                "name": "FILL_COLOR",
                "check": ["String", "Colour"]
            },
            {
                "type": "field_number",
                "name": "FILL_OPACITY",
                "value": 0.5,
                "min": 0,
                "max": 1,
                "precision": 0.1
            }
        ],
        "previousStatement": "PolygonStyle",
        "nextStatement": "PolygonStyle",
        "colour": "#1f7d19",
        "tooltip": "Set polygon fill style"
    },
    {
        "type": "polygon_stroke_style",
        "message0": "stroke color %1 weight %2",
        "args0": [
            {
                "type": "input_value",
                "name": "STROKE_COLOR",
                "check": ["String", "Colour"]
            },
            {
                "type": "field_number",
                "name": "WEIGHT",
                "value": 2,
                "min": 1,
                "max": 10,
                "precision": 1
            }
        ],
        "previousStatement": "PolygonStyle",
        "nextStatement": "PolygonStyle",
        "colour": "#1f7d19",
        "tooltip": "Set polygon stroke style"
    },
    {
        "type": "add_legend_advanced",
        "message0": "Add legend %1 position %2 %3 colors %4 %5 labels %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["Top Right", "topright"],
                    ["Top Left", "topleft"],
                    ["Bottom Right", "bottomright"],
                    ["Bottom Left", "bottomleft"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "COLORS",
                "check": ["Variable", "Array"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LABELS",
                "check": ["Variable", "Array"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#40a63a",
        "tooltip": "Add legend to map",
        "helpUrl": ""
    },
    {
        "type": "save_leaflet_advanced",
        "message0": "Save leaflet map as %1 %2 self contained %3",
        "args0": [
            {
                "type": "field_input",
                "name": "FILENAME",
                "text": "map.html"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "SELF_CONTAINED",
                "checked": true
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#40a63a",
        "tooltip": "Save map as HTML file",
        "helpUrl": ""
    }
]);

Blockly.Extensions.register('location_mutator_beginner', function() {
    const updateShape = function() {
        const location = this.getFieldValue('LOCATION');
        if (location === 'custom') {
            if (!this.getInput('CUSTOM_LAT')) {
                this.appendValueInput('CUSTOM_LAT')
                    .setCheck('Number')
                    .appendField('latitude');
                this.appendValueInput('CUSTOM_LNG')
                    .setCheck('Number')
                    .appendField('longitude');
                this.moveInputBefore('CUSTOM_LAT', 'ZOOM');
                this.moveInputBefore('CUSTOM_LNG', 'ZOOM');
            }
        } else {
            if (this.getInput('CUSTOM_LAT')) {
                this.removeInput('CUSTOM_LAT');
                this.removeInput('CUSTOM_LNG');
            }
        }
    };
    this.setOnChange(updateShape.bind(this));
});

Blockly.Extensions.register('tile_provider_mutator', function() {
    const updateShape = function() {
        const provider = this.getFieldValue('PROVIDER');
        if (provider === 'custom') {
            if (!this.getInput('CUSTOM_URL')) {
                this.appendValueInput('CUSTOM_URL')
                    .setCheck('String')
                    .appendField('URL');
                this.moveInputBefore('CUSTOM_URL', 'ATTRIBUTION');
            }
        } else {
            if (this.getInput('CUSTOM_URL')) {
                this.removeInput('CUSTOM_URL');
            }
        }
    };
    this.setOnChange(updateShape.bind(this));
});

Blockly.Generator.R.forBlock['create_map_beginner'] = function(block, generator) {
    generator.requirePackage("leaflet");
    generator.requirePackage("htmlwidgets");
    const location = block.getFieldValue('LOCATION');
    const zoom = block.getFieldValue('ZOOM');
    const style = block.getFieldValue('STYLE');
    
    let lat, lng;
    switch(location) {
        case 'new_york':
            lat = 40.7128; lng = -74.0060;
            break;
        case 'london':
            lat = 51.5074; lng = -0.1278;
            break;
        case 'paris':
            lat = 48.8566; lng = 2.3522;
            break;
        case 'tokyo':
            lat = 35.6762; lng = 139.6503;
            break;
        case 'sydney':
            lat = -33.8688; lng = 151.2093;
            break;
        case 'custom':
            lat = generator.valueToCode(block, 'CUSTOM_LAT', Blockly.Generator.R.ORDER_ATOMIC) || '0';
            lng = generator.valueToCode(block, 'CUSTOM_LNG', Blockly.Generator.R.ORDER_ATOMIC) || '0';
            break;
    }

    let tileUrl = '';
    let attribution = '';

    switch(style) {
        case 'osm':
            return `leaflet_map <- leaflet() %>%
  addTiles() %>%
  setView(lat = ${lat}, lng = ${lng}, zoom = ${zoom})\n`;
        case 'cartodb_dark':
            tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
            break;
        case 'cartodb_light':
            tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
            break;
        case 'esri_world':
            tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
            attribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012';
            break;
    }

    return `leaflet_map <- leaflet() %>%
  addTiles(urlTemplate = "${tileUrl}", attribution = "${attribution.replace(/"/g, '\\"')}") %>%
  setView(lat = ${lat}, lng = ${lng}, zoom = ${zoom})\n`;
};

Blockly.Generator.R.forBlock['add_marker_beginner'] = function(block, generator) {
    const lat = generator.valueToCode(block, 'LAT', Blockly.Generator.R.ORDER_ATOMIC) || '0';
    const lng = generator.valueToCode(block, 'LNG', Blockly.Generator.R.ORDER_ATOMIC) || '0';
    const label = generator.valueToCode(block, 'LABEL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
    const code = `leaflet_map <- leaflet_map %>%
  addMarkers(lat = ${lat}, lng = ${lng}, popup = ${label})\n`;
    return code;
};

Blockly.Generator.R.forBlock['add_circle_beginner'] = function(block, generator) {
    const lat = generator.valueToCode(block, 'LAT', Blockly.Generator.R.ORDER_ATOMIC) || '0';
    const lng = generator.valueToCode(block, 'LNG', Blockly.Generator.R.ORDER_ATOMIC) || '0';
    const radius = block.getFieldValue('RADIUS');
    const color = block.getFieldValue('COLOR');
    // Fixed order of parameters for R leaflet addCircles function
    const code = `leaflet_map <- leaflet_map %>%
  addCircles(lat = ${lat}, lng = ${lng}, radius = ${radius}, color = "${color}", fillColor = "${color}", fillOpacity = 0.5)\n`;
    return code;
};

Blockly.Generator.R.forBlock['save_map_beginner'] = function(block, generator) {
    const filename = block.getFieldValue('FILENAME');
    const code = `htmlwidgets::saveWidget(leaflet_map, file = "${filename}", selfcontained = TRUE)
message("Map saved as ${filename}")\n`;
    return code;
};

Blockly.Generator.R.forBlock['leaflet_map_advanced'] = function(block, generator) {
    generator.requirePackage("leaflet");
    generator.requirePackage("htmlwidgets");
    
    let mapOptions = [];
    let centerLat = null, centerLng = null, zoom = null;
    let fitBounds = null;
    let additionalMethods = [];
    
    let settingBlock = block.getInputTargetBlock('SETTINGS');
    while (settingBlock) {
        switch(settingBlock.type) {
            case 'map_center_setting':
                centerLat = generator.valueToCode(settingBlock, 'LAT', Blockly.Generator.R.ORDER_ATOMIC);
                centerLng = generator.valueToCode(settingBlock, 'LNG', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'map_zoom_setting':
                zoom = generator.valueToCode(settingBlock, 'ZOOM', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'map_bounds_setting':
                const swLat = generator.valueToCode(settingBlock, 'SW_LAT', Blockly.Generator.R.ORDER_ATOMIC);
                const swLng = generator.valueToCode(settingBlock, 'SW_LNG', Blockly.Generator.R.ORDER_ATOMIC);
                const neLat = generator.valueToCode(settingBlock, 'NE_LAT', Blockly.Generator.R.ORDER_ATOMIC);
                const neLng = generator.valueToCode(settingBlock, 'NE_LNG', Blockly.Generator.R.ORDER_ATOMIC);
                fitBounds = `c(${swLat}, ${swLng}, ${neLat}, ${neLng})`;
                break;
            case 'map_options_setting':
                let optionBlock = settingBlock.getInputTargetBlock('OPTIONS');
                while (optionBlock) {
                    switch(optionBlock.type) {
                        case 'min_zoom_option':
                            mapOptions.push(`minZoom = ${optionBlock.getFieldValue('MIN_ZOOM')}`);
                            break;
                        case 'max_zoom_option':
                            mapOptions.push(`maxZoom = ${optionBlock.getFieldValue('MAX_ZOOM')}`);
                            break;
                    }
                    optionBlock = optionBlock.getNextBlock();
                }
                break;
            case 'add_tiles_advanced':
                const tilesCode = generator.blockToCode(settingBlock);
                if (tilesCode) {
                    additionalMethods.push(tilesCode);
                }
                break;
        }
        settingBlock = settingBlock.getNextBlock();
    }
    
    let code = 'leaflet_map <- leaflet(';
    if (mapOptions.length > 0) {
        code += `options = leafletOptions(${mapOptions.join(', ')})`;
    }
    code += ')';
    
    if (additionalMethods.length > 0) {
        code += ' %>%\n  ' + additionalMethods.join(' %>%\n  ');
    }
    
    if (centerLat && centerLng && zoom) {
        code += ` %>%\n  setView(lat = ${centerLat}, lng = ${centerLng}, zoom = ${zoom})`;
    } else if (fitBounds) {
        code += ` %>%\n  fitBounds(${fitBounds})`;
    }
    
    code += '\n';
    return code;
};

Blockly.Generator.R.forBlock['add_tiles_advanced'] = function(block, generator) {
    const provider = block.getFieldValue('PROVIDER');
    const attribution = generator.valueToCode(block, 'ATTRIBUTION', Blockly.Generator.R.ORDER_ATOMIC);

    let tileUrl = '';
    let defaultAttribution = '';

    switch(provider) {
        case 'osm':
            return 'addTiles()';
        case 'cartodb_dark':
            tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            defaultAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
            break;
        case 'cartodb_light':
            tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
            defaultAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
            break;
        case 'esri_world':
            tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
            defaultAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012';
            break;
        case 'custom':
            tileUrl = generator.valueToCode(block, 'CUSTOM_URL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
            tileUrl = tileUrl.replace(/^"|"$/g, '');
            break;
    }

    function escapeRString(str) {
        return str.replace(/"/g, '\\"');
    }

    let finalAttribution;
    if (attribution && attribution !== '""') {
        finalAttribution = `"${escapeRString(attribution.replace(/^"|"$/g, ''))}"`;
    } else {
        finalAttribution = `"${escapeRString(defaultAttribution)}"`;
    }

    return `addTiles(urlTemplate = "${tileUrl}", attribution = ${finalAttribution})`;
};

Blockly.Generator.R.forBlock['add_markers_advanced'] = function(block, generator) {
    const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
    let latCol = 'lat', lngCol = 'lng', popupCol = null, iconUrl = null, iconWidth = 25, iconHeight = 25;
    let settingBlock = block.getInputTargetBlock('SETTINGS');
    while (settingBlock) {
        switch(settingBlock.type) {
            case 'marker_lat_lng_setting':
                latCol = generator.valueToCode(settingBlock, 'LAT_COL', Blockly.Generator.R.ORDER_ATOMIC) || '"lat"';
                lngCol = generator.valueToCode(settingBlock, 'LNG_COL', Blockly.Generator.R.ORDER_ATOMIC) || '"lng"';
                latCol = latCol.replace(/^"|"$/g, '');
                lngCol = lngCol.replace(/^"|"$/g, '');
                break;
            case 'marker_popup_setting':
                popupCol = generator.valueToCode(settingBlock, 'POPUP_COL', Blockly.Generator.R.ORDER_ATOMIC);
                if (popupCol) popupCol = popupCol.replace(/^"|"$/g, '');
                break;
            case 'marker_icon_setting':
                iconUrl = generator.valueToCode(settingBlock, 'ICON_URL', Blockly.Generator.R.ORDER_ATOMIC);
                iconWidth = settingBlock.getFieldValue('WIDTH');
                iconHeight = settingBlock.getFieldValue('HEIGHT');
                break;
        }
        settingBlock = settingBlock.getNextBlock();
    }
    let code = `leaflet_map <- leaflet_map %>%\n  addMarkers(data = ${data}, lat = ~${latCol}, lng = ~${lngCol}`;
    if (popupCol) {
        code += `, popup = ~${popupCol}`;
    }
    if (iconUrl) {
        code += `, icon = list(iconUrl = ${iconUrl}, iconSize = c(${iconWidth}, ${iconHeight}))`;
    }
    code += ')\n';
    return code;
};

Blockly.Generator.R.forBlock['add_polygons_advanced'] = function(block, generator) {
    const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
    let fillColor = '"blue"', fillOpacity = 0.5, strokeColor = '"black"', weight = 2;
    let styleBlock = block.getInputTargetBlock('STYLE');
    while (styleBlock) {
        switch(styleBlock.type) {
            case 'polygon_fill_style':
                fillColor = generator.valueToCode(styleBlock, 'FILL_COLOR', Blockly.Generator.R.ORDER_ATOMIC) || '"blue"';
                fillOpacity = styleBlock.getFieldValue('FILL_OPACITY');
                break;
            case 'polygon_stroke_style':
                strokeColor = generator.valueToCode(styleBlock, 'STROKE_COLOR', Blockly.Generator.R.ORDER_ATOMIC) || '"black"';
                weight = styleBlock.getFieldValue('WEIGHT');
                break;
        }
        styleBlock = styleBlock.getNextBlock();
    }
    const code = `leaflet_map <- leaflet_map %>%
  addPolygons(data = ${data},
    fillColor = ${fillColor},
    fillOpacity = ${fillOpacity},
    color = ${strokeColor},
    weight = ${weight})\n`;
    return code;
};

Blockly.Generator.R.forBlock['add_legend_advanced'] = function(block, generator) {
    const position = block.getFieldValue('POSITION');
    const colors = generator.valueToCode(block, 'COLORS', Blockly.Generator.R.ORDER_ATOMIC) || 'c()';
    const labels = generator.valueToCode(block, 'LABELS', Blockly.Generator.R.ORDER_ATOMIC) || 'c()';
    const code = `leaflet_map <- leaflet_map %>%
  addLegend(position = "${position}",
    colors = ${colors},
    labels = ${labels})\n`;
    return code;
};

Blockly.Generator.R.forBlock['save_leaflet_advanced'] = function(block, generator) {
    const filename = block.getFieldValue('FILENAME');
    const selfContained = block.getFieldValue('SELF_CONTAINED');
    const code = `htmlwidgets::saveWidget(leaflet_map,
  file = "${filename}",
  selfcontained = ${selfContained ? 'TRUE' : 'FALSE'})
message("Leaflet map saved as ${filename}")\n`;
    return code;
};

Blockly.Generator.R.forBlock['map_center_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['map_zoom_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['map_bounds_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['map_options_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['min_zoom_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['max_zoom_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['marker_lat_lng_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['marker_popup_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['marker_icon_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['polygon_fill_style'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['polygon_stroke_style'] = function(block, generator) {
    return null;
};
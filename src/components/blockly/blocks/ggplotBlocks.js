import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "ggplot_create",
        "message0": "ggplot %1 data %2 %3 aesthetics %4 %5 layers %6 %7 settings %8",
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
                "name": "AESTHETICS",
                "check": "Aesthetic"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LAYERS",
                "check": "Layer"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "SETTINGS",
                "check": ["Theme", "Scale", "Labs", "Facet", "Coord"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "output": "Plot",
        "colour": "#FF6B6B",
        "tooltip": "Create a ggplot visualization",
        "helpUrl": ""
    },

    // Aesthetic mapping blocks
    {
        "type": "aes_xy",
        "message0": "x: %1 y: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": ["String", "Variable"]
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": ["String", "Variable"]
            }
        ],
        "previousStatement": "Aesthetic",
        "nextStatement": "Aesthetic",
        "colour": "#4ECDC4",
        "tooltip": "Set x and y aesthetics"
    },

    {
        "type": "aes_color",
        "message0": "color by %1",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": ["String", "Variable"]
            }
        ],
        "previousStatement": "Aesthetic",
        "nextStatement": "Aesthetic",
        "colour": "#4ECDC4",
        "tooltip": "Map color to a variable"
    },

    {
        "type": "aes_size",
        "message0": "size by %1",
        "args0": [
            {
                "type": "input_value",
                "name": "SIZE",
                "check": ["String", "Variable", "Number"]
            }
        ],
        "previousStatement": "Aesthetic",
        "nextStatement": "Aesthetic",
        "colour": "#4ECDC4",
        "tooltip": "Map size to a variable"
    },

    {
        "type": "aes_fill",
        "message0": "fill by %1",
        "args0": [
            {
                "type": "input_value",
                "name": "FILL",
                "check": ["String", "Variable"]
            }
        ],
        "previousStatement": "Aesthetic",
        "nextStatement": "Aesthetic",
        "colour": "#4ECDC4",
        "tooltip": "Map fill to a variable"
    },

    {
        "type": "aes_alpha",
        "message0": "transparency %1",
        "args0": [
            {
                "type": "input_value",
                "name": "ALPHA",
                "check": "Number"
            }
        ],
        "previousStatement": "Aesthetic",
        "nextStatement": "Aesthetic",
        "colour": "#4ECDC4",
        "tooltip": "Set transparency (0-1)"
    },

    // Geometry layer blocks
    {
        "type": "geom_point",
        "message0": "scatter plot %1 options %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add points/scatter plot layer"
    },

    {
        "type": "geom_bar",
        "message0": "bar chart %1 options %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add bar chart layer"
    },

    {
        "type": "geom_histogram",
        "message0": "histogram %1 bins %2 %3 options %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "BINWIDTH",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add histogram layer"
    },

    {
        "type": "geom_line",
        "message0": "line plot %1 options %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add line plot layer"
    },

    {
        "type": "geom_smooth",
        "message0": "trend line %1 method %2 %3 options %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "METHOD",
                "options": [
                    ["automatic", "auto"],
                    ["linear model", "lm"],
                    ["loess", "loess"],
                    ["generalized additive model", "gam"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add smooth/trend line layer"
    },

    {
        "type": "geom_sf",
        "message0": "spatial layer %1 options %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "GeomOption"
            }
        ],
        "previousStatement": "Layer",
        "nextStatement": "Layer",
        "colour": "#9B59B6",
        "tooltip": "Add spatial (sf) layer"
    },

    // Geometry options
    {
        "type": "geom_color",
        "message0": "color %1",
        "args0": [
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#ff0000"
            }
        ],
        "previousStatement": "GeomOption",
        "nextStatement": "GeomOption",
        "colour": "#8B4789",
        "tooltip": "Set fixed color"
    },

    {
        "type": "geom_fill",
        "message0": "fill %1",
        "args0": [
            {
                "type": "field_colour",
                "name": "FILL",
                "colour": "#0000ff"
            }
        ],
        "previousStatement": "GeomOption",
        "nextStatement": "GeomOption",
        "colour": "#8B4789",
        "tooltip": "Set fixed fill color"
    },

    {
        "type": "geom_alpha",
        "message0": "transparency %1",
        "args0": [
            {
                "type": "field_number",
                "name": "ALPHA",
                "value": 0.7,
                "min": 0,
                "max": 1,
                "precision": 0.1
            }
        ],
        "previousStatement": "GeomOption",
        "nextStatement": "GeomOption",
        "colour": "#8B4789",
        "tooltip": "Set transparency (0-1)"
    },

    {
        "type": "geom_size",
        "message0": "size %1",
        "args0": [
            {
                "type": "field_number",
                "name": "SIZE",
                "value": 1,
                "min": 0.1,
                "max": 10,
                "precision": 0.1
            }
        ],
        "previousStatement": "GeomOption",
        "nextStatement": "GeomOption",
        "colour": "#8B4789",
        "tooltip": "Set fixed size"
    },

    // Theme blocks
    {
        "type": "theme_preset",
        "message0": "theme %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "THEME",
                "options": [
                    ["minimal", "minimal"],
                    ["classic", "classic"],
                    ["gray", "gray"],
                    ["bw", "bw"],
                    ["linedraw", "linedraw"],
                    ["light", "light"],
                    ["dark", "dark"],
                    ["void", "void"]
                ]
            }
        ],
        "previousStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "nextStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "colour": "#F39C12",
        "tooltip": "Apply a preset theme"
    },

    // Labels block
    {
        "type": "labs",
        "message0": "labels %1 title %2 %3 x-axis %4 %5 y-axis %6 %7 color %8 %9 size %10",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "TITLE",
                "check": "String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "X",
                "check": "String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SIZE",
                "check": "String"
            }
        ],
        "previousStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "nextStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "colour": "#F39C12",
        "tooltip": "Set plot labels"
    },

    // Scale blocks
    {
        "type": "scale_color_viridis",
        "message0": "viridis color scale %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["continuous", "c"],
                    ["discrete", "d"]
                ]
            }
        ],
        "previousStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "nextStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "colour": "#16A085",
        "tooltip": "Apply viridis color scale"
    },

    // Facet block
    {
        "type": "facet_grid",
        "message0": "facet grid %1 rows by %2 %3 columns by %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "ROWS",
                "check": ["String", "Variable"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "COLS",
                "check": ["String", "Variable"]
            }
        ],
        "previousStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "nextStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "colour": "#E74C3C",
        "tooltip": "Create faceted plots"
    },

    // Coordinate block
    {
        "type": "coord_fixed",
        "message0": "fixed aspect ratio",
        "previousStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "nextStatement": ["Theme", "Scale", "Labs", "Facet", "Coord"],
        "colour": "#34495E",
        "tooltip": "Set fixed aspect ratio"
    }
]);

// Helper function to generate code for a single block
function generateSingleBlockCode(block, generator) {
    // Temporarily remove the next block
    const nextBlock = block.nextConnection ? block.nextConnection.targetBlock() : null;
    if (nextBlock) {
        block.nextConnection.disconnect();
    }

    // Generate code for only this block
    const code = generator.blockToCode(block);

    // Reconnect the next block
    if (nextBlock) {
        block.nextConnection.connect(nextBlock.previousConnection);
    }

    return code;
}

Blockly.Generator.R.forBlock['ggplot_create'] = function(block, generator) {
    generator.requirePackage('ggplot2');

    const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';

    // Collect aesthetics - process each block individually
    let aesthetics = [];
    let aesBlock = block.getInputTargetBlock('AESTHETICS');

    while (aesBlock) {
        // Generate code for this specific block only
        const aesCode = generateSingleBlockCode(aesBlock, generator);

        if (aesCode && aesCode.trim() !== '') {
            let cleanCode = aesCode;
            if (Array.isArray(aesCode)) {
                cleanCode = aesCode[0] || '';
            }
            cleanCode = cleanCode.trim();

            if (cleanCode && !aesthetics.includes(cleanCode)) {
                aesthetics.push(cleanCode);
            }
        }

        aesBlock = aesBlock.getNextBlock();
    }

    let code = `print(ggplot(${data}`;
    if (aesthetics.length > 0) {
        code += `, aes(${aesthetics.join(', ')})`;
    }
    code += ')';  

    // Check if we have layers
    let layerBlock = block.getInputTargetBlock('LAYERS');
    let hasLayers = false;

    // Add layers
    while (layerBlock) {
        const layerCode = generateSingleBlockCode(layerBlock, generator);
        if (layerCode && layerCode.trim() !== '') {
            let cleanLayerCode = layerCode;
            if (Array.isArray(layerCode)) {
                cleanLayerCode = layerCode[0] || '';
            }
            code += ' +\n  ' + cleanLayerCode.trim();
            hasLayers = true;
        }
        layerBlock = layerBlock.getNextBlock();
    }

    // If no layers specified but data appears to be spatial (sf object), add geom_sf automatically
    if (!hasLayers && data && (data.includes('_sf') || data.includes('st_as_sf') || data.includes('st_'))) {
        generator.requirePackage('sf');
        code += ' +\n  geom_sf()';
    }

    // Add settings
    let settingBlock = block.getInputTargetBlock('SETTINGS');
    while (settingBlock) {
        const settingCode = generateSingleBlockCode(settingBlock, generator);
        if (settingCode && settingCode.trim() !== '') {
            let cleanSettingCode = settingCode;
            if (Array.isArray(settingCode)) {
                cleanSettingCode = settingCode[0] || '';
            }
            code += ' +\n  ' + cleanSettingCode.trim();
        }
        settingBlock = settingBlock.getNextBlock();
    }

    code += ')';

    return code + '\n';
};

// Aesthetic generators
Blockly.Generator.R.forBlock['aes_xy'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', Blockly.Generator.R.ORDER_ATOMIC);
    const cleanX = x ? x.replace(/["']/g, '') : '';
    const y = generator.valueToCode(block, 'Y', Blockly.Generator.R.ORDER_ATOMIC);
    const cleanY = y ? y.replace(/["']/g, '') : '';
    
    let parts = [];
    if (x) parts.push(`x = ${cleanX}`);
    if (y) parts.push(`y = ${cleanY}`);

    return parts.join(', ');
};

Blockly.Generator.R.forBlock['aes_color'] = function(block, generator) {
    const color = generator.valueToCode(block, 'COLOR', Blockly.Generator.R.ORDER_ATOMIC);
    const cleanColor = color ? color.replace(/["']/g, '') : '';
    const result = color ? `color = ${cleanColor}` : '';
    return result;
};

Blockly.Generator.R.forBlock['aes_size'] = function(block, generator) {
    const size = generator.valueToCode(block, 'SIZE', Blockly.Generator.R.ORDER_ATOMIC);
    const cleanSize = size ? size.replace(/["']/g, '') : '';
    const result = size ? `size = ${cleanSize}` : '';
    return result;
};

Blockly.Generator.R.forBlock['aes_fill'] = function(block, generator) {
    const fill = generator.valueToCode(block, 'FILL', Blockly.Generator.R.ORDER_ATOMIC);
    const cleanFill = fill ? fill.replace(/["']/g, '') : '';
    return fill ? `fill = ${cleanFill}` : '';
};

Blockly.Generator.R.forBlock['aes_alpha'] = function(block, generator) {
    const alpha = generator.valueToCode(block, 'ALPHA', Blockly.Generator.R.ORDER_ATOMIC);
    return alpha ? `alpha = ${alpha}` : '';
};

// Geometry generators
Blockly.Generator.R.forBlock['geom_point'] = function(block, generator) {
    let options = [];
    let optionBlock = block.getInputTargetBlock('OPTIONS');

    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_point(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

Blockly.Generator.R.forBlock['geom_bar'] = function(block, generator) {
    let options = [];
    let optionBlock = block.getInputTargetBlock('OPTIONS');

    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_bar(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

Blockly.Generator.R.forBlock['geom_histogram'] = function(block, generator) {
    const binwidth = generator.valueToCode(block, 'BINWIDTH', Blockly.Generator.R.ORDER_ATOMIC);

    let options = [];
    if (binwidth) {
        options.push(`binwidth = ${binwidth}`);
    }

    let optionBlock = block.getInputTargetBlock('OPTIONS');
    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_histogram(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

Blockly.Generator.R.forBlock['geom_line'] = function(block, generator) {
    let options = [];
    let optionBlock = block.getInputTargetBlock('OPTIONS');

    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_line(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

Blockly.Generator.R.forBlock['geom_smooth'] = function(block, generator) {
    const method = block.getFieldValue('METHOD');

    let options = [];
    if (method !== 'auto') {
        options.push(`method = "${method}"`);
    }
    if (method === 'lm') {
        options.push('formula = y ~ x');
    }

    let optionBlock = block.getInputTargetBlock('OPTIONS');
    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_smooth(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

Blockly.Generator.R.forBlock['geom_sf'] = function(block, generator) {
    generator.requirePackage('sf');

    let options = [];
    let optionBlock = block.getInputTargetBlock('OPTIONS');

    while (optionBlock) {
        const optionCode = generateSingleBlockCode(optionBlock, generator);
        if (optionCode && Array.isArray(optionCode) && optionCode[0]) {
            options.push(optionCode[0]);
        } else if (optionCode && typeof optionCode === 'string' && optionCode.trim()) {
            options.push(optionCode.trim());
        }
        optionBlock = optionBlock.getNextBlock();
    }

    let code = 'geom_sf(';
    if (options.length > 0) {
        code += options.join(', ');
    }
    code += ')';

    return code;
};

// Geometry option generators
Blockly.Generator.R.forBlock['geom_color'] = function(block, generator) {
    const color = block.getFieldValue('COLOR');
    return [`color = "${color}"`, Blockly.Generator.R.ORDER_NONE];
};

Blockly.Generator.R.forBlock['geom_fill'] = function(block, generator) {
    const fill = block.getFieldValue('FILL');
    return [`fill = "${fill}"`, Blockly.Generator.R.ORDER_NONE];
};

Blockly.Generator.R.forBlock['geom_alpha'] = function(block, generator) {
    const alpha = block.getFieldValue('ALPHA');
    return [`alpha = ${alpha}`, Blockly.Generator.R.ORDER_NONE];
};

Blockly.Generator.R.forBlock['geom_size'] = function(block, generator) {
    const size = block.getFieldValue('SIZE');
    return [`size = ${size}`, Blockly.Generator.R.ORDER_NONE];
};

// Theme generator
Blockly.Generator.R.forBlock['theme_preset'] = function(block, generator) {
    const theme = block.getFieldValue('THEME');
    return `theme_${theme}()`;
};

// Labels generator
Blockly.Generator.R.forBlock['labs'] = function(block, generator) {
    const title = generator.valueToCode(block, 'TITLE', Blockly.Generator.R.ORDER_ATOMIC);
    const x = generator.valueToCode(block, 'X', Blockly.Generator.R.ORDER_ATOMIC);
    const y = generator.valueToCode(block, 'Y', Blockly.Generator.R.ORDER_ATOMIC);
    const color = generator.valueToCode(block, 'COLOR', Blockly.Generator.R.ORDER_ATOMIC);
    const size = generator.valueToCode(block, 'SIZE', Blockly.Generator.R.ORDER_ATOMIC);

    let parts = [];
    if (title) parts.push(`title = ${title}`);
    if (x) parts.push(`x = ${x}`);
    if (y) parts.push(`y = ${y}`);
    if (color) parts.push(`color = ${color}`);
    if (size) parts.push(`size = ${size}`);

    if (parts.length === 0) return '';

    return `labs(${parts.join(', ')})`;
};

// Scale generator
Blockly.Generator.R.forBlock['scale_color_viridis'] = function(block, generator) {
    const type = block.getFieldValue('TYPE');
    return `scale_colour_viridis_${type}()`;
};

// Facet generator
Blockly.Generator.R.forBlock['facet_grid'] = function(block, generator) {
    const rows = generator.valueToCode(block, 'ROWS', Blockly.Generator.R.ORDER_ATOMIC);
    const cols = generator.valueToCode(block, 'COLS', Blockly.Generator.R.ORDER_ATOMIC);

    if (!rows && !cols) return '';

    let formula = '';
    const cleanRows = rows ? rows.replace(/["']/g, '') : '';
    const cleanCols = cols ? cols.replace(/["']/g, '') : '';
    
    if (rows && cols) {
        formula = `${cleanRows} ~ ${cleanCols}`;
    } else if (rows) {
        formula = `${cleanRows} ~ .`;
    } else {
        formula = `. ~ ${cleanCols}`;
    }

    return `facet_grid(${formula})`;
};

// Coordinate generator
Blockly.Generator.R.forBlock['coord_fixed'] = function(block, generator) {
    return 'coord_fixed()';
};
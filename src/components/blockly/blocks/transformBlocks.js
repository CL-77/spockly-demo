import * as Blockly from "blockly";


// Convert to SF object with geographic coordinates
Blockly.defineBlocksWithJsonArray([
	{
		type: "convert_to_sf",
		message0: "convert %1\n to sf object with\n lon: %2\n lat: %3\n crs: %4\n",
		args0: [
			{
				type: "input_value",
				name: "OBJECT",
				check: "DataFrame",
			},
			{
				type: "input_value",
				name: "LONG",
				check: "String",
			},
			{
				type: "input_value",
				name: "LAT",
				check: "String",
			},
			{
				type: "input_value",
				name: "CRS",
				check: "Number",
			},
		],
		output: "SFObject",
		colour: "#FFA726",
		tooltip: "Convert a DataFrame to an SF object with geographic coordinates",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["convert_to_sf"] = function (block, generator) {
	generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
	const dataFrame = generator.valueToCode(block, "OBJECT", Blockly.Generator.R.ORDER_NONE);
	const long = generator.valueToCode(block, "LONG", Blockly.Generator.R.ORDER_NONE) || '"longitude"';
	const lat = generator.valueToCode(block, "LAT", Blockly.Generator.R.ORDER_NONE) || '"latitude"';
	const crs = generator.valueToCode(block, "CRS", Blockly.Generator.R.ORDER_ATOMIC) || "4326"; // Default to WGS 84
	return [
		`sf::st_as_sf(${dataFrame}, coords = c(${long}, ${lat}), crs = ${crs})`,
		Blockly.Generator.R.ORDER_ATOMIC,
	];
};


// Convert to Data Frame
Blockly.defineBlocksWithJsonArray([
    {
        type: "convert_to_dataframe",
        message0: "convert to DataFrame %1",
        args0: [
            {
                type: "input_statement",
                name: "OBJECTS",
            },
        ],
        output: "DataFrame",
        colour: "#FFA726",
        tooltip: "Convert objects to a DataFrame",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["convert_to_dataframe"] = function (block, generator) {
    let objectsCode = [];
    let seenCode = new Set(); // Use a Set to keep track of unique code snippets
    let objectBlock = block.getInputTargetBlock('OBJECTS');

    while (objectBlock) {
        const objectCode = generateSingleBlockCode(objectBlock, generator);
        if (objectCode && !seenCode.has(objectCode)) {
            seenCode.add(objectCode);
            objectsCode.push(objectCode);
        }
        objectBlock = objectBlock.getNextBlock();
    }

    // Join all the objects with commas and create a data frame
    return [`data.frame(${objectsCode.join(', ')})`, Blockly.Generator.R.ORDER_ATOMIC];
};

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
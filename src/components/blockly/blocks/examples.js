import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
    {
      type: "create_vector",
      message0: "vector with %1",
      args0: [
        {
          type: "field_input",
          name: "ELEMENTS",
          text: "1, 2, 3",
        },
      ],
      output: null,
      colour: 230,
      tooltip: "Create a numeric vector",
      helpUrl: "",
    },
  ]);
  
  Blockly.Generator.R.forBlock["create_vector"] = function (block) {
    const elements = block.getFieldValue("ELEMENTS");
    return [`c(${elements})`, Blockly.Generator.R.ORDER_ATOMIC];
  };
  
  Blockly.defineBlocksWithJsonArray([
    {
      type: "plot_vector",
      message0: "plot %1",
      args0: [
        {
          type: "input_value",
          name: "VECTOR",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 200,
      tooltip: "Plot a vector using plot()",
      helpUrl: "",
    },
  ]);
  
  Blockly.Generator.R.forBlock["plot_vector"] = function (block, generator) {
    const vector =
      generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
      "c()";
    return `plot(${vector})\n`;
  };


// Generate random numbers from normal distribution
Blockly.defineBlocksWithJsonArray([
    {
        type: "rnorm_block",
        message0: "rnorm %1 values with mean %2 and standard deviation %3",
        args0: [
            {
                type: "input_value",
                name: "N",
                check: "Number",
            },
            {
                type: "input_value",
                name: "MEAN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "SD",
                check: "Number",
            },
        ],
        output: "Array",
        colour: 160,
        tooltip: "Generate random numbers from a normal distribution",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["rnorm_block"] = function (block, generator) {
    const n = generator.valueToCode(block, "N", Blockly.Generator.R.ORDER_ATOMIC);
    const mean = generator.valueToCode(
        block,
        "MEAN",
        Blockly.Generator.R.ORDER_ATOMIC
    );
    const sd = generator.valueToCode(
        block,
        "SD",
        Blockly.Generator.R.ORDER_ATOMIC
    );

    return [
        `rnorm(${n}, mean = ${mean}, sd = ${sd})`,
        Blockly.Generator.R.ORDER_ATOMIC,
    ];
};

// Numeric literal
Blockly.Generator.R.forBlock["math_number"] = function (block) {
    const code = Number(block.getFieldValue("NUM"));
    return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

// Text block
Blockly.defineBlocksWithJsonArray([
    {
        type: "text",
        message0: "%1",
        args0: [
            {
                type: "field_input",
                name: "TEXT",
                text: "",
            },
        ],
        output: "String",
        colour: 160,
        tooltip: "A block containing text.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["text"] = function (block) {
    const text = block.getFieldValue("TEXT");
    return [`"${text}"`, Blockly.Generator.R.ORDER_ATOMIC];
};

// Print block
Blockly.defineBlocksWithJsonArray([
    {
        type: "text_print",
        message0: "print %1",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
        tooltip: "Print text to the console.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["text_print"] = function (block, generator) {
    const text =
        generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) ||
        '""';
    return `print(${text})\n`;
};

// Get Working Directory block
Blockly.defineBlocksWithJsonArray([
    {
    type: "print_files",
    message0: "print files",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Print the files in the current working directory.",
    helpUrl: ""
    }
]);

Blockly.Generator.R.forBlock["print_files"] = function (block, generator) {
    return "print(list.files())\n";
};

Blockly.defineBlocksWithJsonArray([
    {
        type: "head_print",
        message0: "print header %1",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
        tooltip: "Print header of csv to the console.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["head_print"] = function (block, generator) {
    const text =
        generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) ||
        '""';
    return `print(names(${text}))\n`;
};


// x to y mapping block
Blockly.defineBlocksWithJsonArray([
	{
		type: "x_to_y_mapping",
		message0: "map %1 to %2",
		args0: [
			{
				type: "input_value",
				name: "X",
				check: "Number",
			},
			{
				type: "input_value",
				name: "Y",
				check: "Number",
			},
		],
		output: null,
		colour: 160,
		tooltip: "Map x to y values.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["x_to_y_mapping"] = function (block, generator) {
	const x = generator.valueToCode(block, "X", Blockly.Generator.R.ORDER_ATOMIC);
	const y = generator.valueToCode(block, "Y", Blockly.Generator.R.ORDER_ATOMIC);
	return [`(${x}:${y})`, Blockly.Generator.R.ORDER_ATOMIC];
};


Blockly.defineBlocksWithJsonArray([
	{
	  type: "ggplot_test",
	  message0: "create ggplot",
	  previousStatement: null,
	  nextStatement: null,
	  colour: 160,
	  tooltip: "Create a ggplot test plot.",
	  helpUrl: "",
	},
  ]);
  
  Blockly.Generator.R.forBlock["ggplot_test"] = function (block, generator) {
	generator.requirePackage('ggplot2');
	return `test_data <- data.frame(\n` +
	  `  x = 1:10,\n` +
	  `  y = c(2, 5, 3, 8, 6, 9, 7, 10, 12, 11)\n` +
	  `)\n` +
	  `print(ggplot(test_data, aes(x = x, y = y)) + \n` +
	  `  geom_point() + \n` +
	  `  ggtitle("Einfacher Testplot mit ggplot2") + \n` +
	  `  theme_minimal())\n`;
  };

  // debug packages
Blockly.defineBlocksWithJsonArray([
	{
		type: "debug_packages",
		message0: "require package",
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Require a package in R.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["debug_packages"] = function (block, generator) {
	return `# Debug: Zeige geladene Pakete\n` +
	  `print("Loaded packages:")\n` +
	  `print(loadedNamespaces())\n` +
	  `\n` +
	  `# Versuche ggplot2 zu laden\n` +
	  `tryCatch({\n` +
	  `  library(ggplot2)\n` +
	  `  print("ggplot2 loaded successfully")\n` +
	  `}, error = function(e) {\n` +
	  `  print(paste("Error loading ggplot2:", e$message))\n` +
	  `})\n`;
  };
import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "linear_regression",
    message0: "linear model: %1 ~ %2",
    args0: [
      { type: "field_input", name: "RESPONSE", text: "y" },
      { type: "field_input", name: "PREDICTOR", text: "x" },
    ],
    output: null,
    colour: "#A1887F",
    tooltip: "Run a linear regression",
  },
  {
    type: "semivariogram",
    message0: "compute semivariogram of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Compute a semivariogram",
  },
  {
    type: "kriging_interpolation",
    message0: "interpolate using kriging on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform kriging interpolation",
  },
  {
    type: "idw_interpolation",
    message0: "interpolate using IDW on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using inverse distance weighting"
  },
  {
    type: "nn_interpolation",
    message0: "interpolate using nearest neighbour on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using nearest neighbour"
  }
]);

Blockly.defineBlocksWithJsonArray([
	{
	  "type": "linear_model_block",
	  "message0": "linear model of %1 with dependent variable %2 and independent variable %3",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "DATA",
		  "check": "DataFrame"
		},
		{
		  "type": "input_value",
		  "name": "DEPENDENT_VAR",
		  "check": "String"
		},
		{
		  "type": "input_value",
		  "name": "INDEPENDENT_VAR",
		  "check": "String"
		}
	  ],
	  "output": "LinearModel",
	  "colour": "#A1887F",
	  "tooltip": "Create a linear model with specified dependent and independent variables",
	  "helpUrl": ""
	}
  ]);

  Blockly.Generator.R.forBlock['linear_model_block'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC);
	const dependentVar = generator.valueToCode(block, 'DEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC);
	const independentVar = generator.valueToCode(block, 'INDEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC);
	const cleanDependentVar = dependentVar.replace(/["']/g, '');
    const cleanIndependentVar = independentVar.replace(/["']/g, '');

	return [
		`lm(${cleanDependentVar} ~ ${cleanIndependentVar}, data = ${data})`,
		Blockly.Generator.R.ORDER_ATOMIC,
	];
  };
  
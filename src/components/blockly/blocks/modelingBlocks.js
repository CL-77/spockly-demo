import * as Blockly from "blockly";

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
	},
  {
    type: "semivariogram",
    message0: "compute semivariogram of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#A1887F",
    tooltip: "Compute a semivariogram",
    helpUrl: "https://www.rdocumentation.org/packages/gstat/versions/2.1-1/topics/vgm"
  },
  {
    type: "kriging_interpolation",
    message0: "interpolate using kriging on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#A1887F",
    tooltip: "Perform kriging interpolation",
    helpUrl: "https://www.rdocumentation.org/packages/gstat/versions/2.1-1/topics/krige"
  },
  {
    type: "idw_interpolation",
    message0: "interpolate using IDW on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using inverse distance weighting",
    helpUrl: "https://www.rdocumentation.org/packages/phylin/versions/2.0.2/topics/idw"
  },
  {
    type: "nn_interpolation",
    message0: "interpolate using nearest neighbour on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#A1887F",
    tooltip: "Perform interpolation using nearest neighbour",
    helpUrl: "https://www.rdocumentation.org/packages/class/versions/7.3-23/topics/knn"
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
  
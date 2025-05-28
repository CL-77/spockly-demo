import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "sum_vector",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Sum of all elements in a vector",
  },
  {
    type: "vector_minus_scalar",
    message0: "%1 minus %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "input_value", name: "SCALAR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Subtract scalar from each element of the vector"
  },
  {
    type: "square_vector",
    message0: "%1 squared",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square each element in the vector",
  },
  {
    type: "sqrt_vector",
    message0: "sqrt of %1",
    args0: [{ type: "input_value", name: "INPUT" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square root of a value or expression",
  },
  {
    type: "divide_values",
    message0: "%1 divided by %2",
    args0: [
      { type: "input_value", name: "NUMERATOR" },
      { type: "input_value", name: "DENOMINATOR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Divide one value by another",
    helpUrl: ""
  },
  // --- Additional math blocks ---
  {
    type: "exp_of",
    message0: "exp of %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Exponential of a value",
  },
  {
    type: "log_of",
    message0: "log of %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Natural logarithm of a value",
  },
  {
    type: "sin_of",
    message0: "sin of %1",
    args0: [{ type: "input_value", name: "ANGLE" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Sine of an angle (in radians)",
  },
  {
    type: "round_value",
    message0: "round %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Round a number to the nearest integer",
  },
  {
    type: "modulo_values",
    message0: "%1 modulo %2",
    args0: [
      { type: "input_value", name: "DIVIDEND" },
      { type: "input_value", name: "DIVISOR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Modulo operation (x %% y)",
  }
]);
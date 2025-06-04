import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import english from "../../locales/english"
import german from "../../locales/german"
const g = german;
const e = english;
console.log(g, e);

/**
 * Value Input Block (returns value)
 */

Blockly.Blocks["math_square"] = {
  init: function () {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField("square of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(e.math_square.tooltip);
  },
};
pythonGenerator.forBlock["math_square"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`(${num} ** 2)`, pythonGenerator.ORDER_EXPONENTIATION];
};

/**
 * Statement Input Block (loop)
 */
Blockly.Blocks["repeat_times"] = {
  init: function () {
    this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
    this.appendStatementInput("DO").appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Repeat N times");
  },
};
pythonGenerator.forBlock["repeat_times"] = function (block, generator) {
  const times =
    generator.valueToCode(block, "TIMES", pythonGenerator.ORDER_NONE) || "0";
  const branch = generator.statementToCode(block, "DO");
  return `for i in range(${times}):\n${branch}`;
};

/**
 * Length of str (returns int)
 */
Blockly.Blocks["length_of_str"] = {
  init: function(){
    this.appendValueInput('STR')
    .appendField('length of')
    .setCheck('String');
    this.appendDummyInput();
    this.appendEndRowInput();
    this.setOutput(true, 'Number');
    this.setColour(90);
    this.setTooltip('Returns the length of a given string');
  },
};
pythonGenerator.forBlock["length_of_str"] = function(block, generator) {
  const length = generator.valueToCode(block, 'STR', pythonGenerator.ORDER_NONE) || '0';
  return [`len(${length})`, pythonGenerator.ORDER_ATOMIC];
};

/**Block modulo**/
Blockly.Blocks['modulo'] = {
  init: function() {
    this.appendValueInput('NAME')
    .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField(new Blockly.FieldNumber(0), 'a')
      .appendField(new Blockly.FieldLabelSerializable('modulo'), 'NAME')
      .appendField(new Blockly.FieldNumber(0), 'b');
    this.setOutput(true, 'Number');
    this.setTooltip('Module: returns the remainder of a division');
    this.setColour(230);
  }
};
pythonGenerator.forBlock['modulo'] = function(block) {
  const number_a = block.getFieldValue('a');
  const number_b = block.getFieldValue('b');
  return [`(${number_a} % ${number_b})`, pythonGenerator.ORDER_MULTIPLICATIVE];
}

/**
 * Operators block
 */
Blockly.Blocks['operators'] = {
  init: function() {
    this.appendValueInput('VALUE')
    .setAlign(Blockly.inputs.Align.RIGHT)
    .setCheck('Boolean');
    this.appendValueInput('VALUE2')
    .setCheck('Boolean')
      .appendField(new Blockly.FieldDropdown([
          ['XOR', 'XOR'],
          ['AND', 'AND'],
          ['OR', 'OR'],
          ['NOT', 'NOT']
        ]), 'NAME');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('All the basic logical operators');
    this.setColour(0);
  }
};
pythonGenerator.forBlock['operators'] = function(block, generator) {
  
  const dropdown_name = block.getFieldValue('NAME');
  const valu = generator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC);
  const valu2 = generator.valueToCode(block, 'VALUE2', pythonGenerator.ORDER_ATOMIC);

  switch (dropdown_name) {
    case 'AND':
      return [`(${valu} & ${valu2})`, pythonGenerator.ORDER_LOGICAL_AND];
    case 'OR':
      return [`(${valu} | ${valu2})`, pythonGenerator.ORDER_LOGICAL_OR];
    case 'XOR':
      return [`(${valu} ^ ${valu2})`, pythonGenerator.ORDER_BITWISE_XOR];
    case 'NOT':
      return [`(not ${valu2})`, pythonGenerator.ORDER_LOGICAL_NOT];
  }
}

/** Mathematical constants */
Blockly.Blocks['consts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['e', 'e'],
          ['π', 'pi'],
          ['∞', 'inf'],
          ['γ', 'euler_gamma'],
          ['NaN', 'nan']
        ]), 'NUM');
    this.setOutput(true, "Number");
    this.setTooltip('A block to be able to use several mathematical constants');
    this.setColour(230);
  }
}
pythonGenerator.forBlock['consts'] = function(block) {
  const dropdown_name = block.getFieldValue('NUM');
  return [`np.${dropdown_name}`, pythonGenerator.ORDER_ATOMIC];
}

/************************
 * 
 * LOADING BLOCKS
 * 
 ************************/
/**
 * Load csv file
 */
Blockly.Blocks['load_csv'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from CSV:')
        .appendField(new Blockly.FieldTextInput('file'), 'CSV')
        .appendField('.csv');
    this.setTooltip('Loads a given CSV dataset');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_csv'] = function(block) {
  const dataset = block.getFieldValue('CSV') || '0';
  return [`pd.read_csv('${dataset}.csv')`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * Load file from URL
 */
Blockly.Blocks['load_csv_from_url'] = {
  init: function(){
    this.appendDummyInput()
    .appendField('Load CSV file from URL')
    .appendField(new Blockly.FieldTextInput('http://example.com/file.csv', (url) => url.match(/^[a-z]{4,5}:\/\/[A-Za-zÀ-ÖØ-öø-ÿ0-9./:_-]*?\.[a-z]{2,6}/) ? url : 'ERROR!'), 'CSV');
    this.setTooltip('Loads a given CSV dataset from an URL. Local files can be used by prepending "file://".');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);

  },
};
pythonGenerator.forBlock['load_csv_from_url'] = function(block) {
  const dataset = block.getFieldValue('CSV') || '0';
  return [`pd.read_csv('${dataset}')\n`, pythonGenerator.ORDER_ATOMIC];
};
      
/** sqrt block**/
Blockly.Blocks["sqrt_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("sqrt of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sqrt of a number");
  },
};
pythonGenerator.forBlock["sqrt_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sqrt(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** exponentiel block**/
Blockly.Blocks["exp_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("exp of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the exponential of a number");
  },
};
pythonGenerator.forBlock["exp_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.exp(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** logarithm block**/
Blockly.Blocks["log_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("log of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the logarithm of a number");
  },
};
pythonGenerator.forBlock["log_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.log(${num})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['trigo'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([
          ['sin', 'sin'],
          ['cos', 'cos'],
          ['tan', 'tan'],
          ['arcsin', 'arcsin'],
          ['arccos', 'arccos'],
          ['arctan', 'arctan'],
          ['sinh', 'sinh'],
          ['cosh', 'cosh'],
          ['tanh', 'tanh'],
          ['arcsinh', 'arcsinh'],
          ['arccosh', 'arccosh'],
          ['arctanh', 'arctanh']
        ]), 'TRIGO');
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sine, cosine, tangent, etc. of a number");
  }
}
pythonGenerator.forBlock['trigo'] = function (block, generator) {
  const num = generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  const trigFunc = block.getFieldValue('TRIGO');
  return [`np.${trigFunc}(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** round block**/
Blockly.Blocks["round"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("round");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the unit round of a number");
  },
};
pythonGenerator.forBlock["round"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.round(${num})`, pythonGenerator.ORDER_ATOMIC];
};

//** boolean blocks*/
Blockly.Blocks['bool1'] = {
  init: function() {
    this.appendDummyInput('')
      .appendField('True');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value True');
    this.setHelpUrl('');
    this.setColour(230);
  }
};
pythonGenerator.forBlock['bool1'] = function() {
  return ['True', pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['bool2'] = {
  init: function() {
    this.appendDummyInput('')
      .appendField('False');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value False');
    this.setHelpUrl('');
    this.setColour(230);
  }
};
pythonGenerator.forBlock['bool2'] = function() {
  return ['False', pythonGenerator.ORDER_ATOMIC];
}

/** 
 * Mean of array of numbers
 */
Blockly.Blocks["mean"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the mean of an array of numbers");
  },
};
pythonGenerator.forBlock["mean"] = function(block, generator) {
  const mean =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.mean(${mean})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Median of array of numbers
 */
Blockly.Blocks["median"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Median of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the median of an array of numbers");
  },
};
pythonGenerator.forBlock["median"] = function(block, generator) {
  const median =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.median(${median})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Sum of array of numbers
 */
Blockly.Blocks["sum"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Sum of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the sum of an array of numbers");
  },
};
pythonGenerator.forBlock["sum"] = function(block, generator) {
  const sum =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sum(${sum})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Standard deviation of array of numbers
 */
Blockly.Blocks["std"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Standard deviation of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the standard deviation of an array of numbers");
  },
};
pythonGenerator.forBlock["std"] = function(block, generator) {
  const std =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.std(${std})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * mean squared error of array of numbers
 */
Blockly.Blocks["mean_squared"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean squared error of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the mean squared error of an array of numbers");
  },
};
pythonGenerator.forBlock["mean_squared"] = function(block, generator) {
  const msq =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`(quad_err = 0\nfor i in range(${msq}.shape[0]) :\n  quad_err += (${msq}[i,0] - np.mean(${msq}))**2\n
quad_err /= ${msq}.shape[0])\n`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum of array of numbers
 */
Blockly.Blocks['max'] = {
  init: function() {
    this.appendValueInput('maximum')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Maximum of'), 'MAXIMUM');
    this.setOutput(true, 'Number');
    this.setTooltip('"Returns the maximum of an array of numbers"');
    this.setHelpUrl('');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["max"] = function(block, generator) {
  const maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.max(${maxi})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Minimum of array of numbers
 */
Blockly.Blocks['min'] = { 
  init: function() {
    this.appendValueInput('minimum')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Minimum of'), 'MINIMUM');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the minimum of an array of numbers');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["min"] = function(block, generator) {
  const mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.min(${mini})`, pythonGenerator.ORDER_ATOMIC];
};
                
/* Slice iterable */
Blockly.Blocks['slice'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice variable')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR")
        .appendField('to values')
        .appendField(new Blockly.FieldNumber("0"), "VAL1")
        .appendField(':')
        .appendField(new Blockly.FieldNumber("0"), "VAL2");
    this.setOutput(true);
    this.setTooltip('Slice a variable according to given indexes.')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice'] = function(block) {
  const Val1 = block.getFieldValue('VAL1');
  const Val2 = block.getFieldValue('VAL2');
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  return [`${Var}[${Val1}:${Val2}]\n`, pythonGenerator.ORDER_ATOMIC]
};

/* Slice file */
Blockly.Blocks['slice_file'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice file')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR");
    this.appendValueInput('CNAME')
        .appendField('to condition');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Slice a file according to a given condition.')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice_file'] = function(block, generator) {
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  const cond = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${Var}[${cond}]`, pythonGenerator.ORDER_COLLECTION]
};

Blockly.Blocks['list_access'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "LIST")
        .appendField('[');
    this.appendValueInput('CNAME');
    this.appendEndRowInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Access an element in a given list');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['list_access'] = function(block, generator) {
  const varName = block.getFieldValue('LIST') || '0';
  const getVar = block.workspace.getVariableById(varName);
  const listName = getVar ? getVar.name : 'undefined';
  const elem = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${listName}[${elem}]`, pythonGenerator.ORDER_ATOMIC]
};

/**
 * Block for creating a list
 */

Blockly.Blocks['list_create'] = {
  init: function() {
    this.itemCount_ = 1;
    this.appendValueInput('element_0')
    .appendField('create list');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close').appendField(appendFieldPlusIcon);
    this.setColour(230);
    this.setOutput(true, null);
    this.setTooltip('Create a Python list');
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i)

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}
pythonGenerator.forBlock['list_create'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || 'None');
  }
  return [`[${elements.join(', ')}]`, pythonGenerator.ORDER_ATOMIC];
};
function getExtraBlockState(block) {
  if (block.saveExtraState) {
    const state = block.saveExtraState()
    return state ? JSON.stringify(state) : ''
  } else if (block.mutationToDom) {
    const state = block.mutationToDom()
    return state ? Blockly.Xml.domToText(state) : ''
  }
  return ''
}

/**
 * Statistical blocks
 */

//**Shape of data */
Blockly.Blocks['data_shape'] = {
  init: function() {
    this.appendValueInput('data')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('Data shape'), 'DATA SHAPE');
    this.setInputsInline(true)
    this.setOutput(true, 'tuple');
    this.setTooltip('Find shape of data');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['data_shape'] = function(block, generator) {
  const data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_ATOMIC);
  return [`np.shape(${data})`, pythonGenerator.ORDER_COLLECTION];
}

//**stacking data */
Blockly.Blocks['stacking'] = {
  init: function() {
    this.appendValueInput('db1')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('stacking by'), 'NAME')
      .appendField(new Blockly.FieldDropdown([
          ['columns', 'COLUMNS'],
          ['rows', 'ROWS']
        ]), 'type');
    this.appendValueInput('db2')
    .setCheck('Array');
    this.setInputsInline(true)
    this.setOutput(true, 'Array');
    this.setTooltip('Stack the data by rows or columns');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['stacking'] = function(block, generator) {
  const dropdown_type = block.getFieldValue('type');
  const db1 = generator.valueToCode(block, 'db1', pythonGenerator.ORDER_COLLECTION);
  const db2 = generator.valueToCode(block, 'db2', pythonGenerator.ORDER_COLLECTION);
  switch (dropdown_type) {
    case 'COLUMNS':
      return [`np.hstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
    case 'ROWS':
      return [`np.vstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
  }
}

//** create an array*/
Blockly.Blocks['create_array'] = {
  init: function() {
    this.appendValueInput('array')
    .setCheck(['Number', 'Boolean', 'String', 'List', 'Matrix'])
      .appendField(new Blockly.FieldLabelSerializable('create array of'), 'CREATE');
    this.setOutput(true, 'Array');
    this.setTooltip('Create an array with np.array()');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['create_array'] = function(block, generator) {
  const array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_ATOMIC);
  return [`np.array(${array})`, pythonGenerator.ORDER_COLLECTION];
}             

Blockly.Blocks['delete_axes'] = {
  init: function() {
    this.appendValueInput('ColArr')
        .setCheck(['List', 'String', 'Number'])
        .appendField((new Blockly.FieldLabel('ColArr'), 'Delete columns'));
    this.appendValueInput('IndArr')
        .setCheck(['List', 'String', 'Number'])
        .appendField((new Blockly.FieldLabel('IndArr'), 'and/or rows'));
    this.appendDummyInput()
        .appendField('from dataframe')
        .appendField(new Blockly.FieldVariable('df'), 'DATAFRAME');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Deletes given rows and columns from a dataframe');
    this.setColour(195);
  }
};
pythonGenerator.forBlock['delete_axes'] = function(block, generator) {
  const delCols = generator.valueToCode(block, 'ColArr', pythonGenerator.ORDER_ATOMIC) || '';
  const delInds = generator.valueToCode(block, 'IndArr', pythonGenerator.ORDER_COLLECTION) || '';
  const varID = block.getFieldValue('DATAFRAME') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const df = getVar ? getVar.name : 'df';
  return `${df}.drop(index=${delInds}, columns=${delCols}, inplace=True)\n`;
}


//**Delete in an array */
Blockly.Blocks['delete_object'] = {
  init: function() {
    this.appendValueInput('object')
    .setCheck(['Array', 'Number'])
      .appendField(new Blockly.FieldLabelSerializable('delete'), 'DELETE');
      
    this.appendValueInput('array')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('in'), 'IN');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip('Delete an object in an array');
    this.setColour(195);
  }
};
pythonGenerator.forBlock['delete_object'] = function(block, generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.delete(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

//**Add in an array */
Blockly.Blocks['add_object'] = {
  init: function() {
    this.appendValueInput('object')
    .setCheck(['Array', 'Number'])
      .appendField(new Blockly.FieldLabelSerializable('add'), 'ADD');
    this.appendValueInput('array')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('in'), 'IN');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip('Add an object in an array');
    this.setHelpUrl('');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['add_object'] = function(block, generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.append(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

/**
 * Nunmpy: filter list
 */
Blockly.Blocks['list_filter'] = {
  init: function() {
    this.appendValueInput('CNAME')
      .appendField('array to filter')
      .appendField(new Blockly.FieldTextInput('LIST_NAME'), 'CNAME');
    this.appendValueInput('DNAME')
      .appendField('according to')
      .appendField(new Blockly.FieldTextInput('LIST_NAME2'), 'DNAME');
    this.appendDummyInput('ENAME')
      .appendField('store array in')
      .appendField(new Blockly.FieldTextInput('VAR_NAME'), 'ENAME');
    this.setInputsInline(false)
    this.setOutput(true, null);
    this.setTooltip('Filter a list according to a list of booleans');
    this.setHelpUrl('');
    this.setColour(315);
  }
};
pythonGenerator.forBlock['list_filter'] = function(block, generator) {
  const text_cname = block.getFieldValue('CNAME');
  const text_dname = block.getFieldValue('DNAME');
  const text_ename = block.getFieldValue('ENAME');
  const value_cname = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  const value_dname = generator.valueToCode(block, 'DNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${text_cname} = np.array(${value_cname})\n${text_dname} = ${value_dname}\n${text_ename} = ${text_cname}[${text_dname}]\n`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Value to boolean
 */
Blockly.Blocks['to_bool'] = {
  init: function() {
    this.appendValueInput('NAME')
      .appendField('convert to boolean');
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean');
    this.setTooltip('Transform a value into a boolean');
    this.setHelpUrl('');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['to_bool'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
  return [`bool(${value_name})`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Line-break
 */

Blockly.Blocks['line_break'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Line-break');
    this.setTooltip('Enter a line-break in code');
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour('#888');
  }
};
pythonGenerator.forBlock['line_break'] = function() {
  return '\n'
}

/**
 * Sort a list
 */

Blockly.Blocks['sort'] = {
  init: function() {
    this.appendValueInput('CNAME')
      .appendField('list to sort');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('Sort an array (one- or multidimensionl)');
    this.setHelpUrl('');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['sort'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`np.sort(np.array(${value_name}))`, pythonGenerator.ORDER_ATOMIC];
}

/**
 * Input block
 */

Blockly.Blocks['input'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('input')
        .appendField(new Blockly.FieldTextInput('question', (txt) => { 
          return txt
        }), 'CSV');
    this.setTooltip('Make user input a value');
    this.setOutput(true, null);
    this.appendEndRowInput();
    this.setColour(95);
  }
};
pythonGenerator.forBlock['input'] = function(block) {
  const question = block.getFieldValue('CSV') || '0';
  return [`input('${question}')`, pythonGenerator.ORDER_ATOMIC];
}

/** Lambda func block */
Blockly.Blocks['lambda'] = {
  init: function() {
    this.appendValueInput('EXPR')
        .appendField('lambda')
        .appendField(new Blockly.FieldTextInput('x', (txt) => txt.match(/^[A-Za-z_][A-Za-z0-9_]*$/) ? txt : 'ERROR!'), 'LAMBDA')
        .appendField(':');
    this.setTooltip('Python lambda function. You can use multiple arguments by separating them with a comma.');
    this.setColour(120);
    this.setHelpUrl('https://www.w3schools.com/python/python_lambda.asp');
    this.setOutput(true);
  }
}

pythonGenerator.forBlock['lambda'] = function(block, generator) {
  const VAR = block.getFieldValue('LAMBDA') || '0';
  const EXPR = generator.valueToCode(block, 'EXPR', pythonGenerator.ORDER_NONE)
  return [`lambda ${VAR}: (${EXPR})`, pythonGenerator.ORDER_LAMBDA];
}

/**
 * Temporary variables
 * 
 * As these could represent a dangerous security
 * threat when compiling, they are limited to
 * one character so as to protect the compiler
 * from malware.
 */
Blockly.Blocks['temp_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('VAR_NAME', (txt) => txt.slice(0, 1)), 'var');
    this.setOutput(true);
    this.setColour(15);
  }
};
pythonGenerator.forBlock['temp_var'] = function(block) {
  const varName = block.getFieldValue('var') || '0';
  return [varName, pythonGenerator.ORDER_ATOMIC];
};

/** Import blocks */
Blockly.Blocks['import0'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT');
    this.setTooltip('Import module to code');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import0'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  return `import ${module}\n`;
}

Blockly.Blocks['import1'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS')
    this.setTooltip('Import library to code, with alias');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import1'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const alias = block.getFieldValue('ALIAS') || 'alias';
  return `import ${module} as ${alias}\n`;
}

Blockly.Blocks['import2'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION');
    this.setTooltip('Import functions from library to code. You can also use \'*\' and specify more functions separating them with commas.');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import2'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const func = block.getFieldValue('FUNCTION') || 'function';
  return `from ${module} import ${func}\n`;
}

Blockly.Blocks['import3'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS');
    this.setTooltip('Import library to code.');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import3'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const func = block.getFieldValue('FUNCTION') || 'function';
  const alias = block.getFieldValue('ALIAS') || 'alias';
  return `from ${module} import ${func} as ${alias}\n`;
};

/*****************
 * DATA VIZ BLOCKS
 *****************/

Blockly.Blocks['create_folder'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Create folder')
        .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(200);
    this.setTooltip('Create data and output folders for data visualisation');
  }
};
pythonGenerator.forBlock['create_folder'] = function(block) {
  const folder = block.getFieldValue('FOLDER') || 'data';
  return '' +
    `if not os.path.exists('${folder}'):\n` +
        `\tos.mkdir('${folder}')\n`;
};

Blockly.Blocks['func_download'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Download (from URL)')
        .appendField(new Blockly.FieldTextInput('http://file.zip'), 'NAME')
        .appendField('into folder')
        .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER');
    this.setTooltip('Use function to download file from URL into given file.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
}
pythonGenerator.forBlock['func_download'] = function(block) {
  const url = block.getFieldValue('NAME') || 'http://file.zip';
  const folder = block.getFieldValue('FOLDER') || 'data';
  return `download('${url}', '${folder}')\n`
}

Blockly.Blocks['read_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Read file')
        .appendField(new Blockly.FieldTextInput('file.zip'), 'NAME')
        .appendField('from folder')
        .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER');
    this.setTooltip('Use function to read file with given folder name.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
};
pythonGenerator.forBlock['read_file'] = function(block) {
  const fileName = block.getFieldValue('NAME');
  const dataFolder = block.getFieldValue('FOLDER') || 'data';
  return `gpd.read_file(os.path.join('${dataFolder}', '${fileName}'))\n`
}

Blockly.Blocks['write_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create GeoPackage')
        .appendField(new Blockly.FieldTextInput('file_name'), 'NAME');
    this.appendDummyInput()
        .appendField('In folder')
        .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER')
        .appendField('.gpkg')
    this.appendValueInput('RES')
        .appendField('With data');
    this.setTooltip('Write to given output folder. The format of this file is GeoPackage (.gpkg). A variable is expected as input.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200);
  }
}
pythonGenerator.forBlock['write_file'] = function(block, generator) {
  const fileName = block.getFieldValue('NAME');
  const res = generator.valueToCode(block, 'RES', pythonGenerator.ORDER_ATOMIC);
  return '\n' + 
  `${res}.to_file(driver='GPKG', filename=os.path.join(output_folder, '${fileName}.gpkg'))\n`
}

Blockly.Blocks['chdir'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Change current directory to')
        .appendField(new Blockly.FieldTextInput('path'), 'PATH');
    this.setTooltip('Change directory to given path');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200); 
  }
}
pythonGenerator.forBlock['chdir'] = function(block) {
  const path = block.getFieldValue('PATH');
  return `\nos.chdir('${path}')`;
}

Blockly.Blocks['sampleData'] = {
  init: function() {
    this.appendValueInput('FOLDER')
        .setCheck('String')
        .appendField('Download sample data into folder')
        .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER');
    this.setTooltip('Download sample data from the internet into given folder');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(200); 
  }
}
pythonGenerator.forBlock['sampleData'] = function(block, generator) {
  const folder = generator.valueToCode(block, 'FOLDER', pythonGenerator.ORDER_ATOMIC) || 'data';
  return `files = [
  '2020-01-metropolitan-street.csv',
  '2020-02-metropolitan-street.csv',
  '2020-03-metropolitan-street.csv',
  '2020-04-metropolitan-street.csv',
  '2020-05-metropolitan-street.csv',
  '2020-06-metropolitan-street.csv',
  '2020-07-metropolitan-street.csv',
  '2020-08-metropolitan-street.csv',
  '2020-09-metropolitan-street.csv',
  '2020-10-metropolitan-street.csv',
  '2020-11-metropolitan-street.csv',
  '2020-12-metropolitan-street.csv'
]

data_url = 'https://github.com/spatialthoughts/python-dataviz-web/releases/' \
  'download/police.uk/'

for f in files:
  url = os.path.join(data_url + f)
  download(url, '${folder}')\n`;
}

Blockly.Blocks['listdir'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('List all directories in path')
        .appendField(new Blockly.FieldTextInput('name'), 'PATH');
    this.setTooltip('List directory of given path');
    this.setOutput(true);
    this.setColour(200); 
  }
}
pythonGenerator.forBlock['listdir'] = function(block) {
  const path = block.getFieldValue('PATH') || '';
  return [`os.listdir(${path ? '"' + path + '"' : ''})`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['type'] = {
  init: function() {
    this.appendValueInput('TYPE')
        .appendField('check type of');
    this.setTooltip('Find the type of another block');
    this.setOutput(true);
    this.setColour(200);
  }
}
pythonGenerator.forBlock['type'] = function(block, generator) {
  const type = generator.valueToCode(block, 'TYPE', pythonGenerator.ORDER_ATOMIC);
  return [`type(${type})`, pythonGenerator.ORDER_ATOMIC];
}

/** Show data **/
Blockly.Blocks['plot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot line');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendDummyInput('fmt')
        .appendField('format')
        .appendField(new Blockly.FieldTextInput('^k:'), 'FMT')
    this.appendValueInput('title')
        .appendField('Title');
    this.appendDummyInput('size')
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber(''), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber(''), 'YVAL');
    this.appendValueInput('XLabel')
        .appendField('X-axis label');
    this.appendValueInput('YLabel')
        .appendField('Y-axis label');
    this.appendValueInput('Legend')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a line with X and Y data');
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html#matplotlib.pyplot.plot');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['plot'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "0";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "0";
  const format = block.getFieldValue('FMT');
  const title = generator.valueToCode(block, 'title', pythonGenerator.ORDER_NONE) || "0";
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [generator.valueToCode(block, 'XLabel', pythonGenerator.ORDER_NONE) || "0", generator.valueToCode(block, 'YLabel', pythonGenerator.ORDER_NONE) || "0"];
  const legend = generator.valueToCode(block, 'Legend', pythonGenerator.ORDER_NONE) || "0";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.plot(x, y, '${format}')\n` + 
  `plt.title(${title})\n` +
  `plt.xlabel(${labels[0]})\n` + 
  `plt.ylabel(${labels[1]})\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n`
}

/** Show scattered data */
Blockly.Blocks['scatter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot scatter graph');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('red'), 'COL')
    this.appendValueInput('title')
        .appendField('Title');
    this.appendDummyInput('size')
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber(''), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber(''), 'YVAL');
    this.appendValueInput('XLabel')
        .appendField('X-axis label');
    this.appendValueInput('YLabel')
        .appendField('Y-axis label');
    this.appendValueInput('Legend')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.scatter.html#matplotlib.axes.Axes.scatter');
    this.setTooltip('Plot a graph with X and Y data');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['scatter'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "0";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "0";
  const title = generator.valueToCode(block, 'title', pythonGenerator.ORDER_NONE) || "0";
  const col = block.getFieldValue('COL');
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [generator.valueToCode(block, 'XLabel', pythonGenerator.ORDER_NONE) || "0", generator.valueToCode(block, 'YLabel', pythonGenerator.ORDER_NONE) || "0"];
  const legend = generator.valueToCode(block, 'Legend', pythonGenerator.ORDER_NONE) || "0";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.scatter(x, y, color = '${col}')\n` + 
  `plt.title(${title})\n` +
  `plt.xlabel(${labels[0]})\n` + 
  `plt.ylabel(${labels[1]})\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n` +
  `plt.show()\n`
}

//**reshape an array */
Blockly.Blocks['reshape'] = {
  init: function() {
    this.appendValueInput('NAME')
    .setCheck('Array')
      .appendField(new Blockly.FieldLabelSerializable('reshape array:'), 'DATA');
    this.appendValueInput('rows')
    .setCheck('Number')
      .appendField(new Blockly.FieldLabelSerializable('new size:'), 'SIZE');
    this.appendValueInput('columns')
    .setCheck('Number');
    this.setInputsInline(true)
    this.setOutput(true, null);
    this.setTooltip('Reshape an array');
    this.setHelpUrl('https://www.w3schools.com/python/numpy/numpy_array_reshape.asp');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['reshape'] = function(block, generator) {
  const value_array = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_COLLECTION);
  const value_rows = generator.valueToCode(block, 'rows', pythonGenerator.ORDER_ATOMIC);
  const value_columns = generator.valueToCode(block, 'columns', pythonGenerator.ORDER_ATOMIC);
  return [`np.reshape(${value_array}, (${value_rows},${value_columns}))`, pythonGenerator.ORDER_ATOMIC];
};

//**load from txt */
Blockly.Blocks['load_txt'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from txt:')
        .appendField(new Blockly.FieldTextInput(''), 'txt')
        .appendField('.txt');
    this.setTooltip('Loads a given txt dataset');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_txt'] = function(block) {
  const dataset = block.getFieldValue('txt') || '0';
  return [`np.loadtxt('${dataset}.txt')`, pythonGenerator.ORDER_ATOMIC];
};

//**load from a json file */
Blockly.Blocks['load_json'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from json:')
        .appendField(new Blockly.FieldTextInput(''), 'json')
        .appendField('.json');
    this.setTooltip('Loads a given json file');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['load_json'] = function(block) {
  const dataset = block.getFieldValue('json') || '0';
  return [`pd.read_json('${dataset}.json')`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['arange'] = {
  init: function(){
    this.appendValueInput('start')
        .appendField('Generate values between');
    this.appendValueInput('stop')
        .appendField('and')
    this.appendValueInput('step')
        .appendField('with step');
    this.setTooltip('Generate a range of values between two numbers');
    this.setInputsInline(false);
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.arange.html');
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['arange'] = function(block, generator) {
  const start = generator.valueToCode(block, 'start', pythonGenerator.ORDER_ATOMIC);
  const stop = generator.valueToCode(block, 'stop', pythonGenerator.ORDER_ATOMIC);
  const step = generator.valueToCode(block, 'step', pythonGenerator.ORDER_ATOMIC);
  return [`np.arange(${start}, ${stop}, ${step})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['linspace'] = {
  init: function(){
    this.appendValueInput('number')
        .appendField('Generate');
    this.appendValueInput('start')
        .appendField('values between');
    this.appendValueInput('stop')
        .appendField('and');
    this.setTooltip('Generate a number of values between two numbers');
    this.setInputsInline(false);
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.linspace.html');
    this.setOutput(true, 'Array');
    this.setColour(200);
  },
};
pythonGenerator.forBlock['linspace'] = function(block, generator) {
  const start = generator.valueToCode(block, 'start', pythonGenerator.ORDER_ATOMIC);
  const stop = generator.valueToCode(block, 'stop', pythonGenerator.ORDER_ATOMIC);
  const number = generator.valueToCode(block, 'number', pythonGenerator.ORDER_ATOMIC);
  return [`np.linspace(${start}, ${stop}, num=${number})`, pythonGenerator.ORDER_ATOMIC];
};

//**indices in array */

/** 
 * Minimum indices of array of numbers
 */
Blockly.Blocks['ind_min'] = {
  init: function() {
    this.appendValueInput('minimum')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Indice of minimum of'), "IND_MINIMUM");
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the minimum of an array of numbers');
    this.setColour(150);
    this.setHelpUrl('https://numpy.org/doc/2.1/reference/generated/numpy.argmin.html');
  }
};
pythonGenerator.forBlock["ind_min"] = function(block, generator) {
  const ind_mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmin(${ind_mini})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum indices of array of numbers
 */
Blockly.Blocks['ind_max'] = { 
  init: function() {
    this.appendValueInput('maximum')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Indice of maximum of'), 'IND_MAXIMUM');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the maximum of an array of numbers');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argmax.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_max"] = function(block, generator) {
  const ind_maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmax(${ind_maxi})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Sorting indices of array of numbers
 */
Blockly.Blocks['ind_sort'] = { 
  init: function() {
    this.appendValueInput('sort')
        .setCheck('Array')
        .appendField(new Blockly.FieldLabelSerializable('Sorted array of indices of'), 'IND_SORT');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns an array of indices of an array of numbers according to their values');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argsort.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_sort"] = function(block, generator) {
  const ind_sort =
    generator.valueToCode(block, "sort", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argsort(${ind_sort})`, pythonGenerator.ORDER_COLLECTION];
};

/** 
 * Finding the indice of array of numbers
 */
Blockly.Blocks['ind_find'] = { 
  init: function() {
    this.appendValueInput('find')
        .setCheck('Boolean')
        .appendField(new Blockly.FieldLabelSerializable('Find indices'), 'IND_FIND');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns the found indices of an array of numbers, given a condition');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argwhere.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_find"] = function(block, generator) {
  const ind_find =
    generator.valueToCode(block, "find", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argwhere(${ind_find})`, pythonGenerator.ORDER_COLLECTION];
};

//**GEOMETRY BLOCKS*/
Blockly.Blocks['buffer'] = {
  init: function() {
    this.appendValueInput('center')
        .appendField(new Blockly.FieldLabelSerializable('Buffer: center coordinates'), 'CENTER');
    this.appendDummyInput('radius')
        .appendField(new Blockly.FieldLabelSerializable('Radius'), 'RADIUS')
        .appendField(new Blockly.FieldNumber(0), 'r');
    this.setOutput(true);
    this.setInputsInline(false);
    this.setTooltip('Create a circle with its center and its radius');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['buffer'] = function(block, generator) {
  const coordinates_circle = generator.valueToCode(block, 'center', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  const number_rad = block.getFieldValue('r') || '1';
  return [`Point${coordinates_circle}.buffer(${number_rad})`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['line_segment'] = {
  init: function() {
    this.itemCount_ = 0
    this.appendDummyInput()
        .appendField('Create line segment');
    this.appendValueInput('element_0')
        .appendField('Coordinates')
        .setCheck('Coords');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close')
        .appendField(appendFieldPlusIcon);
    this.setColour(150);
    this.setOutput(true);
    this.setTooltip('Creates a line segment with given coordinates');
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i).setCheck('Coords');

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}

pythonGenerator.forBlock['line_segment'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || 'None');
  }
  return [`LineString([${elements.join(', ')}])`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['create_point'] = { 
  init: function() {
    this.appendValueInput('point')
        .setCheck('Coords')
        .appendField('Create point with coordinates');
    this.setOutput(true)
    this.setTooltip('Returns a Point() object with given coordinates');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['create_point'] = function(block, generator) {
  const coordinates = generator.valueToCode(block, 'point', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  return [`Point${coordinates}`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['coords'] = { 
  init: function() {
    this.appendDummyInput()
        .appendField('(')
        .appendField(new Blockly.FieldNumber('0'), 'XCoord')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'YCoord')
        .appendField(')');
    this.setOutput(true, ['Coords']);
    this.setTooltip('Returns a pair of coordinates');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["coords"] = function(block) {
  const X_Coord = block.getFieldValue('XCoord') || '0';
  const Y_Coord = block.getFieldValue('YCoord') || '0';
  return [`(${X_Coord}, ${Y_Coord})`, pythonGenerator.ORDER_ATOMIC]
};

//**Polygon area */
Blockly.Blocks['polygon_area'] = {
  init: function() {
    this.appendValueInput('polygon')
        .setCheck('Polygon')
        .appendField(new Blockly.FieldLabelSerializable('Polygon area'), 'NAME');
    this.setOutput(true, 'Number');
    this.setTooltip('Compute the polygon area');
    this.setHelpUrl('');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['polygon_area'] = function(block, generator) {
  const polygon = generator.valueToCode(block, 'polygon', pythonGenerator.ORDER_ATOMIC);
  return `${polygon}.area`;
}

//**Polygon perimeter */
Blockly.Blocks['polygon_perimeter'] = {
  init: function() {
    this.appendValueInput('polygon')
    .setCheck('Polygon')
      .appendField(new Blockly.FieldLabelSerializable('Polygon perimeter'), 'NAME');
    this.setOutput(true, 'Number');
    this.setTooltip('Compute the polygon perimeter');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.length.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['polygon_perimeter'] = function(block, generator) {
  const polygon = generator.valueToCode(block, 'polygon', pythonGenerator.ORDER_ATOMIC);
  return `${polygon}.length`;
}

Blockly.Blocks['distance_calc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance');
    this.appendValueInput('point1')
        .appendField('Point 1')
        .setCheck(['Coords']);
    this.appendValueInput('point2')
        .appendField('Point 2')
        .setCheck(['Coords']);
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance between points and polygons');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.distance.html');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_calc'] = function(block, generator) {
  const coord1 = generator.valueToCode(block, 'point1', pythonGenerator.ORDER_ATOMIC);
  const coord2 = generator.valueToCode(block, 'point2', pythonGenerator.ORDER_ATOMIC);
  return [`Point${coord1}.distance(Point${coord2})`, pythonGenerator.ORDER_ATOMIC];
}

//**Multipolygon */
Blockly.Blocks['multipolygon'] = {
  init: function() {
    this.appendValueInput('polygon1')
    .setCheck('Polygon')
      .appendField(new Blockly.FieldLabelSerializable('Polygon1'), 'Polygon1');
    this.appendValueInput('polygon2')
    .setCheck('Polygon')
      .appendField(new Blockly.FieldLabelSerializable('Polygon2'), 'Polygon2');
    this.appendDummyInput('')
      .appendField(new Blockly.FieldLabelSerializable('Show multipolygon?'), 'show')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'SHOW');
    this.appendDummyInput('')
      .appendField(new Blockly.FieldTextInput('multipolygon'), 'variable');
    this.setOutput(true, 'Polygon');
    this.setTooltip('Create a multipolygon from a sequel of polygons');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.MultiPolygon.html');
    this.setColour(150);
  }
};
  
pythonGenerator.forBlock['multipolygon'] = function(block, generator) {
  const value_polygon1 = generator.valueToCode(block, 'polygon1', pythonGenerator.ORDER_ATOMIC);
  const value_polygon2 = generator.valueToCode(block, 'polygon2', pythonGenerator.ORDER_ATOMIC);
  const text_variable = block.getFieldValue('variable');
  let show_polygon = block.getFieldValue('SHOW');
  show_polygon = (show_polygon.toLowerCase() === 'true') ? `\n${text_variable}\n` : '\n'
  return [`from shapely.geometry import Polygon, MultiPolygon\n`+
          `${text_variable} = MultiPolygon([${value_polygon1}, ${value_polygon2}])\n`+
          `${show_polygon}`, pythonGenerator.ORDER_ATOMIC];
}

//**Bounding box */
const bounding_box = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Bounding box');
    this.appendDummyInput('minimum')
      .appendField(new Blockly.FieldLabelSerializable('min: x'), 'MIN')
      .appendField(new Blockly.FieldNumber(0), 'min_x')
      .appendField(', y')
      .appendField(new Blockly.FieldNumber(0), 'min_y');
    this.appendDummyInput('maximum')
      .appendField(new Blockly.FieldLabelSerializable('max: x'), 'MAX')
      .appendField(new Blockly.FieldNumber(0), 'max_x')
      .appendField(', y')
      .appendField(new Blockly.FieldNumber(0), 'max_y');
    this.setOutput(true, 'Polygon');
    this.setTooltip('Create a bounding box');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.box.html');
    this.setColour(150);
  }
};
Blockly.common.defineBlocks({bounding_box: bounding_box});             
pythonGenerator.forBlock['bounding_box'] = function(block) {
  const min_x = block.getFieldValue('min_x') || '0';
  const min_y = block.getFieldValue('min_y') || '0';
  const max_x = block.getFieldValue('max_x') || '0';
  const max_y = block.getFieldValue('max_y') || '0';
  return `from shapely.geometry import box\n`+
  `bbox = box(minx=${min_x}, miny=${min_y}, maxx=${max_x}, maxy=${max_y})`
}

//**Polygon block */
Blockly.Blocks['polygon'] = {
  init: function() {
    this.itemCount_ = 0
    this.appendDummyInput()
        .appendField('Create a polygon');
    this.appendValueInput('element_0')
        .appendField('Coordinates')
        .setCheck('Coords');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close')
        .appendField(appendFieldPlusIcon);
    this.setColour(150);
    this.setOutput(true, 'Polygon');
    this.setTooltip('Creates a polygon with given coordinates');
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i).setCheck('Coords');

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}

pythonGenerator.forBlock['polygon'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || '(0, 0)');
  }
  return [`Polygon([${elements.join(', ')}])`, pythonGenerator.ORDER_ATOMIC];
};

// Computing centroid
Blockly.Blocks["centroid"] = {
  init: function(){
    this.appendValueInput('CTR')
    .appendField('centroid of')
    .setCheck('Polygon');
    this.setOutput(true);
    this.setColour(150);
    this.setTooltip('Returns the centroid of a geometry');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.centroid.html');
  },
};
pythonGenerator.forBlock["centroid"] = function(block, generator) {
  const centroide = generator.valueToCode(block, 'CTR', pythonGenerator.ORDER_NONE);
  return `${centroide}.centroid`;
};

//map
Blockly.Blocks['create_map'] = {
  init: function() {
    this.appendValueInput('center')
        .setCheck('Coords')
        .appendField('Create a map centered on');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/getting_started.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_map'] = function(block, generator) {
  const value_center = generator.valueToCode(block, 'center', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  return `import folium\nm = folium.Map(location=${value_center}, zoom_start=12)\n`;
}

Blockly.Blocks['create_marker'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Create marker');
    this.appendValueInput('position')
      .appendField(new Blockly.FieldLabelSerializable('Position'), 'NAME');
    this.appendDummyInput('popup')
      .appendField('Popup')
      .appendField(new Blockly.FieldTextInput('marker'), 'popup');
    this.appendDummyInput('color')
      .appendField('Icon color')
      .appendField(new Blockly.FieldTextInput('green'), 'icon');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/getting_started.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_marker'] = function(block, generator) {
  const value_position = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const text_popup = block.getFieldValue('popup');
  const text_icon = block.getFieldValue('icon');
  return `folium.Marker(
    location=${value_position},
    popup=${text_popup},
    icon=${text_icon},
).add_to(m)\n`;
}

Blockly.Blocks['create_polygon'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Create polygon on map');
    this.appendValueInput('position')
      .appendField(new Blockly.FieldLabelSerializable('Position of polygon'), 'NAME');
    this.appendDummyInput('popup')
      .appendField('Popup')
      .appendField(new Blockly.FieldTextInput('polygon'), 'popup');
    this.appendDummyInput('color')
      .appendField('color')
      .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput('fill_color')
      .appendField('fill_color')
      .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://https://python-visualization.github.io/folium/latest/user_guide/vector_layers/polygon.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_polygon'] = function(block, generator) {
  const polygon_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const text_popup = block.getFieldValue('popup');
  const color = block.getFieldValue('color');
  const fill_color = block.getFieldValue('fill_color');
  return `folium.Polygon(
    locations=${polygon_shown},
    popup=${text_popup},
    color=${color},
    fill_color=${fill_color},
).add_to(m)\n`;
}

Blockly.Blocks['create_polyline'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Create polyline on map');
    this.appendValueInput('position')
      .appendField(new Blockly.FieldLabelSerializable('Position of polyline'), 'NAME');
    this.appendDummyInput('weight')
      .appendField(new Blockly.FieldLabelSerializable('Weight'), 'WEIGHT')
      .appendField(new Blockly.FieldNumber(1), 'weight');
    this.appendDummyInput('tooltip')
      .appendField('Tooltip')
      .appendField(new Blockly.FieldTextInput('polyline'), 'tooltip');
    this.appendDummyInput('color')
      .appendField('color')
      .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/polyline.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_polyline'] = function(block, generator) {
  const polyline_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const weight = block.getFieldValue('weight') || '1';
  const text_tooltip = block.getFieldValue('tooltip');
  const color = block.getFieldValue('color');
  return `folium.PolyLine(
    locations=${polyline_shown},
    color=${color},
    weight=${weight},
    tooltip=${text_tooltip}   
).add_to(m)\n`;
}

Blockly.Blocks['create_rectangle'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Create rectangle on map');
    this.appendValueInput('position')
      .appendField(new Blockly.FieldLabelSerializable('Opposite corners of rectangle'), 'NAME');
    this.appendDummyInput('weight')
      .appendField(new Blockly.FieldLabelSerializable('Weight'), 'WEIGHT')
      .appendField(new Blockly.FieldNumber(1), 'weight');
    this.appendDummyInput('popup')
      .appendField('Popup')
      .appendField(new Blockly.FieldTextInput('rectangle'), 'popup');
    this.appendDummyInput('color')
      .appendField('color')
      .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput('fill_color')
      .appendField('fill_color')
      .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://https://python-https://python-visualization.github.io/folium/latest/user_guide/vector_layers/rectangle.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_rectangle'] = function(block, generator) {
  const rect_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const weight = block.getFieldValue('weight') || '1';
  const text_popup = block.getFieldValue('popup');
  const color = block.getFieldValue('color');
  const fill_color = block.getFieldValue('fill_color');
  return `folium.Rectangle(
    bounds=${rect_shown},
    weight=${weight}
    color=${color},
    fill_color=${fill_color},
    popup=${text_popup}
).add_to(m)\n`;
}

Blockly.Blocks['create_circle'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Create circle on map');
    this.appendValueInput('position')
      .appendField(new Blockly.FieldLabelSerializable('Position of circle'), 'NAME');
    this.appendDummyInput('radius')
      .appendField(new Blockly.FieldLabelSerializable('Radius'), 'RADIUS')
      .appendField(new Blockly.FieldNumber(1), 'radius');
    this.appendDummyInput('popup')
      .appendField('Popup')
      .appendField(new Blockly.FieldTextInput('circle'), 'popup');
    this.appendDummyInput('color')
      .appendField('color')
      .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput('fill_color')
      .appendField('fill_color')
      .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/circle_and_circle_marker.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['create_circle'] = function(block, generator) {
  const polygon_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const radius = block.getFieldValue('radius') || '1';
  const text_popup = block.getFieldValue('popup');
  const color = block.getFieldValue('color');
  const fill_color = block.getFieldValue('fill_color');
  return `folium.Circle(
    locations=${polygon_shown},
    radius=${radius}
    popup=${text_popup},
    color=${color},
    fill_color=${fill_color},
).add_to(m)\n`;
}

Blockly.Blocks['JSON_on_map'] = {
  init: function() {
    this.appendValueInput('json')
      .appendField('Add json on map');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('It\'s necessary to connect a JSON file');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/getting_started.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['JSON_on_map'] = function(block, generator) {
  const value_json = generator.valueToCode(block, 'json', pythonGenerator.ORDER_ATOMIC);
  return `\nimport requests\n
          geojson_data = requests.get(${value_json}).json()\n
          folium.GeoJson(geojson_data).add_to(m)\n`;
}

Blockly.Blocks['Choropleth_map'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('Make a choropleth map');
    this.appendValueInput('data')
        .appendField('with data');
    this.appendValueInput('columns_shown')
        .appendField('of column');
    this.appendDummyInput('fill_color')
        .appendField('fill_color')
        .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.appendValueInput('bins')
        .appendField('list of bins');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/geojson/choropleth.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['Choropleth_map'] = function(block, generator) {
  const value_data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_ATOMIC);
  const columns_shown = generator.valueToCode(block, 'columns_shown', pythonGenerator.ORDER_ATOMIC);
  const fill_color = block.getFieldValue('fill_color');
  const value_bins = generator.valueToCode(block, 'bins', pythonGenerator.ORDER_ATOMIC);
  return `folium.Choropleth(
    data=${value_data},
    columns=${columns_shown}
    bins=${value_bins},
    fill_color=${fill_color}
).add_to(m)\n`;
}

Blockly.Blocks['pie_chart'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Pie chart');
    this.appendValueInput('sizes')
        .appendField('Sizes');
    this.appendValueInput('labels')
        .appendField('Labels');
    this.appendValueInput('title')
        .appendField('Title');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a pie chart');
    this.setHelpUrl('https://matplotlib.org/stable/gallery/pie_and_polar_charts/pie_features.html');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['pie_chart'] = function(block, generator) {
  const sizes = generator.valueToCode(block, 'sizes', pythonGenerator.ORDER_NONE) || "0";
  const labels = generator.valueToCode(block, 'labels', pythonGenerator.ORDER_NONE) || "";
  const title = generator.valueToCode(block, 'title', pythonGenerator.ORDER_NONE) || "";
  return '' +
  `sizes = ${sizes}\n` +
  `labels = ${labels}\n` +
  `fig, ax = plt.subplots()\n` +
  `ax.pie(sizes, labels=labels, autopct='%1.1f%%')\n` + 
  `ax.set.title(${title})\n`
}

Blockly.Blocks['bar_chart'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Bar chart');
    this.appendValueInput('sizes')
        .appendField('Sizes');
    this.appendValueInput('label_bar')
        .appendField('Labels');
    this.appendValueInput('title')
        .appendField('Title');
    this.appendValueInput('XLabel')
        .appendField('X-axis label');
    this.appendValueInput('YLabel')
        .appendField('Y-axis label');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a bar chart');
    this.setHelpUrl('https://matplotlib.org/stable/gallery/pie_and_polar_charts/pie_features.html');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['bar_chart'] = function(block, generator) {
  const sizes = generator.valueToCode(block, 'sizes', pythonGenerator.ORDER_NONE) || "0";
  const label_bar = generator.valueToCode(block, 'label_bar', pythonGenerator.ORDER_NONE) || "";
  const labels = [generator.valueToCode(block, 'XLabel', pythonGenerator.ORDER_NONE) || "0", generator.valueToCode(block, 'YLabel', pythonGenerator.ORDER_NONE) || "0"];
  const title = generator.valueToCode(block, 'title', pythonGenerator.ORDER_NONE) || "";
  return '' +
  `sizes = ${sizes}\n` +
  `labels = ${label_bar}\n` +
  `plt.bar(labels,sizes)\n` +
  `plt.title(${title})\n` +
  `plt.xlabel(${labels[0]})\n` + 
  `plt.ylabel(${labels[1]})\n` +
  `plt.show()`
}

//Distance Vincenty
Blockly.Blocks['distance_vinc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Vincenty’s distance');
    this.appendValueInput('point1')
        .appendField('Point 1')
        .setCheck(['Coords']);
    this.appendValueInput('point2')
        .appendField('Point 2')
        .setCheck(['Coords']);
    this.setOutput(true, 'Number');
    this.setTooltip('Find the Vincenty distance');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_vinc'] = function(block, generator) {
  const coord1 = generator.valueToCode(block, 'point1', pythonGenerator.ORDER_ATOMIC);
  const coord2 = generator.valueToCode(block, 'point2', pythonGenerator.ORDER_ATOMIC);
  return [`from geopy.distance import geodesic\n`+
          `geodesic(${coord1}, ${coord2}).meters`, pythonGenerator.ORDER_ATOMIC];
}

//Distance on a sphere
Blockly.Blocks['distance_sph'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance on a sphere');
    this.appendDummyInput()
        .appendField('Point 1: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1')
        .appendField(')');
    this.appendDummyInput()
        .appendField('Point 2: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2')
        .appendField(')');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance on a sphere with lat and lon');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_sph'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`R = 6371e3\n`+
    `phi1 = np.radians(${lat1})\n`+
    `phi2 = np.radians(${lat2})\n`+
    `delta_lambda = np.radians(${lon2} - ${lon1})\n`+
    `np.acos(np.sin(phi1) * np.sin(phi2) + np.cos(phi1) * np.cos(phi2) * np.cos(delta_lambda)) * R`, pythonGenerator.ORDER_ATOMIC];
}

//Distance with rectangular approximation
Blockly.Blocks['distance_rect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance with rectangular approximation');
    this.appendDummyInput()
        .appendField('Point 1: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1')
        .appendField(')');
    this.appendDummyInput()
        .appendField('Point 2: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2')
        .appendField(')');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance with rectangular approximation with lat and lon');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_rect'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`R = 6371e3\n`+
    `x = np.radians(${lon2} - ${lon1}) * np.cos(np.radians((${lat1} + ${lat2}) / 2))\n`+
    `y = np.radians(${lat2} - ${lat1})\n`+
    `R * np.sqrt(x*x + y*y)`, pythonGenerator.ORDER_ATOMIC];
}


Blockly.Blocks['distance_manhattan'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Manhattan distance');
    this.appendDummyInput()
        .appendField('Point 1: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1')
        .appendField(')');
    this.appendDummyInput()
        .appendField('Point 2: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2')
        .appendField(')');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the manhattan distance with lat and lon');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_manhattan'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`lat_dist = abs(${lat2} - ${lat1}) * 111320\n`+
    `lon_dist = abs(${lon2} - ${lon1}) * 40075000 * np.cos(np.radians((${lat2} + ${lat1}) / 2)) / 360\n`+
    `lat_dist + lon_dist`, pythonGenerator.ORDER_ATOMIC];
}


//Distance haversine
Blockly.Blocks['distance_haversine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance haversine');
    this.appendDummyInput()
        .appendField('Point 1: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1')
        .appendField(')');
    this.appendDummyInput()
        .appendField('Point 2: (')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2')
        .appendField(')');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance haversine with lat and lon');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_haversine'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`R = 6371e3\n`+
    `phi1 = np.radians(${lat1})\n`+
    `phi2 = np.radians(${lat2})\n`+
    `delta_lambda = np.radians(${lon2} - ${lon1})\n`+
    `delta_phi = np.radians(${lat2} - ${lat1})\n`+
    `a = np.sin(delta_phi / 2) ** 2 + np.cos(phi1) * np.cos(phi2) * np.sin(delta_lambda / 2) ** 2\n`+
    `c = 2 * np.atan2(np.sqrt(a), np.sqrt(1 - a))\n`+
    `R * c`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['while_loop'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("while");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210); // You can change the color
    this.setTooltip("Repeat while the condition is true");
    this.setHelpUrl("");
  }
};
pythonGenerator.forBlock['while_loop'] = function(block, generator) {
  const condition = generator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  const statements = generator.statementToCode(block, 'DO');
  return `while ${condition}:\n${statements}`;
};


// Plotly Scatter Mapbox Block
// Plotly Scatter Mapbox Block with fig.show()
Blockly.Blocks['plotly_scatter_mapbox'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create and Show Scatter Mapbox");
    this.appendValueInput("DATAFRAME")
        .setCheck(null)
        .appendField("DataFrame");
    this.appendDummyInput()
        .appendField("Latitude column")
        .appendField(new Blockly.FieldTextInput("lat"), "LAT_COL");
    this.appendDummyInput()
        .appendField("Longitude column")
        .appendField(new Blockly.FieldTextInput("lon"), "LON_COL");
    this.appendDummyInput()
        .appendField("Hover column")
        .appendField(new Blockly.FieldTextInput("name"), "HOVER_COL");
    this.appendDummyInput()
        .appendField("Map style")
        .appendField(new Blockly.FieldDropdown([
          ["carto-positron", "carto-positron"],
          ["open-street-map", "open-street-map"],
          ["stamen-terrain", "stamen-terrain"]
        ]), "STYLE");
    this.appendDummyInput()
        .appendField("Zoom")
        .appendField(new Blockly.FieldNumber(1, 0, 20), "ZOOM");
    this.appendDummyInput()
        .appendField("Center Lat")
        .appendField(new Blockly.FieldNumber(0), "CENTER_LAT")
        .appendField("Lon")
        .appendField(new Blockly.FieldNumber(0), "CENTER_LON");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("Creates and shows a Plotly scatter mapbox plot.");
    this.setHelpUrl("");
  }
};

pythonGenerator.forBlock['plotly_scatter_mapbox'] = function(block, generator) {
  const df = generator.valueToCode(block, 'DATAFRAME', pythonGenerator.ORDER_NONE) || 'gdf';
  const lat = block.getFieldValue('LAT_COL');
  const lon = block.getFieldValue('LON_COL');
  const hover = block.getFieldValue('HOVER_COL');
  const style = block.getFieldValue('STYLE');
  const zoom = block.getFieldValue('ZOOM');
  const centerLat = block.getFieldValue('CENTER_LAT');
  const centerLon = block.getFieldValue('CENTER_LON');

  const code =
`fig = px.scatter_mapbox(
  ${df},
  lat="${lat}",
  lon="${lon}",
  hover_name="${hover}",
  mapbox_style="${style}",
  center={"lat": ${centerLat}, "lon": ${centerLon}},
  zoom=${zoom}
)\nfig.show()\n`;
  return code;
};


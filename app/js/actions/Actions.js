
var AppDispatcher = require('js/dispatcher/AppDispatcher');
var Constants   = require('js/misc/Constants');

var Actions = {

  addVariable: function(varName, varCode) {
    AppDispatcher.dispatch({
      actionType: Constants.EL_ADD_VARIABLE,
      varName:    varName,
      varCode:    varCode
    });
  },

  addLiteral: function(literal) {
    AppDispatcher.dispatch({
      actionType: Constants.EL_ADD_LITERAL,
      literal:    literal
    });
  },

  addOperand: function(operand) {
    AppDispatcher.dispatch({
      actionType: Constants.EL_ADD_OPERAND,
      literal:    operand
    });
  },

  submit: function() {
    AppDispatcher.dispatch({
      actionType: Constants.EL_SUBMIT_EXPRESSION
    });
  },

  updateExpression: function(expression) {
    AppDispatcher.dispatch({
      actionType: Constants.EL_UPDATE_EXPRESSION,
      expression: expression
    });
  }
};

module.exports = Actions;

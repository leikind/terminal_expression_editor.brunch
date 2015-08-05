
var AppDispatcher = require('js/dispatcher/AppDispatcher');
var EventEmitter  = require('js/lib/events'); //.EventEmitter;
var Constants   = require('js/misc/Constants');
var assign        = require('js/lib/object_assign');
var keyMirror     = require('js/lib/keymirror');
var Helpers       = require('js/misc/Helpers');

var Data  = require('js/misc/TerminalLanguageData');

var CHANGE_EVENT = 'CHANGE';

// starting -> firstTermAdded -> operandAdded -> secondTermAdded -> starting

var STATES = keyMirror({
  'starting':         null,
  'firstTermAdded':   null,
  'operandAdded':     null,
  'secondTermAdded':  null
});

var state = {};

var reset = function(){
  state.expression   =  "";
  state.expressionWithCodes  =  "";
  state.fsm          = STATES.starting;
  state.manual       = false;
  state.valid        = true;
  state.errorMessage = null;
};

reset();

var validateExpression = function(){
  var validityResponse = Helpers.validateParentheses(state.expression);

  state.valid        = validityResponse.valid;
  state.errorMessage = validityResponse.errorMessage;
};

var updateExpression = function(expr){
  state.expression = expr;
  validateExpression();

  var exprWithCodes = "";

  if (state.valid && state.expression != ""){

    var replacedResponse = Helpers.expressionWithVarsToExpressionWithCodes(Data.flattenedVariables, state.expression);
    if (replacedResponse.errorMessage){
      state.valid = false;
      state.errorMessage = replacedResponse.errorMessage;
    }else{
      exprWithCodes = "( " + replacedResponse.replaced + " )";
    }
  }
  state.expressionWithCodes = exprWithCodes;
};


processNewVariableOrLiteral = function (prefix, term){

  var addedExpr = prefix + term;

  if (state.fsm === STATES.operandAdded){
    state.fsm = STATES.secondTermAdded;
    addedExpr = addedExpr + " )";
  }

  if (state.fsm === STATES.starting){
    state.fsm = STATES.firstTermAdded;
    addedExpr = "(" + addedExpr;
  }

  updateExpression(state.expression + addedExpr);
};


processNewOperand = function (term){

  var addedExpr = " " + term;

  if (state.fsm === STATES.secondTermAdded){
    state.fsm   = STATES.starting;
    addedExpr = addedExpr + " ";
  }

  if (state.fsm == STATES.firstTermAdded){
    state.fsm = STATES.operandAdded;
  }

  updateExpression(state.expression + addedExpr);
};

var Store = assign({}, EventEmitter.prototype, {

  state:  state,

  showVariables: function() {
    return (state.manual || state.fsm == STATES.starting || state.fsm == STATES.operandAdded);
  },

  showOperands: function() {
    return (state.manual || state.fsm == STATES.firstTermAdded || state.fsm == STATES.secondTermAdded);
  },

  showLogicalOperands: function() {
    return (! state.manual && state.fsm == STATES.secondTermAdded);
  },

  ////

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case Constants.EL_ADD_VARIABLE:

      processNewVariableOrLiteral(" $", action.varName);

      Store.emitChange();
      break;

    case Constants.EL_ADD_LITERAL:

      processNewVariableOrLiteral(" ", action.literal);

      Store.emitChange();
      break;

    case Constants.EL_ADD_OPERAND:

      processNewOperand(action.literal);

      Store.emitChange();
      break;

    case Constants.EL_SUBMIT_EXPRESSION:

      reset();

      Store.emitChange();
      break;


    case Constants.EL_UPDATE_EXPRESSION:

      updateExpression(action.expression);
      state.manual = true;

      Store.emitChange();
      break;


    default:
      // no op
  }
});

module.exports = Store;

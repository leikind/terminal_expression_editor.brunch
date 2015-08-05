var React = require('js/lib/react');

var VariablePicker = require('js/components/VariablePicker.react');
var OperandPicker  = require('js/components/OperandPicker.react');

var Store   = require('js/stores/Store');
var Actions = require('js/actions/Actions');

function getState() {
  return {
    expression:          Store.state.expression,
    expressionIsValid:   Store.state.valid,
    errorMessage:        Store.state.errorMessage,
    expressionWithCodes: Store.state.expressionWithCodes,

    showVariables:       Store.showVariables(),
    showOperands:        Store.showOperands(),
    showLogicalOperands: Store.showLogicalOperands()
  };
}

var ExpressionLanguageEditor = React.createClass({displayName: "ExpressionLanguageEditor",

  handleSubmit: function() {
    Actions.submit();
    Materialize.toast('Submitted :-)', 4000);
  },

  getInitialState: function() {
    return getState();
  },

  _onChange: function() {
    this.setState(getState());
  },


  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  handleChange: function(event) {
    Actions.updateExpression(event.target.value)
  },

  render: function() {

    var expr = this.state.expression;

    var validityClassName = null;
    var errorMessage = this.state.errorMessage;

    if (! this.state.expressionIsValid){
      validityClassName = "invalid";
    }

    var submitButton = null;
    if (this.state.expressionIsValid && ! (expr === "")){
      submitButton = <button className="btn waves-effect waves-light blue lighten-1" type="submit" name="action" onClick={this.handleSubmit}>
        Submit
        <i className="material-icons right">send</i>
      </button>
    }

    var variablePicker = null;
    var opPicker = null;

    var exprWithCodes = this.state.expressionWithCodes;

    var variables = this.props.variables;

    if (this.state.showVariables){
      variablePicker = <VariablePicker variables={variables} />
    }

    if (this.state.showOperands){
      var ops = (this.state.showLogicalOperands) ? this.props.logicalOperations : this.props.operations;
      opPicker = <OperandPicker operations={ops} operationTooltips={this.props.operationTooltips} />
    }

    return (
      <div>
        <div className="card-panel">
          <div className="row">
            <div className="input-field col s12">
              <input id="final-expression" className={validityClassName} type="text" value={expr} placeholder="Expression with verbose variable names" onChange={this.handleChange} />
              <label htmlFor="final-expression" className="active" data-error={errorMessage}>Expression with verbose variable names</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="expression-with-names" type="text" value={exprWithCodes} placeholder="Final expression" readOnly="1" ></input>
              <label htmlFor="expression-with-names" className="active" >Final expression</label>
            </div>
          </div>
          <p>
            {submitButton}
          </p>
        </div>
        {variablePicker}
        {opPicker}
      </div>
    );
  }

});

module.exports = ExpressionLanguageEditor;


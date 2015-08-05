var React = require('js/lib/react');

var Actions = require('js/actions/Actions');

var ValuePicker = React.createClass({displayName: "ValuePicker",

  handleValueSubmit: function () {
    var input = $(React.findDOMNode(this.refs.numValue));

    Actions.addLiteral(input.val());

    input.val('');
  },

  handleChange: function(event) {
    this.setState({literal: event.target.value});
  },


  getInitialState: function() {
    return {
      literal:  ""
    };
  },


  isLiteralValid: function(){
    return (this.state.literal == "" || jQuery.isNumeric(this.state.literal));
  },

  render: function() {

    var literal = this.state.literal;

    var validityClassName = null;

    var button = null;


    if (this.isLiteralValid()){
      button = <button className="btn waves-effect waves-light blue lighten-1" type="submit" name="action" onClick={this.handleValueSubmit}>
        Add
        <i className="material-icons right">input</i>
      </button>

    }else{
      validityClassName = "invalid";
    }


    return (
      <div className="num-value-container">
        <div className="input-field">
          <input ref="numValue" id="num-value" type="text" className={validityClassName} value={literal} onChange={this.handleChange}></input>
          <label htmlFor="num-value" className="" >Numeric value</label>
        </div>
        {button}
      </div>
    );
  }
});

module.exports = ValuePicker;


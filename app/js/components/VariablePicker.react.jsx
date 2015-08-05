var React = require('js/lib/react');

var VariableGroup = require('js/components/VariableGroup.react');
var ValuePicker   = require('js/components/ValuePicker.react');

var VariablePicker = React.createClass({displayName: "VariablePicker",

  render: function() {

    var variableGroups = this.props.variables.map( function(variableGroup, index){

      var groupName       = variableGroup[0];
      var groupVariables  = variableGroup[1];

      return (
        <VariableGroup key={index} variables={groupVariables} name={groupName} idx={index} />
      );
    }, this);

    var component = this;
    return (
      <div className="card-panel">

        <ValuePicker></ValuePicker>

        {variableGroups}
      </div>
    );
  }
});

module.exports = VariablePicker;

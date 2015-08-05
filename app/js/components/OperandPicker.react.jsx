var React = require('js/lib/react');

var Actions = require('js/actions/Actions');

var OperandPicker = React.createClass({displayName: "OperandPicker",

  handleClick: function(idx, operationName) {
    Actions.addOperand(operationName);
  },

  componentDidMount: function() {
    var picker = React.findDOMNode(this.refs.operationPicker);

    $('.tooltipped', $(picker)).tooltip({
      delay: 50
    });

  },

  render: function() {

    var operations = this.props.operations.map( function(operationName, index){
      var key= "op" + index;

      var klassName = "waves-effect waves-light btn el-op blue-grey lighten-1";

      var dataPosition = null;
      var dataTooltip  = null;

      if (this.props.operationTooltips[operationName]){
        klassName += " tooltipped";
        dataPosition = 'top';
        dataTooltip  = this.props.operationTooltips[operationName];
      }

      return (
        <a key={key} onClick={this.handleClick.bind(this, index, operationName)}
          data-position={dataPosition} data-tooltip={dataTooltip}
          className={klassName}>{operationName}</a>
      );

    }, this);


    return (
      <div ref="operationPicker" className="card-panel">{operations}</div>
    );
  }

});

module.exports = OperandPicker;


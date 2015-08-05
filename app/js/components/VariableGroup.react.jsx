var React = require('js/lib/react');

var Actions = require('js/actions/Actions');

var VariableGroup = React.createClass({displayName: "VariableGroup",

  componentDidMount: function() {

    var triggerLink = React.findDOMNode(this.refs.trigger);
    $(triggerLink).dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      gutter: 0,
      belowOrigin: false
    });
  },

  handleClick: function(idx, varName, varCode) {
    Actions.addVariable(varName, varCode);
  },

  render: function() {

    var name      = this.props.name;
    var activates = 'dropdown' + this.props.idx;

    var variableOptions = this.props.variables.map( function(variableTuple, index){
      var varName = variableTuple[0];
      var varCode = variableTuple[1];
      var key = "a" + index

      return <li key={key}>
        <a href="#!" onClick={this.handleClick.bind(this, index, varName, varCode)} >{varName}</a>
      </li>

    }, this);

    return (
      <span ref="varPicker">
        <a className='dropdown-btn btn el-code' href='#' data-activates={activates} ref="trigger">{name}</a>
        <ul id={activates} className='dropdown-content'>
          {variableOptions}
        </ul>
      </span>
    );
  }

});

module.exports = VariableGroup;


var React = require('js/lib/react');
var Data  = require('js/misc/TerminalLanguageData');
var ExpressionLanguageEditor = require('js/components/ExpressionLanguageEditor.react');

var App = {
  init: function(){

    React.render(
      <ExpressionLanguageEditor
        variables={Data.variables}
        logicalOperations={Data.logicalOperations}
        operations={Data.operations}
        operationTooltips={Data.operationTooltips}/>,

      document.getElementById('expression-language-editor')
    );


  }
}

module.exports = App;

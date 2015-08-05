
var expressionWithVarsToExpressionWithCodes = function(flattenedVariables, expr) {
  var varsNotFound = [];
  var response     = {};

  response.replaced = expr.replace(/\$[\w_]+/g, function(varName) {

    if (flattenedVariables[varName]){
      return flattenedVariables[varName];
    }else{
      varsNotFound.push(varName);
      return(' !' + varName + '! ');
    }

  });

  if (varsNotFound.length == 1){
    response.errorMessage = "Variable " + varsNotFound[0] + " not found!";
  }else if(varsNotFound.length > 1){
    response.errorMessage = "Variables not found: " + varsNotFound.join(", ") + '!';
  }

  return response;
}

var validateParentheses = function(expr) {
  var response = {'valid': true, 'errorMessage': "Unbalanced parentheses"};

  var counter = 0;
  for (var i = 0, len = expr.length; i < len; i++) {
    switch (expr[i]){
      case "(" :
        counter ++;
        break
      case ")" :
        counter --;
        break
    }
    if (counter < 0){
      response.valid = false;
      response.errorMessage = "A closing parenthesis without an opening parenthesis on character " + (i+1);
      return response;
    }
  }

  if (counter != 0){
    response.valid = false;
  }

  return response;
}

module.exports = {
  expressionWithVarsToExpressionWithCodes:  expressionWithVarsToExpressionWithCodes,
  validateParentheses:                      validateParentheses
}

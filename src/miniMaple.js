class MiniMaple {
  differentiate(expression, variable) {
      const validExpressionPattern = /^([+-]?\d*(\*?[a-z](\^\d+)?)*)([+-]\d*(\*?[a-z](\^\d+)?)*)*$/;

      if (!expression.match(validExpressionPattern) || expression.includes('--') || expression.includes('++') || /[a-z]{2,}/.test(expression) || /\d[a-z]/.test(expression))
          throw new Error("Uncorrect expression");

      if (!variable.match(/^[a-z]$/))
          throw new Error("Uncorrect variable name");

      if (expression.length === 0)
        return '0';
      const terms = expression.match(/[+-]?[^+-]+/g);

      let result = "";
      terms.forEach(term => {
          let coeff = 1; 
          let vars = []; 
          let power = 1; 
          let containsVariable = false; 
          let termSign = 1; 

          if (term.startsWith('-')) {
              termSign = -1;
              term = term.slice(1);
          } else if (term.startsWith('+')) {
              term = term.slice(1);
          }

          const factors = term.split('*');
          factors.forEach(factor => {
              if (!isNaN(factor)) {
                  coeff *= parseFloat(factor);
              }
              else if (factor.includes('^')) {
                  const [varName, pow] = factor.split('^');
                  if (varName === variable) {
                      containsVariable = true;
                      power = parseInt(pow);
                  } else {
                      vars.push(factor);
                  }
              }
              else if (factor === variable) {
                  containsVariable = true;
                  power = 1;
              } else {
                  vars.push(factor);
              }
          });

          if (containsVariable) {
              coeff *= power;
              power--;
              let termResult = (termSign * coeff) + (vars.length > 0 ? '*' + vars.join('*') : '');
              if (power > 0) {
                  termResult += '*' + variable;
                  if (power > 1) {
                      termResult += '^' + power;
                  }
              }

              if (result.length > 0 && termSign === 1) {
                  result += '+' + termResult;
              } else {
                  result += termResult;
              }
          }
      });

      return result || '0';
  }
}


const mm = new MiniMaple();
// console.log(mm.differentiate('-x*y', 'x'));  // Вернет 5*z*y
// console.log(mm.differentiate('2*x^3+5*x+10', 'x'));  // Вернет 6*x^2+5
// console.log(mm.differentiate('5*x-2*x*y*z', 'x'));  // Вернет y*z
// console.log(mm.differentiate('4*x^2*y*z', 'x'));  // Вернет 8*x*y*z
// console.log(mm.differentiate('-x', 'x'));  // Вернёт -1 А возврашает 0
// console.log(mm.differentiate('x+x', 'x'));  // Вернёт 1 А возвращает 0
// console.log(mm.differentiate('z*x*y', 'x'));
// console.log(mm.differentiate('-x', 'x'));
// console.log(mm.differentiate("-2*y^5*x+12*x^2*r-3*y*x^3*z*h-7*y", "x"));
export { MiniMaple };
  
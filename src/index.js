import { MiniMaple} from "./miniMaple.js";
document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('differentiateButton').onclick = addSomething;
}

function addSomething() {
    const expression = document.querySelector('#expressionInput').value;
    const variable = document.querySelector('#variableInput').value;
    const container = document.querySelector('#container');
    container.innerHTML = ''; 
    const miniMaple = new MiniMaple();

    try {
        const result = miniMaple.differentiate(expression, variable);
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('generated');
        resultDiv.innerHTML = `Результат: ${result}`;
        container.appendChild(resultDiv);
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('generated', 'error');
        errorDiv.innerHTML = `Ошибка: ${error.message}`;
        container.appendChild(errorDiv);
    }
}
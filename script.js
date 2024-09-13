let resultOnScreen = '0';

window.onload = () => {
    output();
}

const output = () => {
    const outputScreen = document.querySelector('.screen');
    outputScreen.innerHTML = `${resultOnScreen || '0'}`;
}

const reset = () => {
    resultOnScreen = '0';
    output();
}

const remove = () => {
    if(resultOnScreen.length === 1 || resultOnScreen === 'ERROR') {
        resultOnScreen = '0';
    } else {
        resultOnScreen = resultOnScreen.substring(0, resultOnScreen.length - 1);
    }
    output();
}

const calculate = () => {
    try {
        // Replace 'x' with '*' for multiplication
        const expression = resultOnScreen.replace(/x/g, '*');
        const result = eval(expression);
        if (isFinite(result)) {
            resultOnScreen = result.toString();
        } else {
            throw new Error('Invalid operation');
        }
    } catch (error) {
        resultOnScreen = 'ERROR';
    }
    output();
}

const checkCondition = (btn) => {
    if (resultOnScreen === '0' && btn.innerHTML !== '.') {
        resultOnScreen = btn.innerHTML;
    } else {
        resultOnScreen += btn.innerHTML;
    }
    output();
}

const buttonFunctionality = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.innerHTML === 'RESET') {
                reset();
            } else if (btn.innerHTML === 'DEL') {
                remove();
            } else if (btn.innerHTML === '=') {
                calculate();
            } else if (resultOnScreen === '0' && (btn.innerHTML === '/' || btn.innerHTML === 'x' || btn.innerHTML === '+' || btn.innerHTML === '.')) {
                resultOnScreen += btn.innerHTML;
                output();
            } else {
                checkCondition(btn);
            }
        });
    });
}

buttonFunctionality();

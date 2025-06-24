let exp = "";
let resultShown = false;

const display = document.getElementById('display');
display.value = "0";

const root = document.getElementById('root');

// Render number buttons
function render() {
    for (let i = 0; i < 10; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.addEventListener("click", btnHandler);
        root.appendChild(btn);
    }
}

// Render operator buttons
const opr = ["+", "-", "*", "/"];
function operatorRender() {
    opr.forEach(item => {
        const btn = document.createElement("button");
        btn.innerText = item;
        btn.classList.add("opr");
        btn.addEventListener("click", oprHandler);
        root.appendChild(btn);
    });
}

// Number button handler
function btnHandler() {
    if (display.value === "0" || resultShown) {
        display.value = "";
        resultShown = false;
    }
    display.value += this.innerText;
}

// Operator button handler
function oprHandler() {
    if (resultShown) resultShown = false;

    if (display.value === "") return;

    exp += display.value;

    const lastChar = exp[exp.length - 1];
    if (["+", "-", "*", "/"].includes(lastChar)) {
        exp = exp.slice(0, -1);
    }

    exp += this.innerText;
    display.value = "";
}

// Equal button
const equal = document.createElement("button");
equal.textContent = "=";
equal.id = "equal";
equal.addEventListener("click", result);
root.appendChild(equal);

// Clear button
const clearBtn = document.createElement("button");
clearBtn.textContent = "C";
clearBtn.addEventListener("click", () => {
    display.value = "0";
    exp = "";
    resultShown = false;
});
root.appendChild(clearBtn);

// Result function
function result() {
    if (display.value === "" && exp === "") {
        display.value = "0";
        return;
    }

    exp += display.value;

    const lastChar = exp[exp.length - 1];
    if (["+", "-", "*", "/"].includes(lastChar)) {
        exp = exp.slice(0, -1);
    }

    try {
        const res = eval(exp);
        display.value = res;
        exp = "";
        resultShown = true;
    } catch {
        display.value = "Error";
        exp = "";
    }
}

// Keyboard support
document.addEventListener("keydown", function (e) {
    const key = e.key;

    if (!isNaN(key)) {
        if (display.value === "0" || resultShown) {
            display.value = "";
            resultShown = false;
        }
        display.value += key;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        if (display.value === "" && exp === "") return;
        oprHandlerKeyboard(key);
    }

    if (key === "Enter") {
        result();
    }

    if (key === "Backspace") {
        if (display.value.length > 1) {
            display.value = display.value.slice(0, -1);
        } else {
            display.value = "0";
        }
    }

    if (key.toLowerCase() === "c") {
        display.value = "0";
        exp = "";
        resultShown = false;
    }
});

// Separate handler for keyboard operator inputs
function oprHandlerKeyboard(op) {
    if (display.value === "") return;

    exp += display.value;

    const lastChar = exp[exp.length - 1];
    if (["+", "-", "*", "/"].includes(lastChar)) {
        exp = exp.slice(0, -1);
    }

    exp += op;
    display.value = "";
}

render();
operatorRender();
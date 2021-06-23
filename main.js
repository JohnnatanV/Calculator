class Calculator {
  constructor(screenHistory, screenMainOperation) {
    this.screenHistory = screenHistory;
    this.screenMainOperation = screenMainOperation;
    this.clear();
  }

  clear() {
    this.mainOperation = "";
    this.history = "";
    this.operation = undefined;
  }

  delete() {
    this.mainOperation = this.mainOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.mainOperation.includes(".")) return;
    this.mainOperation = this.mainOperation + number;
  }

  appendBracket() {
    this.mainOperation = `(${this.mainOperation})`;
  }

  chooseOperation(operation) {
    if (this.mainOperation === "") return;
    if (this.history !== "") {
      this.compute();
    }
    this.operation = operation;
    this.history = this.mainOperation;
    this.mainOperation = "";
  }

  compute() {
    // let computation;
    const prev = parseFloat(this.history);
    const current = parseFloat(this.mainOperation);
    if (isNaN(prev)) return;
    const operand = this.operation;

    const COMPUTE = {
      "+": () => prev + current,
      "-": () => prev - current,
      x: () => prev * current,
      "÷": () => prev / current,
      "%": () => prev / 100,
      Sin: () => Math.sin(prev),
      Cos: () => Math.cos(prev),
      Tan: () => Math.tan(prev),
      π: () => Math.PI * prev,
      "x!": (numero = prev) => {
        Math.abs(numero);
        let factorial = 1;
        for (let i = 1; i <= numero; i++) {
          factorial = factorial * i;
        }
        return factorial;
      },
      xy: () => prev ** current,
      x2: () => prev ** 2,
      x3: () => prev ** 3,
    };

    const computation = COMPUTE[operand] ? COMPUTE[operand]() : "";
    // switch (this.operation) {
    //   case "+":
    //     computation = prev + current;
    //     break;
    //   case "-":
    //     computation = prev - current;
    //     break;
    //   case "x":
    //     computation = prev * current;
    //     break;
    //   case "÷":
    //     computation = prev / current;
    //     break;
    //   default:
    //     return;
    // }
    this.mainOperation = computation;
    this.history = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let display;
    if (isNaN(integerDigits)) {
      display = "";
    } else {
      display = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${display}.${decimalDigits}`;
    } else {
      return display;
    }
  }

  updateScreen() {
    this.screenMainOperation.innerText = this.getDisplayNumber(
      this.mainOperation
    );
    if (this.operation != null) {
      this.screenHistory.innerText = `${this.getDisplayNumber(this.history)} ${
        this.operation
      }`;
    } else {
      this.screenHistory.innerText = "";
    }
  }
}

const btnNumber = document.querySelectorAll(".number");
const btnOperation = document.querySelectorAll(".operation");
const btnBrackets = document.querySelector(".brackets");
const btnEquals = document.querySelector(".equals");
const btnDelete = document.querySelector(".delete");
const btnAllClear = document.querySelector(".all-clear");
const screenHistory = document.querySelector(".screen-history");
const screenMainOperation = document.querySelector(".screen-main-operation");

const calculator = new Calculator(screenHistory, screenMainOperation);

btnNumber.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
  });
});

btnBrackets.addEventListener("click", () => {
  calculator.appendBracket();
  calculator.updateScreen();
});

btnOperation.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateScreen();
  });
});

btnEquals.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateScreen();
});

btnAllClear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateScreen();
});

btnDelete.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateScreen();
});

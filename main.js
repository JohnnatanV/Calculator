class Calculator {
  constructor(screenHistory, screenMainOperation) {
    this.screenHistory = screenHistory;
    this.screenMainOperation = screenMainOperation;
    this.clear();
  }

  clear = function () {
    this.mainOperation = "";
    this.history = "";
    this.operation = undefined;
  };

  delete = function () {};

  appendNumber = function (number) {
    if (number === "." && this.mainOperation.includes(".")) return;
    this.mainOperation = this.mainOperation + number;
    console.log(this.mainOperation);
  };

  chooseOperation = function (operation) {};

  compute = function () {};

  updateScreen = function () {
    this.screenMainOperation.innerText = this.mainOperation;
  };
}

const btnNumber = document.querySelectorAll(".number");
const btnOperation = document.querySelectorAll(".operation");
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

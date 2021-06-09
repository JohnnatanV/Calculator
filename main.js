function Calculator(screenHistory, screenMainOperation) {
  this.screenHistory = screenHistory;
  this.screenMainOperation = screenMainOperation;
}

Calculator.prototype.clear = function () {
  this.mainOperation = "";
  this.history = "";
  this.operation = undefined;
};

Calculator.prototype.delete = function () {};

Calculator.prototype.appendNumber = function (number) {
  this.mainOperation = this.mainOperation.toString() + number.toString();
};

Calculator.prototype.chooseOperation = function (operation) {};

Calculator.prototype.compute = function () {};

Calculator.prototype.updateScreen = function () {
  this.screenMainOperation.innerText = this.mainOperation;
};

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

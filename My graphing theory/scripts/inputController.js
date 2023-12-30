let funcInputValue = "";
let funcStartValue = -5;
let funcEndValue = 5;
let funcDef = 10;

function onSubmit() {
  funcInputValue = document.getElementById("funcInput").value;
  funcStartValue = parseInt(document.getElementById("funcStartInput").value);
  funcEndValue = parseInt(document.getElementById("funcEndInput").value);
  funcDef = parseInt(document.getElementById("funcDef").value);

  parseInput();
}

let userGenerated = false;

function parseInput() {
  let func = compileMathExpression(funcInputValue);
  G2 = new Graph(
    func,
    funcStartValue,
    funcEndValue,
    funcStartValue,
    funcEndValue,
    funcDef,
    funcDef
  );
  userGenerated = true;
}

document.getElementById("saveButton").addEventListener("click", onSubmit);

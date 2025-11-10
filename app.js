let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner =  checkWinner();
    if(count === 9 && !isWinner){
      gameDraw();
    }
  });
});

checkWinner = () => {
  for (let pattern of winPatterns) {
    let posValue1 = boxes[pattern[0]].innerText;
    let posValue2 = boxes[pattern[1]].innerText;
    let posValue3 = boxes[pattern[2]].innerText;

    if (posValue1 != "" && posValue2 != "" && posValue3 != "") {
      if (posValue1 == posValue2 && posValue2 == posValue3) {
        showWinner(posValue1);
        return true;
      }
    }
  }
};

gameDraw = () => {

  msg.innerText = "Draw, No winner";
  msgContainer.classList.remove("hide");
  disableBtns();
}

const showWinner = (winner) => {
  msg.innerText = `congratulations! ${winner} is the winner`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

disableBtns = () =>{
    for (let box of boxes) {
        box.disabled = true;
    }
}

enableBtns = () => {
    for(let box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
}

resetGame = () => {
    enableBtns();
    turnO = true;
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


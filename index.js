const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');



let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 

function initiate_fxn(){
    currentPlayer = 'X';
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active"); 

    boxes.forEach((box) =>{
        box.classList.remove("win");
    });
    
}

initiate_fxn();

function checkGameOver(){
    let ans = "";
    winningPositions.forEach((pos) => {
        if(gameGrid[pos[0]] != "" && gameGrid[pos[1]] != "" && gameGrid[pos[2]] != "" && gameGrid[pos[0]] === gameGrid[pos[1]] && gameGrid[pos[1]] === gameGrid[pos[2]]){
            if(gameGrid[pos[0]] == 'X'){
                ans = "X";
            } else ans = "O";

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            });

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(ans != ""){
        gameInfo.innerText = `winnerPlayer - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    let cnt = 0;
    gameGrid.forEach((x)=>{
        if(x === "") cnt++;
    })
    if(cnt == 0){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] =  currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
    else {

    }
}

boxes.forEach((box,index) => {
    box.addEventListener(('click') , ()=> {
        handleClick(index);
    })
}); 

newGameBtn.addEventListener(('click'), ()=>{
    initiate_fxn(); 
});
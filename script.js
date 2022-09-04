const displayController = ( () => {
    const displayMovement = (player, x, y, el) => {
            if(player == "Player 1") el.innerText = "X";
            if(player == "Player 2") el.innerText = "O";
    };
    const whoIsPlaying = (playerTurn) => {
        let player1Element = document.getElementById("player-1");
        let player2Element = document.getElementById("player-2");
        
        if(playerTurn == "Player 2"){
            player1Element.classList.add("player-turn");
            player2Element.classList.remove("player-turn");
        }
        
        if(playerTurn == "Player 1"){
            player2Element.classList.add("player-turn");
            player1Element.classList.remove("player-turn");
        }
    }
    const clear = () => {
        //resetting all box fields
        const gameBoxEl = Array.from(document.getElementsByClassName("gamebox"));
        gameBoxEl.forEach(el => el.innerText = "");
        //displaying turn to player 1
        let player1Element = document.getElementById("player-1");
        player1Element.classList.add("player-turn");
    }
    return {displayMovement, clear, whoIsPlaying};
})();



let gameBoard = ( () => {
    let movementsCount = 0;
    let movements = (new Array(3)).fill().map(function () { return new Array(3).fill(false); }); //create 3x3 matrix
    let playerTurn = "Player 2";
    let winner = false;
    const clear = () => {
        movementsCount = 0;
        movements = (new Array(3)).fill().map(function () { return new Array(3).fill(false); }); //create 3x3 matrix
        layerTurn = "Player 2";
        winner = false;
        displayController.clear();
    }
    const getMatchState = () => {
        //checking for winner
        //--checking rows
        for(row in movements){
            let rowResult = movements[row][0] + movements[row][1] + movements[row][2];
            if(rowResult == "XXX") winner = "Player 1";
            if(rowResult == "OOO") winner = "Player 2";
        }
        //--checking columns
        for(column in movements){
            let columnResult = movements[0][column] + movements[1][column] + movements[2][column];
            if(columnResult == "XXX") winner = "Player 1";
            if(columnResult == "OOO") winner = "Player 2";
        }
        //--checking diagonals
        let diagonal1 = movements[0][0] + movements[1][1] + movements[2][2];
        let diagonal2 = movements[0][2] + movements[1][1] + movements[2][0];
        if(diagonal1 == "XXX" || diagonal2 == "XXX") winner = "Player 1";
        if(diagonal1 == "OOO" || diagonal2 == "OOO") winner = "Player 2";
        if(movementsCount == 9 && winner == false) winner = "draw";
        //returning winner
        return winner;
    };
    const getCurrentPlayer = () => playerTurn;
    const whoIsNext = () => {
        if(playerTurn == "Player 2"){
            return "Player 1";
        }
        if(playerTurn == "Player 1"){
            return "Player 2";
        } 
    };
    const makeMovement = (x, y) => {
        if(movements[x][y] == false) {
            movementsCount++;
            playerTurn = whoIsNext();
            displayController.whoIsPlaying(playerTurn);
            //Making movement
            if(playerTurn == "Player 1") movements[x][y] = "X";
            if(playerTurn == "Player 2") movements[x][y] = "O";
            return true; //movement has been done 
        }
    };
    return {makeMovement, getCurrentPlayer, getMatchState, clear};
})();


//add event listener to each box in gameboard
const gameBoxEl = Array.from(document.getElementsByClassName("gamebox"));
gameBoxEl.forEach(el => el.addEventListener("click", makeMovement));

//add event listener to restart game
const restartEl = document.getElementById("restart");
restartEl.addEventListener("click", restartBoard);

function restartBoard(){
    gameBoard.clear();
    displayController.clear();
}

function makeMovement(){
    const [x, y] = this.getAttribute("position");
    const movementDone = gameBoard.makeMovement(x, y); //true if movement was done
    if(movementDone) displayController.displayMovement(gameBoard.getCurrentPlayer(), x, y, this); //update display
    let matchResult = gameBoard.getMatchState(); //looking if there is a winner
    //if match finish, clears all
    if(matchResult == "draw" || matchResult == "Player 1" || matchResult == "Player 2"){
        if(matchResult != "draw") alert(`The winner is ${matchResult}.`)
        if(matchResult == "draw") alert("It is a draw.")
        gameBoard.clear();
        displayController.clear();
    }
}






import '../styles.css';
import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import DOMController from './DOMController.js';

const gameController = (() => {
    let player1, player2, currentPlayer;
    let shipsPlaced = false;
    let gameOver = false;
    
    const initializeGame = () => {
        player1 = new Player('real');
        player2 = new Player('computer');
        player1.setOpponentGameboard(player2);
        player2.setOpponentGameboard(player1);
        DOMController.randomShipPlacement();
        DOMController.resetGameBtn();
        currentPlayer = player1;
        DOMController.renderAllBoards(player1, player2);
    };

    const randomizeShips = () => {
        player1.gameboard.clearBoard();
        player2.gameboard.clearBoard();
        const shipsLengths = [5, 4, 3, 3, 2];
        player1.gameboard.placeShipRandom(shipsLengths);
        player2.gameboard.placeShipRandom(shipsLengths);
        DOMController.renderAllBoards(player1, player2);
        shipsPlaced = true;
        DOMController.addCellEvents('player2', handleAttack);
    }

    const resetGame = () => {
        shipsPlaced = false;
        gameOver = false;
        player1.gameboard.clearBoard();
        player2.gameboard.clearBoard();
        currentPlayer = player1;
        DOMController.renderAllBoards(player1, player2);
        DOMController.clearCellEvents('player2');
    }

    const handleAttack = (coordinates) => {
        if(gameOver) return;
        try{
            currentPlayer.makeMove(coordinates);
            DOMController.renderAllBoards(player1, player2);
            if(player1.gameboard.areAllShipsSunk()) return endGame('Computer wins!');
            if(player2.gameboard.areAllShipsSunk()) return endGame('Player 1 wins!');
            switchTurn();
            if(currentPlayer.type === 'computer'){
                handleComputerTurn();
            } else {
                DOMController.displayMessage('Player 1 turn');
            }
        } catch(error){
            console.error(error.message);
        }
    };

    const handleComputerTurn = () => {
        setTimeout(() => {
            currentPlayer.generateMove();
            DOMController.renderGameboard(player1.gameboard, 'player1');
            if(player1.gameboard.areAllShipsSunk()) return endGame('Player 2 wins!');
            switchTurn();
        }, 1000);
    };

    const switchTurn = () => {
        if(currentPlayer === player1){
            currentPlayer = player2;
            DOMController.displayMessage('Computer turn');
            DOMController.updateTurnDisplay(currentPlayer);
        } else if(currentPlayer === player2){
            currentPlayer = player1;
            DOMController.displayMessage('Player 1 turn');
            DOMController.updateTurnDisplay(currentPlayer);
        }
    };

    const endGame = (message) => {
        gameOver = true;
        DOMController.displayMessage(message);
    };

    return{initializeGame, randomizeShips, resetGame};
})();

export default gameController

document.addEventListener('DOMContentLoaded', () => {
    gameController.initializeGame();
});

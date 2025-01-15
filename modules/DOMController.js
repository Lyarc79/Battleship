
import gameController from "./gameController.js";

const DOMController = (() => {
    const renderGameboard = (gameboard, playerId, hideShips = false) => {
        const boardContainer = document.getElementById(`${playerId}-gameboard`);
        boardContainer.innerHTML = '';
       
        for(let x = 0; x < 10; x++){
            for(let y = 0; y < 10; y++){
                const cell = document.createElement('div');
                cell.dataset.coordinates = `${x},${y}`;

                const cellState = gameboard.getCellState(x, y);
                if(cellState === 'ship' && !hideShips){
                    cell.classList.add('ship');
                } else if(cellState === 'hit'){
                    cell.classList.add('hit');
                } else if(cellState === 'miss'){
                    cell.classList.add('miss');
                }
                boardContainer.appendChild(cell);
            }
        }
    };

    const addCellEvents = (playerId, callback) => {
        const boardContainer = document.getElementById(`${playerId}-gameboard`);
        boardContainer.addEventListener('click', (event) => {
            const cell = event.target;
            if(!cell.dataset.coordinates) return;

            const coordinates = cell.dataset.coordinates.split(',').map((coord) => parseInt(coord, 10));
            callback(coordinates);
        });
    };
    
    const clearCellEvents = (playerId) => {
        const boardContainer = document.getElementById(`${playerId}-gameboard`);
        const clonedContainer = boardContainer.cloneNode(true);
        boardContainer.parentNode.replaceChild(clonedContainer, boardContainer);
    };

    const randomShipPlacement = () => {
        document.getElementById('randomizeShipsBtn').addEventListener('click', () => {
            gameController.randomizeShips();
        })
    }

    const resetGameBtn = () => {
        document.getElementById('resetGameBtn').addEventListener('click', () => {
            gameController.resetGame();
        })
    }

    const updateTurnDisplay = (currentPlayer) => {
        const turnDisplay = document.getElementById('game-message');
        turnDisplay.classList.remove('playerTurnDisplay', 'computerTurnDisplay')
        if(currentPlayer.type === 'real'){
            turnDisplay.classList.add('playerTurnDisplay');
        } else{
            turnDisplay.classList.add('computerTurnDisplay');
        }
    }

    const displayMessage = (message) => {
        const messageBox = document.getElementById('game-message');
        messageBox.textContent = message;
    };

    const renderAllBoards = (player1, player2) => {
        renderGameboard(player1.gameboard, 'player1', false);
        renderGameboard(player2.gameboard, 'player2', true);
    }

    return{
        renderGameboard,
        addCellEvents,
        clearCellEvents,
        randomShipPlacement,
        resetGameBtn,
        updateTurnDisplay,
        displayMessage,
        renderAllBoards,
    };
})();

export default DOMController;
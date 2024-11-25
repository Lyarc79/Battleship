
const Ship = require('../modules/ship');
const Gameboard = require('../modules/gameboard');

class Player {
    constructor(type = 'real'){
        this.type = type;
        this.gameboard = new Gameboard();
        this.previousMoves = [];
        this.opponentGameboard = null;
    }

    setOpponentGameboard(opponent) {
        if (!(opponent instanceof Player)) {
            throw new Error("Opponent must be a Player instance!");
        }
        this.opponentGameboard = opponent.gameboard;
    }

    makeMove(coordinates){
        if (!this.opponentGameboard) {
            throw new Error("Opponent gameboard is not set!");
        }
        if (!this.isValidCoordinate(coordinates)) {
            throw new Error("Invalid coordinates!");
        }
       this.opponentGameboard.recieveAttack(coordinates);
    }
    
    generateMove(){
        if (!this.opponentGameboard) {
            throw new Error("Opponent gameboard is not set!");
        }
        let coordinates;
        do{
            coordinates = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
            ];
        } while(this.previousMoves.some((move) => move[0] === coordinates[0] && move[1] === coordinates[1]));
        this.previousMoves.push(coordinates);
        this.opponentGameboard.recieveAttack(coordinates);
    }

    isValidCoordinate(coordinates){
        if(Array.isArray(coordinates) && coordinates.length === 2){
            const [x, y] = coordinates;
            if(x >= 0 && x <= 9 && y >= 0 && y <= 9){
                return true;
            }
        }
        return false;
    }
}

module.exports = Player;
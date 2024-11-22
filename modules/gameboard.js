
const Ship = require('../modules/ship');

class Gameboard {
    constructor(){
        this.ships = [];
        this.missedAttacks = [];
        this.grid = {};
    }

    placeShip(ship, coordinates){
        const isOutOfBounds = ([x, y]) => x < 0 || x >= 10 || y < 0 || y >= 10;
        const isOccupied = ([x, y]) => this.grid[`${x},${y}`] !== undefined;

        for(let coord of coordinates){
            if(isOutOfBounds(coord) || isOccupied(coord)){
                return false;
            }
        }
        for(let coord of coordinates){
            this.grid[`${coord[0]},${coord[1]}`] = ship;
        }
        this.ships.push({ship, coordinates});
        return true;
    }

    recieveAttack(coordinates){
        if(!this.attackedCoordinates){
            this.attackedCoordinates = new Set();
        }
        const coordString = coordinates.toString();
        if(this.attackedCoordinates.has(coordString)){
            return;
        }
        this.attackedCoordinates.add(coordString);

        let hit = false;
        for(let ship of this.ships){
            if(ship.coordinates.some(coord => coord[0] === coordinates[0] && coord[1] === coordinates[1])){
                ship.ship.hit();
                hit = true;
                break;
            }
        }
        if(!hit){
            this.missedAttacks.push(coordinates);
        }
    }

    areAllShipsSunk(){
        for(let ship of this.ships){
            if(!ship.ship.isSunk()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Gameboard;
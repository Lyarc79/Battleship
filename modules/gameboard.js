
import Ship from './ship.js';

class Gameboard {
    constructor(){
        this.ships = [];
        this.missedAttacks = [];
        this.grid = {};
        this.attackedCoordinates = new Set();
    }

    clearBoard(){
        this.grid = {};
        this.ships = [];
        this.missedAttacks = [];
        this.attackedCoordinates = new Set();
    }

    isOutOfBounds([x, y]) {
        return x < 0 || x >= 10 || y < 0 || y >= 10;
    }

    isOccupied([x, y]) {
        return this.grid[`${x},${y}`] !== undefined;
    }

    canPlaceShip(coordinates) {
        for (let [x, y] of coordinates) {
            if (this.isOutOfBounds([x, y]) || this.isOccupied([x, y])) {
                return false;
            }
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const surroundingX = x + dx;
                    const surroundingY = y + dy;
                    if (
                        (dx !== 0 || dy !== 0) &&
                        !this.isOutOfBounds([surroundingX, surroundingY]) &&
                        this.isOccupied([surroundingX, surroundingY])
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placeShip(ship, coordinates){
        for(let coord of coordinates){
            if(this.isOutOfBounds(coord) || this.isOccupied(coord)){
                return false;
            }
        }
        for(let coord of coordinates){
            this.grid[`${coord[0]},${coord[1]}`] = ship;
        }
        this.ships.push({ship, coordinates});
        return true;
    }

    getCoordinates(length, direction, [startX, startY]) {
        const coordinates = [];
        for (let i = 0; i < length; i++) {
            const x = direction === 'horizontal' ? startX + i : startX;
            const y = direction === 'vertical' ? startY + i : startY;
            coordinates.push([x, y]);
        }
        return coordinates;
    }

    placeShipRandom(shipLenghts){
        const directions = ['horizontal', 'vertical'];
        for(let length of shipLenghts){
            let placed = false;
            while(!placed){
                const startX = Math.floor(Math.random() * 10);
                const startY = Math.floor(Math.random() * 10);
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const shipCoordinates = this.getCoordinates(length, direction, [startX, startY]);
                if(this.canPlaceShip(shipCoordinates)){
                    const ship = new Ship(length);
                    this.placeShip(ship, shipCoordinates);
                    placed = true;
                }
            }
        }
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

    getCellState(x, y) {
        const coordKey = `${x},${y}`;
        if(this.missedAttacks.some(([mx, my]) => mx === x && my === y)){
            return 'miss';
        }
        if(this.attackedCoordinates.has(coordKey)){
           if(this.ships.some(ship =>
            ship.coordinates.some(coord => coord[0] === x && coord[1] === y)
           )) {
            return 'hit';
           }
        }
        if(this.ships.some(ship =>
            ship.coordinates.some(coord => coord[0] === x && coord[1] === y)
        )){
            return 'ship';
        }
        return 'empty';
    }
}

export default Gameboard;
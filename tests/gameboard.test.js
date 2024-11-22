
const Ship = require('../modules/ship');
const Gameboard = require('../modules/gameboard');

describe('Ship Placement', () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard();
    })

    test('Ships are being placed correctly on the board', () => {
        const ship1 = new Ship(2);
        const result = gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        expect(result).toBe(true);
        expect(gameboard.ships.length).toEqual(1);
        expect(gameboard.ships[0].coordinates).toEqual([[0, 0], [0, 1]]);
    });

    test('Ships are not overlapping', () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        gameboard.placeShip(ship1, [[0,0], [0, 1]]);
        gameboard.placeShip(ship2, [[0,0], [0, 1]]);
        expect(gameboard.ships.length).toEqual(1);
        expect(gameboard.ships[0].ship).toBe(ship1);
    })
})

describe('Recieving attacks', () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard();
    })

    test('Ships are being hit and hitCount increments', () => {
        const ship1 = new Ship(2);
        gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        gameboard.recieveAttack([0, 1]);
        expect(ship1.hitCount).toBe(1);
    })

    test('Registers a miss if there is no ship on the selected coords', () => {
        const ship1 = new Ship(2);
        gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        gameboard.recieveAttack([1, 1]);
        expect(ship1.hitCount).toBe(0);
        expect(gameboard.missedAttacks).toContainEqual([1, 1]);
    })

    test('Ignores repeated attacks', () => {
        const ship1 = new Ship(2);
        gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        gameboard.recieveAttack([0, 1]);
        gameboard.recieveAttack([0, 1]);
        expect(ship1.hitCount).toBe(1);
    })
})

describe('areAllShipsSunk', () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard();
    })

    test('Returns true when all ships are sunk', () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        gameboard.placeShip(ship2, [[1, 1], [2, 1], [3, 1]]);
        gameboard.recieveAttack([0, 0]);
        gameboard.recieveAttack([0, 1]);
        gameboard.recieveAttack([1, 1]);
        gameboard.recieveAttack([2, 1]);
        gameboard.recieveAttack([3, 1]);
        expect(gameboard.areAllShipsSunk()).toBe(true);
    })

    test('Returns false if not all ships are sunk', () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        gameboard.placeShip(ship1, [[0, 0], [0, 1]]);
        gameboard.placeShip(ship2, [[1, 1], [2, 1], [3, 1]]);
        gameboard.recieveAttack([0, 0]);
        gameboard.recieveAttack([0, 1]);
        gameboard.recieveAttack([1, 1]);
        gameboard.recieveAttack([2, 1]);
        gameboard.recieveAttack([3, 5]);
        expect(gameboard.areAllShipsSunk()).toBe(false);
    })
})
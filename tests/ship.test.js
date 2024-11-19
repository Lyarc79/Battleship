 
 const Ship = require('../modules/ship');

 describe('Ship Class', () => {
    let testShip;

    beforeEach(() => {
        testShip = new Ship(3);
    });

    test('Ship initializes with correct length and a hitCount of 0', () => {
        expect(testShip.length).toEqual(3);
        expect(testShip.hitCount).toEqual(0);
    });

    test('hit() correctly increments hitCount', () => {
        testShip.hit();
        expect(testShip.hitCount).toEqual(1);
    });

    test('isSunk() returns true when hitCount equals ship length', () => {
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });

    test('isSunk() returns false when hits are less than length', () => {
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    });
 })

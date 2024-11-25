
const Ship = require('../modules/ship');
const Gameboard = require('../modules/gameboard');
const Player = require('../modules/player');

describe('Player Class', () => {
    let player1, player2;

    beforeEach(() => {
        player1 = new Player('real');
        player2 = new Player('computer');
    })

    test('Player initializes correctly', () => {
        expect(player1.type).toBe('real');
        expect(player1.gameboard).toBeInstanceOf(Gameboard);
        expect(player1.previousMoves).toEqual([]);
    })

    test('setOpponentGameboard sets the opponent correctly', () => {
        player1.setOpponentGameboard(player2);
        expect(player1.opponentGameboard).toBe(player2.gameboard);
    })

    test('setOpponentGameboard throws an error for invalid opponent', () => {
        expect(() => player1.setOpponentGameboard({})).toThrow("Opponent must be a Player instance!");
    })

    test('makeMove sends attack to opponent gameboard', () => {
        player1.setOpponentGameboard(player2);
        const spy = jest.spyOn(player2.gameboard, 'recieveAttack');
        player1.makeMove([4, 5]);
        expect(spy).toHaveBeenCalledWith([4, 5]);
        spy.mockRestore();
    })

    test('makeMove throws an error if opponent gameboard is not set', () => {
        expect(() => player1.makeMove([4, 5]).toThorw("Opponent gameboard is not set!"));
    })

    test('makeMove throws error for invalid coordinates', () => {
        player1.setOpponentGameboard(player2);
        expect(() => player1.makeMove([10, 10])).toThrow("Invalid coordinates!");
        expect(() => player1.makeMove('invalid')).toThrow("Invalid coordinates!");
    })

    test('generateMove generates a valid move for computer player', () => {
        player2.setOpponentGameboard(player1);
        const spy = jest.spyOn(player1.gameboard, 'recieveAttack');
        player2.generateMove();
        expect(player2.previousMoves.length).toBe(1);
        const [x, y] = player2.previousMoves[0];
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
        expect(spy).toHaveBeenCalledWith(player2.previousMoves[0]);
        spy.mockRestore();
    })

    test('generateMove doesnt repeat moves', () => {
        player2.setOpponentGameboard(player1);
        for(let i = 0; i < 100; i++){
            player2.generateMove();
        }
        const uniqueMoves = new Set(
            player2.previousMoves.map((move) => move.toString())
        );
        expect(uniqueMoves.size).toBe(player2.previousMoves.length);
    })
})
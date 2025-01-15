/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/DOMController.js":
/*!**********************************!*\
  !*** ./modules/DOMController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController.js */ "./modules/gameController.js");

var DOMController = function () {
  var renderGameboard = function renderGameboard(gameboard, playerId) {
    var hideShips = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var boardContainer = document.getElementById("".concat(playerId, "-gameboard"));
    boardContainer.innerHTML = '';
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        var cell = document.createElement('div');
        cell.dataset.coordinates = "".concat(x, ",").concat(y);
        var cellState = gameboard.getCellState(x, y);
        if (cellState === 'ship' && !hideShips) {
          cell.classList.add('ship');
        } else if (cellState === 'hit') {
          cell.classList.add('hit');
        } else if (cellState === 'miss') {
          cell.classList.add('miss');
        }
        boardContainer.appendChild(cell);
      }
    }
  };
  var addCellEvents = function addCellEvents(playerId, callback) {
    var boardContainer = document.getElementById("".concat(playerId, "-gameboard"));
    boardContainer.addEventListener('click', function (event) {
      var cell = event.target;
      if (!cell.dataset.coordinates) return;
      var coordinates = cell.dataset.coordinates.split(',').map(function (coord) {
        return parseInt(coord, 10);
      });
      callback(coordinates);
    });
  };
  var clearCellEvents = function clearCellEvents(playerId) {
    var boardContainer = document.getElementById("".concat(playerId, "-gameboard"));
    var clonedContainer = boardContainer.cloneNode(true);
    boardContainer.parentNode.replaceChild(clonedContainer, boardContainer);
  };
  var randomShipPlacement = function randomShipPlacement() {
    document.getElementById('randomizeShipsBtn').addEventListener('click', function () {
      _gameController_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomizeShips();
    });
  };
  var resetGameBtn = function resetGameBtn() {
    document.getElementById('resetGameBtn').addEventListener('click', function () {
      _gameController_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetGame();
    });
  };
  var updateTurnDisplay = function updateTurnDisplay(currentPlayer) {
    var turnDisplay = document.getElementById('game-message');
    turnDisplay.classList.remove('playerTurnDisplay', 'computerTurnDisplay');
    if (currentPlayer.type === 'real') {
      turnDisplay.classList.add('playerTurnDisplay');
    } else {
      turnDisplay.classList.add('computerTurnDisplay');
    }
  };
  var displayMessage = function displayMessage(message) {
    var messageBox = document.getElementById('game-message');
    messageBox.textContent = message;
  };
  var renderAllBoards = function renderAllBoards(player1, player2) {
    renderGameboard(player1.gameboard, 'player1', false);
    renderGameboard(player2.gameboard, 'player2', true);
  };
  return {
    renderGameboard: renderGameboard,
    addCellEvents: addCellEvents,
    clearCellEvents: clearCellEvents,
    randomShipPlacement: randomShipPlacement,
    resetGameBtn: resetGameBtn,
    updateTurnDisplay: updateTurnDisplay,
    displayMessage: displayMessage,
    renderAllBoards: renderAllBoards
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMController);

/***/ }),

/***/ "./modules/gameController.js":
/*!***********************************!*\
  !*** ./modules/gameController.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.css */ "./styles.css");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./modules/ship.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./modules/gameboard.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player.js */ "./modules/player.js");
/* harmony import */ var _DOMController_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOMController.js */ "./modules/DOMController.js");





var gameController = function () {
  var player1, player2, currentPlayer;
  var shipsPlaced = false;
  var gameOver = false;
  var initializeGame = function initializeGame() {
    player1 = new _player_js__WEBPACK_IMPORTED_MODULE_3__["default"]('real');
    player2 = new _player_js__WEBPACK_IMPORTED_MODULE_3__["default"]('computer');
    player1.setOpponentGameboard(player2);
    player2.setOpponentGameboard(player1);
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].randomShipPlacement();
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].resetGameBtn();
    currentPlayer = player1;
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].renderAllBoards(player1, player2);
  };
  var randomizeShips = function randomizeShips() {
    player1.gameboard.clearBoard();
    player2.gameboard.clearBoard();
    var shipsLengths = [5, 4, 3, 3, 2];
    player1.gameboard.placeShipRandom(shipsLengths);
    player2.gameboard.placeShipRandom(shipsLengths);
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].renderAllBoards(player1, player2);
    shipsPlaced = true;
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].addCellEvents('player2', handleAttack);
  };
  var resetGame = function resetGame() {
    shipsPlaced = false;
    gameOver = false;
    player1.gameboard.clearBoard();
    player2.gameboard.clearBoard();
    currentPlayer = player1;
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].renderAllBoards(player1, player2);
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].clearCellEvents('player2');
  };
  var handleAttack = function handleAttack(coordinates) {
    if (gameOver) return;
    try {
      currentPlayer.makeMove(coordinates);
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].renderAllBoards(player1, player2);
      if (player1.gameboard.areAllShipsSunk()) return endGame('Computer wins!');
      if (player2.gameboard.areAllShipsSunk()) return endGame('Player 1 wins!');
      switchTurn();
      if (currentPlayer.type === 'computer') {
        handleComputerTurn();
      } else {
        _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayMessage('Player 1 turn');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  var handleComputerTurn = function handleComputerTurn() {
    setTimeout(function () {
      currentPlayer.generateMove();
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].renderGameboard(player1.gameboard, 'player1');
      if (player1.gameboard.areAllShipsSunk()) return endGame('Player 2 wins!');
      switchTurn();
    }, 1000);
  };
  var switchTurn = function switchTurn() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayMessage('Computer turn');
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].updateTurnDisplay(currentPlayer);
    } else if (currentPlayer === player2) {
      currentPlayer = player1;
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayMessage('Player 1 turn');
      _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].updateTurnDisplay(currentPlayer);
    }
  };
  var endGame = function endGame(message) {
    gameOver = true;
    _DOMController_js__WEBPACK_IMPORTED_MODULE_4__["default"].displayMessage(message);
  };
  return {
    initializeGame: initializeGame,
    randomizeShips: randomizeShips,
    resetGame: resetGame
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);
document.addEventListener('DOMContentLoaded', function () {
  gameController.initializeGame();
});

/***/ }),

/***/ "./modules/gameboard.js":
/*!******************************!*\
  !*** ./modules/gameboard.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./modules/ship.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);
    this.ships = [];
    this.missedAttacks = [];
    this.grid = {};
    this.attackedCoordinates = new Set();
  }
  return _createClass(Gameboard, [{
    key: "clearBoard",
    value: function clearBoard() {
      this.grid = {};
      this.ships = [];
      this.missedAttacks = [];
      this.attackedCoordinates = new Set();
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];
      return x < 0 || x >= 10 || y < 0 || y >= 10;
    }
  }, {
    key: "isOccupied",
    value: function isOccupied(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];
      return this.grid["".concat(x, ",").concat(y)] !== undefined;
    }
  }, {
    key: "canPlaceShip",
    value: function canPlaceShip(coordinates) {
      var _iterator = _createForOfIteratorHelper(coordinates),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            x = _step$value[0],
            y = _step$value[1];
          if (this.isOutOfBounds([x, y]) || this.isOccupied([x, y])) {
            return false;
          }
          for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
              var surroundingX = x + dx;
              var surroundingY = y + dy;
              if ((dx !== 0 || dy !== 0) && !this.isOutOfBounds([surroundingX, surroundingY]) && this.isOccupied([surroundingX, surroundingY])) {
                return false;
              }
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, coordinates) {
      var _iterator2 = _createForOfIteratorHelper(coordinates),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var coord = _step2.value;
          if (this.isOutOfBounds(coord) || this.isOccupied(coord)) {
            return false;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(coordinates),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _coord = _step3.value;
          this.grid["".concat(_coord[0], ",").concat(_coord[1])] = ship;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.ships.push({
        ship: ship,
        coordinates: coordinates
      });
      return true;
    }
  }, {
    key: "getCoordinates",
    value: function getCoordinates(length, direction, _ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        startX = _ref6[0],
        startY = _ref6[1];
      var coordinates = [];
      for (var i = 0; i < length; i++) {
        var x = direction === 'horizontal' ? startX + i : startX;
        var y = direction === 'vertical' ? startY + i : startY;
        coordinates.push([x, y]);
      }
      return coordinates;
    }
  }, {
    key: "placeShipRandom",
    value: function placeShipRandom(shipLenghts) {
      var directions = ['horizontal', 'vertical'];
      var _iterator4 = _createForOfIteratorHelper(shipLenghts),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var length = _step4.value;
          var placed = false;
          while (!placed) {
            var startX = Math.floor(Math.random() * 10);
            var startY = Math.floor(Math.random() * 10);
            var direction = directions[Math.floor(Math.random() * directions.length)];
            var shipCoordinates = this.getCoordinates(length, direction, [startX, startY]);
            if (this.canPlaceShip(shipCoordinates)) {
              var ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](length);
              this.placeShip(ship, shipCoordinates);
              placed = true;
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "recieveAttack",
    value: function recieveAttack(coordinates) {
      if (!this.attackedCoordinates) {
        this.attackedCoordinates = new Set();
      }
      var coordString = coordinates.toString();
      if (this.attackedCoordinates.has(coordString)) {
        return;
      }
      this.attackedCoordinates.add(coordString);
      var hit = false;
      var _iterator5 = _createForOfIteratorHelper(this.ships),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var ship = _step5.value;
          if (ship.coordinates.some(function (coord) {
            return coord[0] === coordinates[0] && coord[1] === coordinates[1];
          })) {
            ship.ship.hit();
            hit = true;
            break;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      if (!hit) {
        this.missedAttacks.push(coordinates);
      }
    }
  }, {
    key: "areAllShipsSunk",
    value: function areAllShipsSunk() {
      var _iterator6 = _createForOfIteratorHelper(this.ships),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var ship = _step6.value;
          if (!ship.ship.isSunk()) {
            return false;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return true;
    }
  }, {
    key: "getCellState",
    value: function getCellState(x, y) {
      var coordKey = "".concat(x, ",").concat(y);
      if (this.missedAttacks.some(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          mx = _ref8[0],
          my = _ref8[1];
        return mx === x && my === y;
      })) {
        return 'miss';
      }
      if (this.attackedCoordinates.has(coordKey)) {
        if (this.ships.some(function (ship) {
          return ship.coordinates.some(function (coord) {
            return coord[0] === x && coord[1] === y;
          });
        })) {
          return 'hit';
        }
      }
      if (this.ships.some(function (ship) {
        return ship.coordinates.some(function (coord) {
          return coord[0] === x && coord[1] === y;
        });
      })) {
        return 'ship';
      }
      return 'empty';
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./modules/player.js":
/*!***************************!*\
  !*** ./modules/player.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./modules/ship.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./modules/gameboard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Player = /*#__PURE__*/function () {
  function Player() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'real';
    _classCallCheck(this, Player);
    this.type = type;
    this.gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.previousMoves = [];
    this.opponentGameboard = null;
  }
  return _createClass(Player, [{
    key: "setOpponentGameboard",
    value: function setOpponentGameboard(opponent) {
      if (!(opponent instanceof Player)) {
        throw new Error("Opponent must be a Player instance!");
      }
      this.opponentGameboard = opponent.gameboard;
    }
  }, {
    key: "makeMove",
    value: function makeMove(coordinates) {
      if (!this.opponentGameboard) {
        throw new Error("Opponent gameboard is not set!");
      }
      if (!this.isValidCoordinate(coordinates)) {
        throw new Error("Invalid coordinates!");
      }
      this.opponentGameboard.recieveAttack(coordinates);
    }
  }, {
    key: "generateMove",
    value: function generateMove() {
      if (!this.opponentGameboard) {
        throw new Error("Opponent gameboard is not set!");
      }
      var coordinates;
      do {
        coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      } while (this.previousMoves.some(function (move) {
        return move[0] === coordinates[0] && move[1] === coordinates[1];
      }));
      this.previousMoves.push(coordinates);
      this.opponentGameboard.recieveAttack(coordinates);
    }
  }, {
    key: "isValidCoordinate",
    value: function isValidCoordinate(coordinates) {
      if (Array.isArray(coordinates) && coordinates.length === 2) {
        var _coordinates = _slicedToArray(coordinates, 2),
          x = _coordinates[0],
          y = _coordinates[1];
        if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
          return true;
        }
      }
      return false;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./modules/ship.js":
/*!*************************!*\
  !*** ./modules/ship.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ship = /*#__PURE__*/function () {
  function Ship(length) {
    _classCallCheck(this, Ship);
    this.length = length;
    this.hitCount = 0;
    this.coordinates = [];
  }
  return _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      if (this.hitCount < this.length) {
        this.hitCount++;
      }
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      return this.length === this.hitCount;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./modules/gameController.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map
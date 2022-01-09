/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Select Canvas in HTML File
var canvas = document.querySelector('canvas'); //Be able to draw on canvas

var c = canvas.getContext('2d'); //Set initial canvas width and height to match the browser width and height

canvas.width = innerWidth;
canvas.height = innerHeight; //**Variables**//
//Half way in width and height of browser screen

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}; //Array of colours to choose from

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']; //**Utility Functions**//
//Produce a random number between the 2 numbers enetered

randomIntFromRange = function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}; //Returns a colour from the colour array selection


randomColor = function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}; //**Event Listeners**//
//Connects the mousemovement the mouse object above


addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}); //Resizing the browser window

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight; //reset animation on resize

  init();
}); //**Objects**//
//Class Constructor that gives instruction on the build, position and movement of each particle

var Particle = function Particle(x, y, radius, color) {
  var _this = this;

  _classCallCheck(this, Particle);

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2; //Math.random() places each particle in location of the circle; Math.PI * 2 allows the particles to display 360 degrees of the circle

  this.velocity = 0.07; //Speed of particles

  this.distanceFromCenter = randomIntFromRange(50, 200); //Range of particles from the center. Between the two intergers on the radius of the circle

  this.lastMouse = {
    x: x,
    y: y
  }; //*Function to update the location of particle

  this.update = function () {
    var lastPoint = {
      x: _this.x,
      y: _this.y
    };
    _this.radians += _this.velocity; //by adding the velocity to the radians, we add circular movement

    _this.lastMouse.x += (mouse.x - _this.lastMouse.x) * 0.05; //smoothes over the movement of the particles on the x-axis

    _this.lastMouse.y += (mouse.y - _this.lastMouse.y) * 0.05; //smoothes over the movement of the particles on the y-axis

    _this.x = _this.lastMouse.x + Math.cos(_this.radians) * _this.distanceFromCenter; //Particle displays of the x-axis

    _this.y = _this.lastMouse.y + Math.sin(_this.radians) * _this.distanceFromCenter; //Particle displays on the y-axis
    //Both instructs the particles to produce a 2d circle. If one is missing, it shows a line

    _this.draw(lastPoint);
  }; //Function to draw particle


  this.draw = function (lastPoint) {
    c.beginPath();
    c.strokeStyle = _this.color;
    c.lineWidth = _this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(_this.x, _this.y);
    c.stroke();
    c.closePath();
  };
}; //**Implementation**//
//Array to place particles in


var particles = []; //Function to start movement of particles

init = function init() {
  particles = []; //state an empty array at the start of the function to clear screen if the resize is triggered
  //Indicates the number of particles wanted on the screen

  for (var i = 0; i < 80; i++) {
    var radius = Math.random() * 2 + 1; //sets a random width for the particle ranging between 1-2px width 

    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
  }
}; //Function to animate


animate = function (_animate) {
  function animate() {
    return _animate.apply(this, arguments);
  }

  animate.toString = function () {
    return _animate.toString();
  };

  return animate;
}(function () {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 0.05)"; // the lower the ocapity, the longer the particle tail

  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (particle) {
    particle.update();
  });
});

init();
animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
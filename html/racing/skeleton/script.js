var PLAYER_TOP_OFFSET = 35,   // Default properties of player vehicle
    PLAYER_LEFT_OFFSET = 12,  // All values in % screen width/height
    PLAYER_WIDTH = 13; // TODO

var MAX_ROAD_LANE = 3,    // Road lanes (total 4) start at 0 = leftmost
    MIN_CAR_SPEED = .95,  // Opponent cars speed, unit is % of screen height
    MAX_CAR_SPEED = 1,
    STEERING_DELTA = 3,   // % of screen width that player moves on keypress
    MIN_LEFT_OFFSET = 0,  // Edge offset, % of screen width
    MAX_LEFT_OFFSET = 100;

// This is the div we put the score in...
var score = document.getElementById('score');
// ...like this:
function increase_score() {
  score.innerHTML = parseInt(score.innerHTML) + 1;
}

// Return a random number (real value) between [min, max]
function random_between(min, max) {
  // Math.random() returns a real value between [0, 1]
  return Math.random() ... ; // TODO
}

function Car(model, lane) {
  // Every Car has its speed
  this.speed; // TODO
  // Every Car drives on one of the four lanes
  this.lane = lane || Math.round(random_between(0, MAX_ROAD_LANE));
  // Cars on the left two lanes are facing 'forwards', and cars on the
  // right two lanes are facing 'backwards'.
  // TODO*
  // Create a HTML <img> element
  this.elem = document.createElement('img');
  // Set its src to any (or specific) model
  // (if model is undefined, pick at random)
  model = model || 'car-1.png'; // TODO
  this.elem.setAttribute('src', model);
  // Set initial size and position of car
  this.elem.style.width = '7%'; // TODO
  this.elem.style.top = '37%';
  this.elem.style.left = '62.5%';
  this.elem.style.zIndex = 1;  // how close in the z-dimension the object is
  // Insert above created <img> HTML element into document
  document.body.appendChild(this.elem);
}
// Cars drive around (move)...
Car.prototype.move = function () {
  // ...so each Car has a method 'move' (this function)
  // 'Moving' here means just increasing the offset from the top of the screen
  // On every iteration, we increase the offset by car's speed:
  var top_offset; // TODO
  // Set the new offset on the car's HTML element
  // TODO
  // Additionally, car's left offset and size also change with regard to
  // increased top offset
  this.elem.style.left = compute.left[this.lane](top_offset) + '%';
  this.elem.style.width = compute.width(top_offset) + '%';
  // Z-index increases by 1
  // TODO
  // return true if car is already past player car, e.g. 'we left it behind'
  return false; // TODO
}

// Create player vehicle, pick a model (picture file), and set it on any
// of the right side lanes
var player = new Car('car-blue.png', 2);
// Set width and position of player vehicle
player.elem.style.width = 'see PLAYER_* constants defined above' + '%';
player.elem.style.top = 1e10 + '%';
player.elem.style.left = 1e10 + '%';
player.elem.style.zIndex = 10000;  // player's car is always te closest


// === Event-driven programming ===
// These keyCodes from http://unixpapa.com/js/key.html
var KEY_LEFT_ARROW = 37,    // Why don't we hardcode these values?
    KEY_UP_ARROW = 38,      // Why do we use named variables?
    KEY_RIGHT_ARROW = 39;   // (Hint: magic numbers)

// The function that handles keypress events
function event_handler(event) {
  // Get current player's left offset
  var left_offset; // TODO
  // Depending on what key was pressed, do...
	switch (event.keyCode) {
    case KEY_LEFT_ARROW:
      // If moving left...
      // Ensure we are inside the boundaries (MIN_LEFT_OFFSET)
      // TODO
      return;  // If not, just return
      // Set new player's position
      player.elem.style.left = left_offset - STEERING_DELTA + '%';
      // Moving may have caused switching a lane, so let's calculate
      // what lane the player is driving on.
      player.lane = closest_lane(left_offset);
      break;

    case KEY_RIGHT_ARROW:
      // All of the above, just the opposite direction
      break;

    case KEY_UP_ARROW:
      // Up arrow means acceleration, so play acceleration sound
      // TODO
      // Skip the timeout for game_loop and re-enter it immediately
      clearTimeout(timer);
      game_loop();
      break;
  }
}
// window.onkeydown is a function that gets called every time a keyboard key
// is pressed
// Let's override it:
window['onkeydown'] = event_handler;
// === /Event-driven programming ===

// Recalculate stuff (main game loop) every:
var loop_time = 1000;  // time in ms (miliseconds)
// Need a list to carry all active opponent vehicles
var cars = [];
// "Run game"
var timer = setTimeout(game_loop, loop_time);

// This function represents the main loop of the game. Each step of the game
// is a result of a single run of this function.
function game_loop() {
  var new_cars = [];
  // For every active car (from the cars list)
  for (...) {  // TODO
    // Test for collision with player's car
    if (...)  // TODO
      // If on the same lane and top_distance less than amount,
      // the cars have crashed. Game over.
      return game_over(cars[i]);
    // Move the car and test whether it is no longer visible
    if (...)      // if car is already behind player car
      remove(cars[i].elem);  // end it (remove its HTML element)
    else new_cars.push(cars[i]);  // otherwise, add to 'survivors' list
  }
  cars = new_cars;

  // Every so often...
  if (Math.random() > .9) {
    // Mark the lane of the last car as invalid so that the lanes are
    // more randomized
    // TODO*
    // Create a new car and add it to active cars list
    var car; // TODO
    cars.push(car);
  }

  // Increase score including give bonuses (e.g. for driving on the wrong
  // side of the road)
  // TODO
  
  // Make game pace faster and faster by decreasing loop_time by 1%,
  // but never have loop_time < 100ms
  loop_time = Math.max(100, .99 * loop_time);
  // Rerun game loop
  timer = setTimeout(game_loop, loop_time);
}

// When game over (called from game_loop), this happens
function game_over(collided_car) {
  // Stop the background 'engine humming' sound
  // TODO
  // If the car has crashed...
  // ...play the 'crash' sound
  // TODO
  // ...and change player's image
  // TODO
  // ...(fix width and position for the new image)
  // TODO
  // Clear game_loop timer, if it is accidentally running
  clearTimeout(timer);
  // Disable keyboard event listener
  // (the function we overrided, set it to null again)
  window.onkeydown = null;
}

// Computation object, hosts computation functions
// All computations are a function of topOffset:
// - leftOffset depends on lane index and topOffset
// - car width depends only on topOffset
var compute = {
  'left': {
    0: function (top_offset) { return -1.4 * top_offset + 112.8; },
    1: function (top_offset) { return -0.6153846153846154 * top_offset + 77.88461538461539; },
    2: function (top_offset) { return 0.16923076923076924 * top_offset + 42.96923076923077; },
    3: function (top_offset) { return 0.8769230769230769 * top_offset + 11.476923076923079; }
  },
  'width': function (top_offset) { return 0.38461538461538464 * top_offset - 16.615384615384617; }  // player_width = 13
};

// Return top offset difference between two HTML elements (e.g. two cars)
function top_distance(elem1, elem2) {
  return Math.abs(parseFloat(elem1.style.top) - ...); // TODO
}

// Return lane closest to car's current left_offset
function closest_lane(left_offset) {
  var min_offset = Infinity,
      min_lane = 0,
      lane_offsets = closest_lane.lane_offsets;
  // Structure of FOR-loop:
  // for (initialization ; condition ; after each iteration)
  //       |                |           |
  //       |       this condition is    |_ this is done once after every
  //       |       evaluated *before*        iteration
  //       |        every iteration
  //       |
  //       |_ before entering loop, do this (e.g. initialize variable i=0)
  //
  // So:
  for (var i=0; i<lane_offsets.length; ++i) {
    // Run i from 0 to lane_offsets.length
    // For each value of i execute the following code:

    // Calculate the distance to lane_offsets[i]
    var offset = Math.abs(lane_offsets[i] - left_offset);
    // If this is the minimal distance...
    if (offset < min_offset) {
      // ...remember it (for later comparison)
      min_offset = offset;
      // And remember the i (which is the lane index)
      min_lane = i;
    }
  }
  // Return the i (lane index), which had the minimum distance
  return min_lane
}
// Precompute lane offsets
closest_lane.lane_offsets = [
  compute.left[0](PLAYER_TOP_OFFSET),
  compute.left[1](PLAYER_TOP_OFFSET),
  compute.left[2](PLAYER_TOP_OFFSET),
  compute.left[3](PLAYER_TOP_OFFSET)
];

function play_sound(file) {
  // Get all <audio> elements from sounds <div>
  var sounds = document.getElementById('sounds').getElementsByTagName('audio');
  // Run through all of them, and check...
  for (...) {
    // If file name matches any src attribute
    if (sounds[i].src.indexOf(file) != -1) {
      // If so, pause it, seek to 0, and play.
      sounds[i].pause();
      sounds[i].currentTime = 0;
      // TODO
    }
  }
}

function remove(element) {
  // Remove the element 'element' from DOM (HTML)
  return element.parentNode.removeChild(element);
}
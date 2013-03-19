var PLAYER_TOP_OFFSET = 77,   // Default properties of player vehicle
    PLAYER_LEFT_OFFSET = 56,  // All values in % screen width/height
    PLAYER_WIDTH = 13,
    PLAYER_HEIGHT = 6;

var MAX_ROAD_LANE = 3,    // Road lanes (total 4) start at 0 = leftmost
    MIN_CAR_SPEED = .95,  // Opponent cars speed, unit is % of screen height
    MAX_CAR_SPEED = 1,
    STEERING_DELTA = 3,   // % of screen width that player moves on keypress
    MIN_LEFT_OFFSET = 2,  // Edge offset, % of screen width
    MAX_LEFT_OFFSET = 84;

// This is the div we put the score in...
var score = document.getElementById('score');
// ...like this:
function increase_score() {
  score.innerHTML = parseInt(score.innerHTML) + 1;
}

// Return a random number (real value) between [min, max]
function random_between(min, max) {
  // Math.random() returns a real value between [0, 1]
  return Math.random() * (max - min) + min;
}

function Car(model, lane, invalid_lane) {
  // Every Car has its speed
  this.speed = random_between(MIN_CAR_SPEED, MAX_CAR_SPEED);
  // Every Car drives on one of the four lanes
  do this.lane = lane || Math.round(random_between(0, MAX_ROAD_LANE));
  while (invalid_lane && this.lane == invalid_lane);
  // Cars on the left two lanes are facing 'forwards', and cars on the
  // right two lanes are facing 'backwards'.
  var side = 'back';
  if (this.lane <= 1) {
    side = 'front';
    this.speed = 3;
  }
  // Create a HTML <img> element
  this.elem = document.createElement('img');
  // Set its src to any (or specific) model
  // (if model is undefined, pick at random)
  model = model || ('car-' + side + Math.round(random_between(1, 8)) + '.png')
  this.elem.setAttribute('src', model);
  // Set initial size and position of car
  this.elem.style.width = '0.5%';
  this.elem.style.top = '44.5%';
  this.elem.style.left = '50.5%';
  this.elem.style.zIndex = 1;  // how close in the z-dimension the object is
  // Insert above created <img> HTML element into document
  document.body.appendChild(this.elem);
}
// Cars move...
Car.prototype.move = function () {
  // ...so each Car has a method 'move' (this function)
  // 'Moving' here means just increasing the offset from the top of the screen
  // On every iteration, we increase the offset by car's speed:
  var top_offset = parseFloat(this.elem.style.top) + this.speed;
  this.elem.style.top = top_offset + '%';
  // Additionally, car's left offset and size also change with regard to
  // increased top offset
  this.elem.style.left = compute.left[this.lane](top_offset) + '%';
  this.elem.style.width = compute.width(top_offset) + '%';
  // Z-index increases by 1
  this.elem.style.zIndex = parseInt(this.elem.style.zIndex) + 1;
  // return true if car is already past player car, e.g. 'we left it behind'
  return top_offset >= PLAYER_TOP_OFFSET
}

// Create player vehicle, pick a model (picture file), and set it on any
// of the right side lanes
var player = new Car('car-blue.png', 2);
// Set width and position of player vehicle
player.elem.style.width = PLAYER_WIDTH + '%';
player.elem.style.top = PLAYER_TOP_OFFSET + '%';
player.elem.style.left = PLAYER_LEFT_OFFSET + '%';
player.elem.style.zIndex = 10000;  // player's car is always te closest


// === Event-driven programming ===
// These keyCodes from http://unixpapa.com/js/key.html
var KEY_LEFT_ARROW = 37,    // Why don't we hardcode these values?
    KEY_UP_ARROW = 38,      // Why do we use named variables?
    KEY_RIGHT_ARROW = 39;   // (Hint: magic numbers)

// The function that handles keypress events
function event_handler(event) {
  // Get current player's left offset
  var left_offset = parseFloat(player.elem.style.left);
  // Depending on what key was pressed, do...
	switch (event.keyCode) {
    case KEY_LEFT_ARROW:
      // If moving left...
      // Ensure we are inside the boundaries
      if (left_offset <= MIN_LEFT_OFFSET)
        return;  // If not, just return doing nothing
      // Set new player's position
      player.elem.style.left = left_offset - STEERING_DELTA + '%';
      // Moving may have caused switching a lane, so let's calculate
      // what lane the player is driving on.
      player.lane = closest_lane(left_offset);
      break;

    case KEY_RIGHT_ARROW:
      // All of the above, just the opposite direction
      if (left_offset >= MAX_LEFT_OFFSET) return;
      player.elem.style.left = left_offset + STEERING_DELTA + '%';
      player.lane = closest_lane(left_offset);
      break;

    case KEY_UP_ARROW:
      // Up arrow means acceleration
      play_sound('accel');
      // Skip the timeout for game_loop and re-enter it immediately
      clearTimeout(timer);
      game_loop();
      increase_score();  // bonus for accelerated driving
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
  for (var i=0; i<cars.length; ++i) {
    // Test for collision with player's car
    if (cars[i].lane == player.lane &&
        top_distance(cars[i].elem, player.elem) < 5)
      // If on the same lane and top_distance less than amount,
      // the cars have crashed. Game over.
      return game_over(cars[i]);
    // Move the car and test whether it is no longer visible
    if (cars[i].move())      // if car is already behind player car
      remove(cars[i].elem);  // end it (remove its HTML element)
    else new_cars.push(cars[i]);  // otherwise, add to 'survivors' list
  }
  cars = new_cars;

  // Every so often...
  if (Math.random() > .9) {
    // Mark the lane of the last car as invalid so that the lanes are
    // more randomized
    var invalid_lane = cars.length && cars[cars.length - 1].lane || null;
    // Create a new car and add it to active cars list
    var car = new Car(null, null, invalid_lane);
    cars.push(car);
  }

  // Increase score including give bonuses
  increase_score();
  if (player.lane <= MAX_ROAD_LANE / 2)
    increase_score();  // bonus for driving on the wrong side of the road
  
  // Make game pace faster and faster by decreasing loop_time by 1%,
  // but never have loop_time < 100ms
  loop_time = Math.max(100, .99 * loop_time);
  // Rerun game loop
  timer = setTimeout(game_loop, loop_time);
}

// When game over (called from game_loop), this happens
function game_over(collided_car) {
  // Stop the background 'engine humming' sound
  remove(document.getElementById('bgsound'));
  // If the car has crashed...
  // ...play the 'crash' sound
  play_sound('crash');
  // ...and change player's image
  player.elem.setAttribute('src', 'car-crash.png');
  // ...(fix width and position for the new image)
  player.elem.style.width = PLAYER_WIDTH + 13 + '%';
  player.elem.style.left = parseFloat(player.elem.style.left) - 5 + '%';
  // Clear game_loop timer, if it is accidentally running
  clearTimeout(timer);
  // Disable keyboard event listener
  window.onkeydown = null;
}

// Used to calculate coefficients in 'compute'
function calculate_k_n(p1, p2) {
  var x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
  var k = (y2 - y1) / (x2 - x1);
  var n = y1 - k * x1;
  return [k, n];
}

// Computation object, hosts computation functions
// All computations are a function of topOffset:
// - leftOffset depends on lane index and topOffset
// - car width depends only on topOffset
var compute = {
  'left': {
    0: function (top_offset) { return -1.4 * top_offset + 112.8; },  // [44.5, 50.5], [77, 5]
    1: function (top_offset) { return -0.6153846153846154 * top_offset + 77.88461538461539; },  // [44.5, 50.5], [77, 30.5]
    2: function (top_offset) { return 0.16923076923076924 * top_offset + 42.96923076923077; },  // [44.5, 50.5], [77, 56]
    3: function (top_offset) { return 0.8769230769230769 * top_offset + 11.476923076923079; }  // [44.5, 50.5], [77, 79]
  },
  'width': function (top_offset) { return 0.38461538461538464 * top_offset - 16.615384615384617; }  // [44.5, 0.5], [77, 13]
};

// Return top offset difference between two HTML elements (e.g. two cars)
function top_distance(elem1, elem2) {
  return Math.abs(parseFloat(elem1.style.top) - parseFloat(elem2.style.top));
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
  // Run through them, and check...
  for (var i=0; i<sounds.length; ++i) {
    // If src matches file name
    if (sounds[i].src.indexOf(file) != -1) {
      // If so, pause it, seek to 0, and play.
      sounds[i].pause();
      sounds[i].currentTime = 0;
      return sounds[i].play();
    }
  }
}

function remove(element) {
  // Remove the element 'element' from DOM (HTML)
  return element.parentNode.removeChild(element);
}

// Preload images...
(new Image()).src = 'car-crash.png';
(new Image()).src = 'car-blue.png';
for (var i=1; i<9; ++i) {
  (new Image()).src = 'car-back' + i + '.png';
  (new Image()).src = 'car-front' + i + '.png';
}
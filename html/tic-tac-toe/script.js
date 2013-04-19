var symbol = 'x';
var is_players_turn = true;

function nextSymbol() {
  return symbol = 'x' == symbol ? 'o' : 'x';
}

var playerLines, computerLines;
var buttons = document.getElementById('playing-field').getElementsByTagName('button');

var button_lines = { // translation table
  0: [0, 3, 6],
  // ...
};

var line_buttons = { // inverse translation of button_lines
  // ...
}

function setLabel(button, label) {
  button.innerHTML = label;
}

function endGame(message, winline) {
  alert(message);
}

function checkIfWinState() {
}

function switchPlayer() {
  is_players_turn = ! is_players_turn;
}

function clickButton(button) {
  var index = button.getAttribute('value');

  // click causes some changes
  // set the new button label: either 'x' or 'o'
  setLabel(...);
  // set button to disabled, so it can't be clicked again
  ...
  // mark the spot in internal model
  var whosLines = ;
  for (var i=0; i<button_lines[index].length; ++i)
    whosLines[button_lines[index][i]] += 1;
  
  // ...
}

function init() {
  playerLines = [0, 0, 0, 0, 0, 0, 0, 0];
  computerLines = [0, 0, 0, 0, 0, 0, 0, 0];
  for (var i=0; i<buttons.length; ++i) {
    buttons[i].innerHTML = '';
    buttons[i].style.background = 'transparent';
  }
}

init(); // START HERE


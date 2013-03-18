var symbol = 'x';
var is_players_turn = true;

function nextSymbol() {
  return symbol = 'x' == symbol ? 'o' : 'x';
}

function computer_decision() {
  
}

var playerLines, computerLines;
var buttons = document.getElementById('playing-field').getElementsByTagName('button');

var button_lines = { // translation table
  0: [0, 3, 6],
  1: [0, 4],
  2: [0, 5, 7],
  3: [1, 3],
  4: [1, 4, 6, 7],
  5: [1, 5],
  6: [2, 3, 7],
  7: [2, 4],
  8: [2, 5, 6]
};

var line_buttons = {  // inverse translation of button_lines
  0: [0, 1, 2],
  1: [3, 4, 5],
  2: [6, 7, 8],
  3: [0, 3, 6],
  4: [1, 4, 7],
  5: [2, 5, 8],
  6: [0, 4, 8],
  7: [2, 4, 6]
}

function setLabel(button, label) {
  button.innerHTML = label;
}

function endGame(message, winline) {
  for (var i=0; i<line_buttons[winline].length; ++i)
    buttons[line_buttons[winline][i]].style.background = 'lightgreen';
  alert(message);
  init(); // restart
}

function checkIfWinState() {
  for (var i=0; i<playerLines.length; ++i)
    if (playerLines[i] == 3)
      endGame('Player wins!', i);
  for (var i=0; i<computerLines.length; ++i)
    if (computerLines[i] == 3)
      endGame('Computer wins!', i);
}

function switchPlayer() {
  // Uncomment when we have a working computer_decision()
  // if (is_players_turn) {
    // is_players_turn = false;
    // computer_decision();
    // is_players_turn = true;
  // } // and delete this ↓
  is_players_turn = ! is_players_turn;
}

function clickButton(button) {
  var index = button.getAttribute('value');

  // click causes some changes
  // set the new button label: either 'x' or 'o'
  setLabel(button, nextSymbol());
  // set button to disabled, so it can't be clicked again
  button.removeAttribute('onclick');
  // mark the spot in internal model
  var whosLines = is_players_turn ? playerLines : computerLines;
  for (var i=0; i<button_lines[index].length; ++i)
    whosLines[button_lines[index][i]] += 1;
  
  checkIfWinState();

  switchPlayer()
}

/* notsureifneed
function rowcol_to_index(row, col) { return row * 3 + col; }
function index_to_rowcol(value) {
  return {row: Math.round(value / 3),
          col: Math.round(value % 3)}
} */

function init() {
  playerLines = [0, 0, 0, 0, 0, 0, 0, 0];
  computerLines = [0, 0, 0, 0, 0, 0, 0, 0];
  for (var i=0; i<buttons.length; ++i) {
    buttons[i].innerHTML = '';
    buttons[i].style.background = 'transparent';
  }
}

init(); // START HERE


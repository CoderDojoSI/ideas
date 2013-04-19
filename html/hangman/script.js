
// A list of phrases, proverbs...
var phrases = [
  'Lastna hvala se pod mizo valja',
  'Po dežju posije sonce',
  'Kar seješ, to žanješ',
  'Rana ura, zlata ura',
  'Riba pri glavi smrdi',
  'Kuj železo dokler je vroče',
  'Pametnemu malo besed veliko pove',
  'Vsak je svoje sreče kovač',
  'Jabolko ne pade daleč od drevesa',
  'Vse se zmore, če se hoče',
  'Pomagaj si sam in bog ti bo pomagal',
  'V vinu je resnica',
  'Ura zamujena ne vrne se nobena',
  'Obleka ne naredi človeka',
  'Več glav več ve',
  'Lepa beseda lepo mesto najde',
  'Kdor čaka, dočaka',
  'Stoječa voda se usmradi',
  'Lonec lončarja hvali',
  'Pes, ki laja, ne grize',
  'Laž ima kratke noge',
  'Hudič v sili še muhe žre',
  'Tiha voda bregove dere',
  'Dobro blago se samo hvali',
  'Upogibaj drevo dokler je mlado',
  'Kdor vpraša, ne zaide'
];

function select_random_phrase(phrases) {
  // How to get random index on integer interval [0, phrases.length - 1]
  // from Math.random() which returns a real value on [0, 1] ?
  return phrases[...];  // TODO
}

// Initialize variables
var secret, char_boxes, already_used,
    history = document.getElementById('used-letters'),
    gallows = document.getElementById('gallows');

function init() {
  // Set secret to random phrase from 'phrases'
  secret;  // TODO
  // Build HTML string representing char boxes
  var str = '';
  for (var i=0; i<secret.length; ++i)
    // Treat spaces separately (e.g. show by default)
    if (...)  // TODO
      str += '<span class="space"><b>&nbsp;</b></span>';
    // Display any _invalid_ characters (e.g. punctuation)
    else if (!is_valid_charCode(secret[i].charCodeAt(0)))
      str += '<span class="visible"><b>' + secret[i] + '</b></span>';
    // Else, add the character, but hidden (managed in CSS)
    else str += '<span><b>' + secret[i] + '</b></span>';
  // Add HTML string into document model
  // TODO
  // 'Grab' 'char boxes' into an array
  // TODO
  // Save secret string in lower case for easier comparison
  secret = secret.toLowerCase();
  // (Re)set defaults
  gallows.innerHTML = '';
  history.innerHTML = '';
  already_used = {};
  hangman.current = 0;
}

// === Event-driven programming ===
// Return true if charCode is of a valid letter
function is_valid_charCode(charCode) {
  // Reference decimal values at
  // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
  return false; // TODO
}
window.onkeypress = function (event) {
  var charCode = event.charCode;
  // If charCode is not valid, return
  // TODO
  // Convert charCode into printable Unicode character
  var char = String.fromCharCode(event.charCode).toLowerCase();
  // If char 'char' was already considered, return
  // TODO
  // Otherwise, mark 'char' as used
  // TODO

  // Test if char is present in the secret phrase...
  for (...)  // TODO
    if (...) {  // TODO
      // ...if so, mark its box as visible
      char_boxes[i].style.visibility = 'visible';
    }

  // If char WAS present in the secret phrase...
  if (...) {  // TODO
    // ...add it to history
    // TODO
    // Check whether all char boxes are now visible (=> Success!)
    // TODO
  } else {
    // ...otherwise, add it to history striked-through
    history.innerHTML += '<del>' + char + '</del>, ';
    // ...and draw the next hangman
    // TODO
    // If this is the last hangman, game over
    // TODO
  }
}
// === /Event-driven programming ===

function is_game_success() {
  function is_hidden(element) {
    return window.getComputedStyle(element).getPropertyValue('visibility') != 'visible';
  }
  // If ALL char boxes are visible, game win!
  // TODO
  return false;
}

var hangman = [
'\n\
\n\
\n\
\n\
\n\
\n\
_______',
'\n\
\n\
\n\
\n\
\n\
   _\n\
__/_\\__',
'\n\
   |\n\
   |\n\
   |\n\
   |\n\
   |\n\
__/_\\__',
'   ______\n\
   |\n\
   |\n\
   |\n\
   |\n\
   |\n\
__/_\\__',
'   ______\n\
   | /\n\
   |/\n\
   |\n\
   |\n\
   |\n\
__/_\\__',
'   ______\n\
   | /  |\n\
   |/\n\
   |\n\
   |\n\
   |\n\
__/_\\__',
'   ______\n\
   | /  |\n\
   |/   0\n\
   |   /I\\\n\
   |   / \\\n\
   |\n\
__/_\\__'
];
hangman.current = 0;  // Index of the current hangman 'image' / state


init();


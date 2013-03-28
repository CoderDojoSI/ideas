
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
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Initialize variables
var secret, char_boxes, already_used,
    history = document.getElementById('used-letters'),
    gallows = document.getElementById('gallows');

function init() {
  // Set secret to random phrase from 'phrases'
  secret = select_random_phrase(phrases);
  // Build HTML string representing char boxes
  var str = '';
  for (var i=0; i<secret.length; ++i)
    // Treat spaces separately (e.g. show by default)
    if (secret[i] == ' ')
      str += '<span class="space"><b>&nbsp;</b></span>';
    // Display any _invalid_ characters (e.g. punctuation)
    else if (!is_valid_charCode(secret[i].charCodeAt(0)))
      str += '<span class="visible"><b>' + secret[i] + '</b></span>';
    // Else, add the character, but hidden
    else str += '<span><b>' + secret[i] + '</b></span>';
  // Add HTML string into document model
  document.getElementById('secret-phrase').innerHTML = str;
  // 'Grab' 'char boxes' into an array
  char_boxes = document.getElementById('secret-phrase').getElementsByTagName('b');
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
  return  65 <= charCode && charCode <= 90  ||
          97 <= charCode && charCode <= 122 ||
          127 < charCode;
}
window.onkeypress = function (event) {
  var charCode = event.charCode;
  // If charCode is not valid, return
  if (!is_valid_charCode(charCode)) return;
  // Convert charCode into printable Unicode character
  var ch = String.fromCharCode(charCode).toLowerCase();
  // If char 'char' was already considered, return
  if (ch in already_used) return;
  // Otherwise, mark 'char' as used
  already_used[ch] = true;

  // Test if char is present in the secret phrase...
  var have_match = false;
  for (var i=0; i<secret.length; ++i)
    if (secret[i] == ch) {
      // ...if so, mark its box as visible
      char_boxes[i].style.visibility = 'visible';
      have_match = true;
    }

  // If char WAS present in the secret phrase...
  if (have_match) {
    // ...add it to history
    history.innerHTML += ch + ', ';
    // Check whether all char boxes are now visible (=> Success!)
    if (is_game_success())
      return alert('Bravo!');
  } else {
    // ...otherwise, add it to history striked-through
    history.innerHTML += '<del>' + ch + '</del>, ';
    // ...and draw the next hangman
    gallows.innerHTML = hangman[hangman.current++];
    // If this is the last hangman, game over
    if (hangman.current == hangman.length) {
      alert('Game over!');
      init();
    }
  }
}
// === /Event-driven programming ===

function is_game_success() {
  function is_hidden(element) {
    return window.getComputedStyle(element).getPropertyValue('visibility') != 'visible';
  }
  // If ALL boxes are visible, game win!
  for (var i=0; i<char_boxes.length; ++i)
    if (is_hidden(char_boxes[i]))  // ...otherwise
      return false;
  return true;
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


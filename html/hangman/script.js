
var phrases = 'Prazna hvala se pod mizo valja\n\
Po dežju posije sonce'.split('\n');

function select_random_phrase(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

var secret, chars, used,
    used_div = document.getElementById('used-letters'),
    gallows_div = document.getElementById('gallows');

function init() {
  secret = select_random_phrase(phrases);
  var str = '';
  for (var i=0; i<secret.length; ++i)
    if (secret[i] == ' ')
      str += '<span class="space"><b>&nbsp;</b></span>';
    else
      str += '<span><b>' + secret[i] + '</b></span>';
  document.getElementById('secret-phrase').innerHTML = str;
  chars = document.getElementById('secret-phrase').getElementsByTagName('b');
  secret = secret.toUpperCase();
  gallows_div.innerHTML = '';
  used_div.innerHTML = '';
  used = {};
  current = 0;
}
init();

function code_to_char(keyCode) {
  var sumniki = {186:'Č', 219:'Š', 220:'Ž'};
  if (keyCode >= 65 && keyCode <= 90)
    return String.fromCharCode(keyCode);
  else if (keyCode in sumniki)
    return sumniki[keyCode]
  else
    return null
}
window.onkeydown = function (event) {
  var char = code_to_char(event.keyCode || event.which);
  if (! char)
    return;
  var no_match = true;
  for (var i=0; i<secret.length; ++i)
    if (secret[i] == char) {
      chars[i].style.visibility = 'visible';
      no_match = false;
    }
  if (char in used)
    return;
  used[char] = true;
  if (no_match) {
    used_div.innerHTML += '<del>' + char + '</del> ';
    // draw next hangman
    gallows_div.innerHTML = hangman[current++];
    if (current == hangman.length) {
      alert('Game over!');
      init();
    }
  } else {
    used_div.innerHTML += char + ', ';
  }
}

var current = 0;
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
\n\
__/_\\__',
'\n\
   |\n\
   |\n\
   |\n\
   |\n\
   |\n\
__/|\\__',
'   ______\n\
   |\n\
   |\n\
   |\n\
   |\n\
   |\n\
__/|\\__',
'   ______\n\
   | /\n\
   |/\n\
   |\n\
   |\n\
   |\n\
__/|\\__',
'   ______\n\
   | /  |\n\
   |/\n\
   |\n\
   |\n\
   |\n\
__/|\\__',
'   ______\n\
   | /  |\n\
   |/   0\n\
   |   /|\\\n\
   |   / \\\n\
   |\n\
__/|\\__'
];

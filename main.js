// eslint-disable-next-line import/extensions
import data from './data.js';

const { keyCode } = data;
const { engKey } = data;
const { rusKey } = data;

const title = document.createElement('h2');
title.innerHTML = 'Mac Virtual Keyboard';
const h2 = document.createElement('h2');
h2.innerHTML = 'Press Control + Command to change the interface language';
const input = document.createElement('textarea');
input.className = 'textarea';
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(title, h2, input, keyboard);

for (let i = 0; i < 5; i += 1) {
  keyboard.insertAdjacentHTML('beforeend', '<div class="line"></div>');
  const current = document.getElementsByClassName('line');
  for (let n = 0; n < engKey[i].length; n += 1) {
    current[i].insertAdjacentHTML(
      'beforeend',
      `<div id=${keyCode[i][n]} class="button">${engKey[i][n]}</div>`,
    );
  }
}

const buttons = document.getElementsByClassName('button');
for (let i = 0; i < buttons.length; i += 1) {
  // eslint-disable-next-line no-use-before-define
  buttons[i].addEventListener('click', metaKeysEvents);
}

let rus = false;
let flag = false;
let key = false;

function russianLanguage() {
  rus = true;
  localStorage.setItem('rus', rus);
  for (let i = 0; i < 5; i += 1) {
    let current = document.getElementsByClassName('line');
    current = current[i].children;
    for (let n = 0; n < engKey[i].length; n += 1) {
      current[n].innerHTML = rusKey[i][n];
    }
  }
  if (flag) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].id.slice(0, 3) === 'Key') {
        buttons[i].innerHTML = buttons[i].innerHTML.toUpperCase();
      }
    }
    buttons[0].innerHTML = buttons[0].innerHTML.toUpperCase();
    buttons[25].innerHTML = buttons[25].innerHTML.toUpperCase();
    buttons[26].innerHTML = buttons[26].innerHTML.toUpperCase();
    buttons[38].innerHTML = buttons[38].innerHTML.toUpperCase();
    buttons[39].innerHTML = buttons[39].innerHTML.toUpperCase();
    buttons[49].innerHTML = buttons[49].innerHTML.toUpperCase();
    buttons[50].innerHTML = buttons[50].innerHTML.toUpperCase();
  }
}

function englishLanguage() {
  rus = false;
  localStorage.setItem('rus', rus);
  for (let i = 0; i < 5; i += 1) {
    let current = document.getElementsByClassName('line');
    current = current[i].children;
    for (let n = 0; n < engKey[i].length; n += 1) {
      current[n].innerHTML = engKey[i][n];
    }
  }
  if (flag) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].id.slice(0, 3) === 'Key') {
        buttons[i].innerHTML = buttons[i].innerHTML.toUpperCase();
      }
    }
  }
}

const saveLanguage = localStorage.getItem('rus');
if (saveLanguage === 'true') {
  russianLanguage();
} else {
  englishLanguage();
}

const changeLanguage = new Set();

document.addEventListener('keydown', (event) => {
  key = true;
  buttons[event.code].click();
  if (event.code === 'ControlLeft' || event.metaKey) {
    changeLanguage.add(event.code);
    // eslint-disable-next-line no-implied-eval
    setTimeout('changeLanguage.clear()', 100);
    if (changeLanguage.size === 2) {
      if (!rus) { russianLanguage(); } else { englishLanguage(); }
      changeLanguage.clear();
    }
  }
});

function backColor(a) {
  const b = a;
  b.style = 'color: white; background-color: black;';
}

function backColorSpace(a) {
  const b = a;
  b.style = 'color: black; background-color: black;';
}

function metaKeysEvents() {
  const elem = this;
  switch (this.innerHTML) {
    case 'ENG':
      englishLanguage();
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      input.focus();
      break;
    case 'РУС':
      russianLanguage();
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      input.focus();
      break;
    case 'Backspace':
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      input.focus();
      if (key) {
        break;
      }
      input.value = input.value.slice(0, -1);
      break;
    case 'Space':
      this.style = 'color: white; background-color: white;';
      setTimeout(backColorSpace, 100, elem);
      input.focus();
      if (key) {
        break;
      }
      input.value += ' ';
      break;
    case 'Tab':
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      input.focus();
      if (key) {
        break;
      }
      input.value += '   ';
      break;
    case 'caps lock':
      if (!flag) {
        flag = true;
        this.style = 'color: black; background-color: white;';
        for (let i = 0; i < buttons.length; i += 1) {
          if (buttons[i].id.slice(0, 3) === 'Key') {
            buttons[i].innerHTML = buttons[i].innerHTML.toUpperCase();
          }
        }
        if (rus) {
          buttons[0].innerHTML = buttons[0].innerHTML.toUpperCase();
          buttons[25].innerHTML = buttons[25].innerHTML.toUpperCase();
          buttons[26].innerHTML = buttons[26].innerHTML.toUpperCase();
          buttons[38].innerHTML = buttons[38].innerHTML.toUpperCase();
          buttons[39].innerHTML = buttons[39].innerHTML.toUpperCase();
          buttons[49].innerHTML = buttons[49].innerHTML.toUpperCase();
          buttons[50].innerHTML = buttons[50].innerHTML.toUpperCase();
        }
      } else if (flag) {
        flag = false;
        this.style = 'color: white; background-color: black;';
        for (let i = 0; i < buttons.length; i += 1) {
          if (buttons[i].id.slice(0, 3) === 'Key') {
            buttons[i].innerHTML = buttons[i].innerHTML.toLowerCase();
          }
        }
        if (rus) {
          buttons[0].innerHTML = buttons[0].innerHTML.toLowerCase();
          buttons[25].innerHTML = buttons[25].innerHTML.toLowerCase();
          buttons[26].innerHTML = buttons[26].innerHTML.toLowerCase();
          buttons[38].innerHTML = buttons[38].innerHTML.toLowerCase();
          buttons[39].innerHTML = buttons[39].innerHTML.toLowerCase();
          buttons[49].innerHTML = buttons[49].innerHTML.toLowerCase();
          buttons[50].innerHTML = buttons[50].innerHTML.toLowerCase();
        }
      }
      input.focus();
      break;
    case 'Enter':
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      if (key) {
        break;
      }
      input.value += '\n';
      input.focus();
      break;
    case 'Shift':
    case 'option':
    case 'MetaLeft':
    case 'ControlLeft':
      this.style = 'color: white; background-color: black;';
      setTimeout(backColor, 100, elem);
      break;
    default:
      this.style = 'color: black; background-color: white;';
      setTimeout(backColor, 100, elem);
      input.focus();
      if (key) {
        break;
      }
      input.value += this.innerHTML;
      break;
  }
  key = false;
}

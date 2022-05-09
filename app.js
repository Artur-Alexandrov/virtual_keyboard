const textarea = document.createElement('textarea');
document.body.appendChild(textarea);
textarea.classList.add('area');
textarea.classList.add('keyboard_input');

const Keyboard = {
  elements: {
    main: null,
    KeysContainer: null,
    keys: [],

  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.KeysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.KeysContainer.classList.add('keyboard__keys');
    this.elements.KeysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.KeysContainer.querySelectorAll('.keyboard__key');

    // Add to Dom
    this.elements.main.appendChild(this.elements.KeysContainer);
    document.body.appendChild(this.elements.main);

    // Printing input in textarea
    document.querySelectorAll('.keyboard_input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '↑', 'Shift',
      'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Win', '←', '↓', '→', 'Ctrl',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'Del', 'Enter', 'Shift'].lastIndexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      // Add keypress interactive
      keyElement.onkeydown = () => {
        keyElement.style.backgroundColor = '#0202f8f9';
      };
      keyElement.onkeyup = () => {
        keyElement.style.backgroundColor = '#4805f0';
      };
      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'Backspace';
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          keyElement.addEventListener('Backspace', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'Del':

          keyElement.innerText = 'Del';
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(1, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          keyElement.addEventListener('keydown', (e) => {
            if (e.key === 'Delete') {
              this.properties.value = this.properties.value.substring(1, this.properties.value.length - 1);
              this.triggerEvent('oninput');
            }
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'CapsLock';
          keyElement.addEventListener('click', () => {
            this.toggleCaps();
            keyElement.classList.toggle(this.properties.capsLock);
          });
          keyElement.addEventListener('keyup', (e) => {
            if (e.key === 'CapsLock') {
              this.toggleCaps();
              keyElement.classList.toggle(this.properties.capsLock);
            } else {
              this.toggleCaps();
              keyElement.classList.toggle(this.properties.capsLock);
            }
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'Enter';
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          keyElement.addEventListener('Enter', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });
          keyElement.addEventListener(' ', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });
          break;

        case 'Tab':
          keyElement.innerText = 'Tab';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case 'Ctrl':
          keyElement.innerText = 'Ctrl';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case 'Win':
          keyElement.innerText = 'Win';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case 'Alt':
          keyElement.innerText = 'alt';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case '→':
          keyElement.innerText = '→';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case '←':
          keyElement.innerText = '←';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case '↓':
          keyElement.innerText = '↓';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;
        case '↑':
          keyElement.innerText = '↑';
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerEvent('oninput');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'Shift';

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'Shift';

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
          });
          break;
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCaps() {
    this.properties.capsLock = !this.properties.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.innerHTML.length === 1) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

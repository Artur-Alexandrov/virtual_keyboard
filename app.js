const textarea = document.createElement("textarea")
document.body.appendChild(textarea)
textarea.classList.add("area");

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
        value: "", 
        capsLock: false,
    },

    init() {
        //create main elements
        this.elements.main = document.createElement("div")
        this.elements.KeysContainer = document.createElement("div")
        
        //setup main elements
        this.elements.main.classList.add("keyboard")
        this.elements.KeysContainer.classList.add("keyboard__keys")
        this.elements.KeysContainer.appendChild(this.createKeys())

        this.elements.keys = this.elements.KeysContainer.querySelectorAll(".keyboard__key");

        //Add to Dom
        this.elements.main.appendChild(this.elements.KeysContainer);
        document.body.appendChild(this.elements.main);
    },

    createKeys() {
        const fragment = document.createDocumentFragment()
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "↑", "Shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "Win", "←", "↓", "→", "Ctrl" 
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "Del", "Enter", "Shift"].lastIndexOf(key) !== -1;
        
            
            //Add attributes/classes
            keyElement.setAttribute("type", "button")
            keyElement.classList.add("keyboard__key")

            switch (key) {
                
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide")
                    keyElement.innerText = "Backspace";
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value - 1)
                        this.triggerEvent("oninput")
                    })
                    keyElement.addEventListener("event.key === 'Backspace'", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value - 1)
                        this.triggerEvent("oninput")
                    })
                    break;

                    case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
                        keyElement.innerText = "CapsLock";
                        keyElement.addEventListener("click", () => {
                            this.toggleCaps();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                        })
                        keyElement.addEventListener("event.key === 'CapsLock'", () => {
                            this.toggleCaps();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                        })
                    break;

                    case "Enter":
                        keyElement.classList.add("keyboard__key--wide")
                        keyElement.innerText = "Enter";
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                        keyElement.addEventListener("event.key === 'Enter'", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                    break;

                    case "space":
                        keyElement.classList.add("keyboard__key--extra-wide")
                        keyElement.addEventListener("click", () => {
                            this.properties.value += " "
                            this.triggerEvent("oninput")
                        })
                        keyElement.addEventListener("event.key === ' '", () => {
                            this.properties.value += " "
                            this.triggerEvent("oninput")
                        })
                    break;

                    case "shift":
                        keyElement.classList.add("keyboard__key--wide")
                        keyElement.innerText = "Shift";
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                        keyElement.addEventListener("event.key === 'Shift'", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                    break;

                    case "Shift":
                        keyElement.classList.add("keyboard__key--wide")
                        keyElement.innerText = "Shift";
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                        keyElement.addEventListener("event.key === 'Shift'", () => {
                            this.properties.value += "\n"
                            this.triggerEvent("oninput")
                        })
                    break;

                    default:
                        keyElement.textContent = key.toLowerCase();
                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.triggerEvent("oninput")
                        })
                    break; 

                }
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        })
        return fragment;        
    },

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCaps() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            
            
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
            
        
        }
    }

}

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
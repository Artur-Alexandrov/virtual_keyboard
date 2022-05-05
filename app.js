const Keyboard = {
    elements: {
        main: null,
        KeysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null, 
        onclose: null,
    },

    properties: {
        value: "", 
        capsLock: false
    },

    init() {
        //create main elements
        this.elements.main = document.createElement("div")
        this.elements.KeysContainer = document.createElement("div")
        
        //setup main elements
        this.elements.main.classList.add("keyboard", "1.keyboard__hidden")
        this.elements.KeysContainer.classList.add("keyboard__keys")
        this.elements.KeysContainer.appendChild(this.createKeys())

        //Add to Dom
        this.elements.main.appendChild(this.elements.KeysContainer);
        document.body.appendChild(this.elements.main);
    },

    createKeys() {
        const fragment = document.createDocumentFragment()
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "↑", "shift",
            "ctrl", "win", "alt", "space", "alt", "←", "↓", "→", "ctrl" 
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "shift", "ctrl"].lastIndexOf() !== -1;
        

        //Add attributes/classes
        keyElement.setAttribute("type", "button")
        keyElement.classList.add("keyboard__key")

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide")
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
                        keyElement.addEventListener("click", () => {
                            this.toggleCaps();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                        })
                        keyElement.addEventListener("event.key === 'CapsLock'", () => {
                            this.toggleCaps();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                        })
                    break;

                    case "enter":
                        keyElement.classList.add("keyboard__key--wide")
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

                    default:
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

    triggerEvent(handlerNane) {
        console.log(handlerNane)
    },

    toggleCaps() {
        console.log("caps toggled!")
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    },
}

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
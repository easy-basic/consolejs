import Prompt from './prompt';
import HistoryManager from './history';
import Drawing from './drawing';

class Terminal {
    constructor(element, options = {}) {
        if (typeof element == 'string') {
            element = document.querySelector(element);
        }

        this.container = element;
        this.container.innerHTML = '<pre><span class="text"></span><span class="prompt"></span></pre>';
        this.console = this.container.querySelector('.text');

        this.defaultColor = options.color || '#333';
        this.background = options.background || '#fff';
        this.write(options.header || '');

        this.listeners = new Map();
        this.prompt = new Prompt(this, options);
        this.history = new HistoryManager();
        this.draw = new Drawing(this);
    }

    addEventListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    removeEventListener(label, callback) {
        let isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    emit(label, data) {
        let listeners = this.listeners.get(label);

        for(var listener of listeners){
            listener(data);
        }
    }

    write(text, color) {
        text = text.toString();
        if (!color) color = this.defaultColor;
        for (var ch of text) {
            this.addToken(ch, color)
        }
    }

    addToken(ch, color, bg) {
        var span = document.createElement('span');
        span.style.color = color;
        span.style.backgroundColor = bg;
        span.innerText = ch;
        this.console.appendChild(span);
    }
}

window.Terminal = Terminal;
export default Terminal;
export default class Prompt {
    constructor(terminal, options = {}) {
        this.terminal = terminal;
        this.options = options;

        this.promptEl = terminal.container.querySelector('.prompt');
        this.terminal.container.addEventListener('focus', (e) => {
            this.focus();
        })

        document.querySelector('body').spellcheck = false;
    }

    init() {
        this.promptEl.innerHTML = `<span>${this.options.prompt || ''}</span>`
        this.prompt = document.createElement('span');
        this.prompt.contentEditable = true;
        this.prompt.innerText = '';
        this.promptEl.appendChild(this.prompt);
        this.is_hist = false;

        this.prompt.addEventListener('keydown', (e) => {
            this.onKey(e);
        })

        this.focus()
    }

    destroyPrompt() {
        this.promptEl.innerHTML = '';
        this.prompt = null;
    }

    focus() {
        if (this.prompt) {
            this.prompt.focus();
        }
    }

    onKey(e) {
        if (e.key == 'Enter') {
            var text = this.prompt.innerText;
            this.destroyPrompt();
            this.terminal.history.push(text);
            this.terminal.write(`${this.options.prompt || ''}${text}\n`)
            this.terminal.emit('onPrompt', text);
            return false
        }

        else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
            setTimeout(() => {
                if(!this.is_hist) this.crnt_text = this.prompt.innerText;

                var hist_text = e.key == 'ArrowDown'
                        ? this.terminal.history.getNext()
                        : this.terminal.history.getPrevious();

                if (hist_text && typeof hist_text =='string') {
                    this.prompt.innerText = hist_text;
                    this.is_hist = true;
                }

                else if(hist_text == -1){
                    this.prompt.innerText = this.crnt_text;
                    this.is_hist = false;
                }

                this._moveCaretToEnd();
            }, 10);
        }

        else{
            this.is_hist = false;
        }
    }

    _moveCaretToEnd() {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(this.prompt, 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
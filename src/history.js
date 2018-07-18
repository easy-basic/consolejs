export default class HistoryManager {
    constructor() {
        this.history = [];
        this.index = 0;
    }

    getNext() {
        if (this.index >= this.history.length-1){
            this.index ++;
            if(this.index >= this.history.length)
                this.index = this.history.length
            return -1;
        }
        return this.history[++this.index];
    }

    getPrevious() {
        if (this.index < 0) return false;
        var text = this.history[--this.index];
        if (this.index <= 0) this.index = 0;
        return text
    }

    push(text) {
        if(text) this.history.push(text);
        this.index++;
    }

    reset() {
        this.history = [];
    }
}
export default class Drawing {
    constructor(terminal) {
        this.terminal = terminal;
        this.canvas = document.createElement('canvas');
        this.terminal.container.appendChild(this.canvas);
        this.fitCanvas();
    }

    fitCanvas() {
        this.terminal.container.style.position = 'relative';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0;
        this.canvas.style.pointerEvents = 'none';
        this.canvas.width = this.terminal.container.offsetWidth;
        this.canvas.height = this.terminal.container.offsetHeight;

        window.onresize = () => {
            this.fitCanvas();
        }
    }
}
class MousePosition {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class MouseSelectionArea {
    public initialPos: MousePosition;
    public currentPos: MousePosition;
    public hidden: boolean;

    constructor(x1: number, y1: number, x2: number, y2: number, hidden: boolean) {
        this.initialPos = new MousePosition(x1, y1);
        this.currentPos = new MousePosition(x2, y2);
        this.hidden = hidden;
    }

    public getCoords() {
        return [this.initialPos.x, this.initialPos.y,
                this.currentPos.x, this.currentPos.y];
    }
}

class Fruit {
    public value: number;
    public x: number;
    public y: number;
    public selected: boolean;
    public defaultImage: HTMLImageElement;

    constructor(value: number, x: number, y: number) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.selected = false;
        /* Assign images based on value here */
        this.defaultImage = a1;
    }

    public draw(highlighted: boolean) {
        gameCanvasContext.clearRect(this.x, this.y, fruit_radius, fruit_radius);
        if (highlighted) {
            gameCanvasContext.drawImage(highlight, this.x, this.y, fruit_radius, fruit_radius);
        }
        gameCanvasContext.drawImage(this.defaultImage, this.x, this.y, fruit_radius, fruit_radius);
    }
}
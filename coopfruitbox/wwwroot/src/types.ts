class MousePosition {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class MouseSelectionPos {
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


class ClientDataObject {
    public mouseSelectionPos!: MouseSelectionPos;
    
}

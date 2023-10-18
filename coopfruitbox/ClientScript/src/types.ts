class MouseSelectionPos {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public selecting: boolean;

    constructor(x1: number, y1: number, x2: number, y2: number, selecting: boolean) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.selecting = selecting;
    }
}


class ClientDataObject {
    public mouseSelectionPos!: MouseSelectionPos;
    
}

enum MouseEventType {
    Down,
    Move,
    Up
}

class Cursor {
    public pos: MousePosition;
    public type: MouseEventType;

    constructor(pos: MousePosition, type: MouseEventType) {
        this.pos = pos;
        this.type = type;
    }
}

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

    public getCoordsInOrder() {
        let [x1, y1, x2, y2] = this.getCoords();
        return [Math.min(x1, x2), Math.max(x1, x2), Math.min(y1, y2), Math.max(y1, y2)]
        // Returns small X, large X, small Y, large Y
    }
}

class Fruit {
    public value: number;
    public x: number;
    public y: number;
    public id: number;
    public cleared: boolean;
    public defaultImage: HTMLImageElement;

    constructor(value: number, x: number, y: number, id: number) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.id = id;
        this.cleared = false;
        this.defaultImage = apple_images[value - 1];
    }

    public draw() {
        if (this.cleared) { 
            return
        }
        gameCanvasContext.clearRect(this.x, this.y, fruit_radius, fruit_radius);
        if (selected.has(this) || selectedByOther.has(this)) { 
            gameCanvasContext.drawImage(highlight, this.x, this.y, fruit_radius, fruit_radius);
            if (Helpers.sumOfFruits(selected) == goal || Helpers.sumOfFruits(selectedByOther) == goal) {
                gameCanvasContext.drawImage(scoreable, this.x, this.y, fruit_radius, fruit_radius);
            }
        }
        gameCanvasContext.drawImage(this.defaultImage, this.x, this.y, fruit_radius, fruit_radius);
    }

    public clear() {
        gameCanvasContext.clearRect(this.x, this.y, fruit_radius, fruit_radius);
        this.cleared = true;
    }
}

enum ClientObjectType {
    Signal,
    StartGame,
    Fruit,
    ResetGame,
}

enum HostObjectType {
    Signal,
    StartGame,
    Fruit,
    GameState,
    ResetGame,
    GameOver
}

class ClientDataObject {
    public signal!: string;
    public fruitIDs!: number[];
    public clientObjectType: ClientObjectType;
    constructor(clientObjectType: ClientObjectType.Signal, signal: string);
    constructor(clientObjectType: ClientObjectType.StartGame);
    constructor(clientObjectType: ClientObjectType.Fruit, fruitIDs: number[]);
    constructor(clientObjectType: ClientObjectType.ResetGame);
    constructor(clientObjectType: ClientObjectType, arg?: string | number[]) {
        this.clientObjectType = clientObjectType;
        switch (clientObjectType) {
            case ClientObjectType.Signal:
                this.signal = <string>arg;
                break;
            case ClientObjectType.Fruit:
                this.fruitIDs = <number[]>arg;
                break;
        }
    }
}

class HostDataObject {
    public signal!: string;
    public fruitSeed: number[];
    public fruitIDs!: number[];
    public score!: number;
    public time!: number;
    public hostObjectType: HostObjectType;
    constructor(hostObjectType: HostObjectType.Signal, signal: string);
    constructor(hostObjectType: HostObjectType.StartGame);
    constructor(hostObjectType: HostObjectType.ResetGame, fruitSeed: number[]);
    constructor(hostObjectType: HostObjectType.Fruit, fruitIDs: number[]);
    constructor(hostObjectType: HostObjectType.GameState, time: number, score: number);
    constructor(hostObjectType: HostObjectType.GameOver); // TODO: add high score to GameOver constructor
    constructor(hostObjectType: HostObjectType, arg1?: string | number[] | number, arg2?: number) {
        this.hostObjectType = hostObjectType;
        switch (hostObjectType) {
            case HostObjectType.Signal:
                this.signal = <string> arg1;
            case HostObjectType.ResetGame:
                this.fruitSeed = <number[]>arg1;
                break;
            case HostObjectType.Fruit:
                this.fruitIDs = <number[]> arg1;
                break;
            case HostObjectType.GameState:
                this.score = <number> arg1;
                this.time = <number> arg2;
                break;
        }
    }
}
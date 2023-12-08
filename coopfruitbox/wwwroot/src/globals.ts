let connection: any;

const overlay: HTMLElement = document.getElementById("overlay") as HTMLElement;
const playButton: HTMLButtonElement = document.getElementById("play-button") as HTMLButtonElement;
const createLobbyButton: HTMLButtonElement = document.getElementById("create-lobby-button") as HTMLButtonElement;
const lobbyLinkText: HTMLElement = document.getElementById("lobby-link-text") as HTMLElement;

let canvasContainer: HTMLCanvasElement = document.getElementById("canvas-container") as HTMLCanvasElement;

let otherMouseCanvas: HTMLCanvasElement = document.getElementById("other-mouse-canvas") as HTMLCanvasElement;
let otherMouseCanvasContext: CanvasRenderingContext2D = otherMouseCanvas.getContext("2d") as CanvasRenderingContext2D;
otherMouseCanvas.width = otherMouseCanvas.offsetWidth;
otherMouseCanvas.height = otherMouseCanvas.offsetHeight;

let gameCanvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let gameCanvasContext: CanvasRenderingContext2D = gameCanvas.getContext("2d") as CanvasRenderingContext2D;
gameCanvas.width = gameCanvas.offsetWidth;
gameCanvas.height = gameCanvas.offsetHeight;

let selectionDiv: HTMLCanvasElement = document.getElementById('selection-div') as HTMLCanvasElement;
let selectionArea: MouseSelectionArea;

let otherSelectionDiv: HTMLCanvasElement = document.getElementById('other-selection-div') as HTMLCanvasElement;
let otherSelectionArea: MouseSelectionArea;

let cursorImage: HTMLImageElement = new Image();
cursorImage.src = "images/cursor.png";

let a1: HTMLImageElement = new Image();
a1.src = "images/a1.png";
let a2: HTMLImageElement = new Image();
a2.src = "images/a2.png";
let a3: HTMLImageElement = new Image();
a3.src = "images/a3.png";
let highlight: HTMLImageElement = new Image();
highlight.src = "images/highlight.png";

let fruit_radius: number = 48;
let goal: number = 10;
let fruits: Fruit[] = [];
let selected = new Set();
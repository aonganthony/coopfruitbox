let connection: any;
let lobbyID: string = "default";
let startTime: number = 120;
let time: number;
let score: number = 0;
let timerInterval: any;
let playerIsHost: boolean = false;
let highScore: number;

let overlay: HTMLElement = document.getElementById("overlay") as HTMLElement;
let startSoloButton: HTMLButtonElement = document.getElementById("play-solo-button") as HTMLButtonElement;
let createLobbyButton: HTMLButtonElement = document.getElementById("create-lobby-button") as HTMLButtonElement;
let startCoopButton: HTMLButtonElement = document.getElementById("start-coop-button") as HTMLButtonElement;
let resetGameButton: HTMLButtonElement = document.getElementById("reset-game-button") as HTMLButtonElement;
let playAgainButton: HTMLButtonElement = document.getElementById("play-again-button") as HTMLButtonElement;

let lobbyLinkText: HTMLElement = document.getElementById("lobby-link-text") as HTMLElement;
let scoreText: HTMLElement = document.getElementById("score-text") as HTMLElement;
let timerText: HTMLElement = document.getElementById("timer-text") as HTMLElement;
let overlayText: HTMLElement = document.getElementById("overlay-text") as HTMLElement;

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

let num_rows = 10;
let num_cols = 17;
let fruit_radius: number = 48;
let goal: number = 10;
let fruits: Fruit[] = [];
let selected = new Set();
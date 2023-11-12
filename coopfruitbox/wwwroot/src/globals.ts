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
let selectionArea: MouseSelectionPos;

let otherSelectionDiv: HTMLCanvasElement = document.getElementById('other-selection-div') as HTMLCanvasElement;
let otherSelectionArea: MouseSelectionPos;

let cursorImage: HTMLImageElement = new Image();
cursorImage.src = "cursor.png";
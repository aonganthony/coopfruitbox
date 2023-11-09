let canvasContainer: HTMLCanvasElement = document.getElementById("canvas-container") as HTMLCanvasElement;

let gameCanvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let gameCanvasContext: CanvasRenderingContext2D = gameCanvas.getContext("2d") as CanvasRenderingContext2D;
gameCanvas.width = gameCanvas.offsetWidth;
gameCanvas.height = gameCanvas.offsetHeight;


let selectionDiv: HTMLCanvasElement = document.getElementById('selection-div') as HTMLCanvasElement;

// Selection area coords
// let currentMousePos: MousePosition;  
let selectionArea: MouseSelectionPos;

let cursorImage: HTMLImageElement = new Image();
cursorImage.src = "cursor.png";
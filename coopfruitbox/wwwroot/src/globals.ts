let gameCanvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let gameCanvasContext: CanvasRenderingContext2D = gameCanvas.getContext("2d") as CanvasRenderingContext2D;
gameCanvas.width = gameCanvas.offsetWidth;
gameCanvas.height = gameCanvas.offsetHeight;

let selectionDiv: HTMLCanvasElement = document.getElementById('selection-div') as HTMLCanvasElement;
selectionDiv.width = selectionDiv.offsetWidth;
selectionDiv.height = selectionDiv.offsetHeight;

// Selection area coords
let pressedX: number;
let pressedY: number;
let currX: number;
let currY: number;
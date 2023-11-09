abstract class Renderer { 
    public static drawGame() {

    }

    public static drawOtherMouse(x: number, y: number) {
        gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(x, y, 5, 0, Math.PI * 2, false)
        gameCanvasContext.fillStyle = 'red'
        gameCanvasContext.fill()
        gameCanvasContext.drawImage(cursorImage, x, y);
    }

    public static drawOtherSelectionArea() {

    }

    public static trackMouseSelecting() {
        selectionArea = new MouseSelectionPos(0, 0, 0, 0, false);
        onmousedown = function (e) {
            selectionDiv.hidden = false;
            selectionArea.initialPos = Helpers.getMousePosition(canvasContainer, e);
            Renderer.drawSelectionArea();
        }
        onmousemove = function (e) {
            selectionArea.currentPos = Helpers.getMousePosition(canvasContainer, e);
            Renderer.drawSelectionArea();
        }

        onmouseup = function (e) {
            selectionDiv.hidden = true;
        }
    }

    public static drawSelectionArea() {
        // Update selectionCanvas
        const [x1, y1, x2, y2] = selectionArea.getCoords();
        selectionDiv.style.left = Math.min(x1, x2) + 'px' // Smaller X
        selectionDiv.style.top = Math.min(y1, y2) + 'px' // Smaller Y
        selectionDiv.style.width = Math.max(x1, x2) - Math.min(x1, x2) + 'px' 
        selectionDiv.style.height = Math.max(y1, y2) - Math.min(y1, y2) + 'px'
    }
    
}

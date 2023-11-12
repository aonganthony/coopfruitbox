abstract class Renderer { 
    public static drawGame() {

    }

    public static trackMouseSelecting() {
        selectionArea = new MouseSelectionPos(0, 0, 0, 0, false);
        otherSelectionArea = new MouseSelectionPos(0, 0, 0, 0, false);
        onmousedown = function (e) {
            let pos = Helpers.getMousePosition(canvasContainer, e);
            selectionArea.hidden = false;
            selectionArea.initialPos = pos
            Renderer.drawSelectionArea(selectionDiv, selectionArea);
            connection.send("DisplayCursor", pos.x, pos.y, true, false);
        }
        onmousemove = function (e) {
            let pos = Helpers.getMousePosition(canvasContainer, e);
            selectionArea.currentPos = pos
            Renderer.drawSelectionArea(selectionDiv, selectionArea);
            connection.send("DisplayCursor", pos.x, pos.y, false, false);
        }

        onmouseup = function (e) {
            let pos = Helpers.getMousePosition(canvasContainer, e);
            selectionArea.hidden = true;
            connection.send("DisplayCursor", pos.x, pos.y, false, true);
        }
    }

    public static drawSelectionArea(div: HTMLCanvasElement, area: MouseSelectionPos) {
        // Update selectionDiv
        const [x1, y1, x2, y2] = area.getCoords();
        div.hidden = area.hidden;
        div.style.left = Math.min(x1, x2) + 'px' // Smaller X
        div.style.top = Math.min(y1, y2) + 'px' // Smaller Y
        div.style.width = Math.max(x1, x2) - Math.min(x1, x2) + 'px'
        div.style.height = Math.max(y1, y2) - Math.min(y1, y2) + 'px'
    }

    public static drawOtherMouse(pos: MousePosition) {
        otherMouseCanvasContext.clearRect(0, 0, otherMouseCanvas.width, otherMouseCanvas.height);
        otherMouseCanvasContext.beginPath();
        otherMouseCanvasContext.arc(pos.x, pos.y, 5, 0, Math.PI * 2, false)
        otherMouseCanvasContext.fillStyle = 'red'
        otherMouseCanvasContext.fill()
        otherMouseCanvasContext.drawImage(cursorImage, pos.x, pos.y);
    }
}

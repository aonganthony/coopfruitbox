abstract class Renderer { 
    public static drawGame() {
        
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(50, 50, 15, 0, Math.PI * 2, false)
        gameCanvasContext.fillStyle = 'red'
        gameCanvasContext.fill()
        Renderer.drawFruits(10, 17);
    }

    /* Draws rows * cols number of fruits in gameCanvas. Max 170.*/
    public static drawFruits(rows: number, cols: number) {
        let xOffset = 50;
        let yOffset = 50;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let rand = 1;
                let fruit = new Fruit(rand, xOffset + 50 * j, yOffset + 50 * i);
                fruit.draw(false);
                fruits.add(fruit);
            }
        }
    }

    public static trackMouseSelecting() {
        selectionArea = new MouseSelectionArea(0, 0, 0, 0, false);
        otherSelectionArea = new MouseSelectionArea(0, 0, 0, 0, false);
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

    public static drawSelectionArea(div: HTMLCanvasElement, area: MouseSelectionArea) {
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

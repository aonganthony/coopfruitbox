abstract class Renderer { 
    public static drawGame() {
        
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(50, 50, 15, 0, Math.PI * 2, false)
        gameCanvasContext.fillStyle = 'red'
        gameCanvasContext.fill()
        Renderer.drawFruits(10, 17);
    }

    public static hideOverlay() {
        overlay.style.display = "none";
    }

    /* Draws rows * cols number of fruits in gameCanvas. Max 170.*/
    public static drawFruits(rows: number, cols: number) {
        let xOffset = 0;
        let yOffset = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let rand = 1;
                let fruit = new Fruit(rand, xOffset + 50 * j, yOffset + 50 * i);
                fruit.draw();
                fruits.push(fruit);
            }
        }
    }

    public static trackMouseSelecting() {
        selectionArea = new MouseSelectionArea(0, 0, 0, 0, true);
        otherSelectionArea = new MouseSelectionArea(0, 0, 0, 0, true);
        onmousedown = function (e) { Helpers.sendCursor(e, MouseEventType.Down); }
        onmousemove = function (e) { Helpers.sendCursor(e, MouseEventType.Move); }
        onmouseup = function (e) { Helpers.sendCursor(e, MouseEventType.Up); }
    }

    public static drawSelectionArea(div: HTMLCanvasElement, area: MouseSelectionArea) {
        // Update selectionDiv
        const [x1, x2, y1, y2] = area.getCoordsInOrder();
        div.hidden = area.hidden;
        div.style.left = x1 + 'px'
        div.style.top = y1 + 'px' 
        div.style.width = x2 - x1 + 'px'
        div.style.height = y2 - y1 + 'px'
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

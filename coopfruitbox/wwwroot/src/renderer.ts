function start() {
    Renderer.trackMouseSelecting();
}

abstract class Renderer { 
    public static trackMouseSelecting() {
        onmousedown = function (e) {
            selectionCanvas.hidden = false;
            pressedX = e.clientX;
            pressedY = e.clientY;
            Renderer.drawSelectionArea();
        }
        onmousemove = function (e) {
            currX = e.clientX;
            currY = e.clientY;
            Renderer.drawSelectionArea();
        }

        onmouseup = function (e) {
            selectionCanvas.hidden = true;
        }
    }

    public static drawSelectionArea() {
        // Update selectionCanvas
        let x3 = Math.min(pressedX, currX) //Smaller X
        let x4 = Math.max(pressedX, currX) //Larger X
        let y3 = Math.min(pressedY, currY) //Smaller Y
        let y4 = Math.max(pressedY, currY) //Larger Y
        selectionCanvas.style.left = x3 + 'px'
        selectionCanvas.style.top = y3 + 'px'
        selectionCanvas.style.width = x4 - x3 + 'px'
        selectionCanvas.style.height = y4 - y3 + 'px'
    }

}

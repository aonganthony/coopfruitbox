abstract class Renderer { 
    public static drawGame() {

    }

    public static trackMouseSelecting() {
        onmousedown = function (e) {
            selectionDiv.hidden = false;
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
            selectionDiv.hidden = true;
        }
    }

    public static drawSelectionArea() {
        // Update selectionCanvas
        let x3 = Math.min(pressedX, currX) //Smaller X
        let x4 = Math.max(pressedX, currX) //Larger X
        let y3 = Math.min(pressedY, currY) //Smaller Y
        let y4 = Math.max(pressedY, currY) //Larger Y
        selectionDiv.style.left = x3 + 'px'
        selectionDiv.style.top = y3 + 'px'
        selectionDiv.style.width = x4 - x3 + 'px'
        selectionDiv.style.height = y4 - y3 + 'px'
    }
    
}

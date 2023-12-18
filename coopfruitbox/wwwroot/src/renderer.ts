abstract class Renderer { 
    public static drawGame() {
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(50, 50, 15, 0, Math.PI * 2, false)
        gameCanvasContext.fillStyle = 'red'
        gameCanvasContext.fill()
        Renderer.drawFruits(num_rows, num_cols);
    }

    public static displayMainMenu() {
        startSoloButton.style.display = 'inline';
        createLobbyButton.style.display = 'inline';
    }

    public static hideOverlay() {
        overlay.style.display = "none";
    }

    public static displayCoopStart() {
        // All players have connected. Display Start game button
        overlayText.style.display = "inline";
        overlayText.innerText = `All players have connected.`
        startCoopButton.style.display = "inline";
    }

    public static displayCountdown() {
        // Game starting in 3, 2, 1 ...
        overlayText.style.display = "inline";
        overlayText.innerText = `Starting in ${time}...`
    }

    public static displayGameOver() {
        // Game ended due to no time left. Show Score, High Score, and Play Again button
    }

    public static displayDisconnect() {
        // Game ended due to other player disconnecting.
    }

    public static updateScore() {
        scoreText.innerText = score.toString();
    }

    public static updateTimer() {
        timerText.innerText = `${time}`;
    }

    /* Draws rows * cols number of fruits in gameCanvas. Max 170. */
    public static drawFruits(rows: number, cols: number) {
        let xOffset = 0;
        let yOffset = 0;
        let c = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let rand = 1;
                let fruit = new Fruit(rand, xOffset + 50 * j, yOffset + 50 * i, c);
                fruit.draw();
                fruits.push(fruit);
                c += 1;
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

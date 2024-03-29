abstract class Renderer { 
    public static drawGame() {
        selectionArea = new MouseSelectionArea(0, 0, 0, 0, true);
        otherSelectionArea = new MouseSelectionArea(0, 0, 0, 0, true);
        uiContainer.style.display = "flex";
        Renderer.displayFruit();
    }

    public static displayMainMenu() {
        overlayDescriptor.innerText = "Select groups of apples with your cursor. Apples get cleared if the selection sums to 10.\nStrategically choose which groups of apples to clear first as they affect future moves.\nBe fast and plan ahead to maximize your score!\n\nPlay solo or with a friend.";
        startSoloButton.style.display = 'inline';
        createLobbyButton.style.display = 'inline';
        tutorialVid.style.display = "inline";
    }//A version of Fruit Box that includes a 2 player coop mode. Fruit Box originally made by GameSaien.

    public static hideOverlay() {
        overlay.style.display = "none";
        overlayDescriptor.innerText = "";
        tutorialVid.style.display = "none";
    }

    public static displayLobbyLink() {
        overlayDescriptor.innerText = `Invite Link: https://localhost:7140/?${lobbyID}`;
        clipboardCopyButton.style.display = "inline";
        startSoloButton.style.display = "none";
        createLobbyButton.style.display = "none";
        tutorialVid.style.display = "none";
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

    public static displayFruit() {
        for (let f of fruits) {
            f.draw();
        }
    }

    public static displayGameOver() {
        // Game ended due to no time left. Show Score, High Score, and Play Again button
        overlay.style.display = "inline";
        overlayText.style.display = "inline";
        overlayText.innerText = `Game over. You boxed a total of ${score} fruits!\nHigh Score: ${highScore}`
        startCoopButton.style.display = "inline";
        startCoopButton.innerText = "Play again";
    }

    public static displayDisconnect() {
        // Game ended due to other player disconnecting.
        overlay.style.display = "inline";
        overlayText.style.display = "inline";
        overlayText.innerText = `Other player has disconnected.`
    }

    public static updateScore() {
        scoreText.innerText = `Score: ${score}`;
    }

    public static updateTimer() {
        timerText.innerText = `Time left: ${time}`;
    }

    public static trackMouse() {
        onmousedown = function (e) { Helpers.handleCursor(e, MouseEventType.Down); }
        onmousemove = function (e) { Helpers.handleCursor(e, MouseEventType.Move); }
        onmouseup = function (e) { Helpers.handleCursor(e, MouseEventType.Up); }
    }

    public static stopTracking() {
        onmousedown = null;
        onmousemove = null;
        onmouseup = null;
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

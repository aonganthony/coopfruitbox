abstract class Game {
    public static async start() {
        await Game.setupConnection();
        if (!Game.checkURLforLobbyID()) {
            Renderer.displayMainMenu();
        }
    }

    public static async setupConnection() {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/gameHub")
            .build();

        await connection.start().catch((err: any) => console.log(err));

        connection.on("OtherPlayerConnected", () => {
            Renderer.displayCoopStart();
        });

        connection.on("ReceiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
            // console.log('updating with', x, y, down, up);
            let pos = new MousePosition(x, y);
            if (down) {
                Helpers.mouseDown(pos, otherSelectionArea);
            }
            else if (up) {
                Helpers.mouseUp(pos, otherSelectionArea);
            }
            else {
                Helpers.mouseMove(pos, otherSelectionArea);
            }
            Renderer.drawOtherMouse(pos);
            Renderer.drawSelectionArea(otherSelectionDiv, otherSelectionArea);
        });

        if (!playerIsHost) {
            Client.setupConnection();
        }
    }

    public static checkURLforLobbyID(): boolean {
        var delimiterValue = window.location.search.substring(1);
        if (delimiterValue.length == 8) { // TODO: verify lobby exists, protect against sql injection
            lobbyID = delimiterValue;
            connection.invoke("JoinLobby", lobbyID, true);
            return true;
        } else {
            // TODO: error prompt, lobby does not exist
            return false;
        }
        
    }

    public static resetGame() {
        fruits = [];
        selected = new Set();
        selectedByOther = new Set();
        score = 0;
        Helpers.resetTimer();
        if (playerIsHost) {
            Host.startGameTimer()
        }
        Game.createFruits(seed);
        Renderer.drawGame();
        Renderer.updateScore();
        Renderer.hideOverlay();
        Renderer.trackMouse();
    }

    // Creates and returns random values for the fruits.
    public static createBoardSeed() {
        let fruitVals = [];
        for (let i = 0; i < num_rows * num_cols; i++) {
            fruitVals[i] = Math.floor(Math.random() * 8) + 1;
        }
        return fruitVals;
    }

    // Initializes fruit objects from seed and stores list in global variable.
    public static createFruits(seed: number[]) {
        let xOffset = 0;
        let yOffset = 0;
        let c = 0;
        for (let i = 0; i < num_rows; i++) {
            for (let j = 0; j < num_cols; j++) {
                let fruit = new Fruit(seed[c], xOffset + 50 * j, yOffset + 50 * i, c);
                fruits.push(fruit);
                c += 1;
            }
        }
    }

    public static gameOver() {
        Renderer.displayGameOver();
    }

    public static async createLobby() {
        connection.invoke("CreateLobby").then(
            (gameID: string) => {
                lobbyID = gameID;
                lobbyLinkText.innerText = `Invite Link: https://localhost:7140/?${lobbyID}`;
                startSoloButton.style.display = "none";
                createLobbyButton.style.display = "none";
                connection.invoke("JoinLobby", lobbyID, false);
            });
        playerIsHost = true;
        Host.setupConnection();
    }
}

startSoloButton.addEventListener("click", Game.resetGame);

createLobbyButton.addEventListener("click", Game.createLobby)

startCoopButton.addEventListener("click", (): void => {
    if (playerIsHost) {
        Host.startCountdown();
    } else {
        Client.startCountdown();
    }
})

playAgainButton.addEventListener("click", (): void => {
    // TODO: setup endGame menu that shows score, time left, play again button
    // only 1 player is required to activate playAgain button
    if (playerIsHost) {
        Host.resetGame();
    } else {
        Client.resetGame();
    }
}); 

resetGameButton.addEventListener("click", (): void => {
    // TODO: make it so that both players need to click reset in order for game to reset
    if (playerIsHost) {
        Host.resetGame();
    } else {
        Client.resetGame();
    }
})
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
            if (playerIsHost) {
                let data = new HostDataObject(HostObjectType.Signal, playerSignal);
                console.log("sending signal to client");
                connection.invoke("SendHostData", lobbyID, JSON.stringify(data));
                overlayDescriptor.style.display = "none";
                clipboardCopyButton.style.display = "none";
            }
            Renderer.displayCoopStart();
        });

        if (!playerIsHost) {
            Client.setupConnection();
        }
    }

    public static checkURLforLobbyID(): boolean {
        let delimiterValue = window.location.search.substring(1);
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
        if (playingSolo) {
            Solo.startGameTimer();
        } else if (playerIsHost) {
            Host.startGameTimer();
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
        let xOffset = 65;
        let yOffset = 50;
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
        highScore = Math.max(score, highScore);
        Renderer.stopTracking();
        Renderer.displayGameOver();
    }

    public static async createLobby() {
        connection.invoke("CreateLobby").then(
            (gameID: string) => {
                lobbyID = gameID;
                overlayDescriptor.innerText = `Invite Link: https://localhost:7140/?${lobbyID}`;
                clipboardCopyButton.style.display = "inline";
                startSoloButton.style.display = "none";
                createLobbyButton.style.display = "none";
                connection.invoke("JoinLobby", lobbyID, false);
            });
        playerIsHost = true;
        Host.setupConnection();
    }
}

startSoloButton.addEventListener("click", (): void => {
    playingSolo = true;
    Solo.resetGame();
}); 

createLobbyButton.addEventListener("click", Game.createLobby)

startCoopButton.addEventListener("click", (): void => {
    if (playingSolo) {
        Solo.resetGame();
    } else if (playerIsHost) {
        Host.startCountdown();
    } else {
        Client.startCountdown();
    }
})

clipboardCopyButton.addEventListener("click", (): void => {
    clipboardCopyButton.innerText = "Copied!";
    navigator.clipboard.writeText(overlayDescriptor.innerText.slice(13));
})

playAgainButton.addEventListener("click", (): void => {
    // TODO: setup endGame menu that shows score, time left, play again button
    // only 1 player is required to activate playAgain button
    if (playingSolo) {
        Solo.resetGame();
    } else if (playerIsHost) {
        Host.resetGame();
    } else {
        Client.resetGame();
    }
}); 

resetGameButton.addEventListener("click", (): void => {
    // TODO: make it so that both players need to click reset in order for game to reset
    if (playingSolo) {
        Solo.resetGame();
    } else if (playerIsHost) {
        Host.resetGame();
    } else {
        Client.resetGame();
    }
}) 

abstract class Game {
    public static async startConnection() {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/gameHub")
            .build();

        await connection.start().catch((err: any) => console.log(err));

        connection.on("StartGame", () => {
            Game.resetGame();
        });

        connection.on("ReceiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
            // console.log('updating with', x, y, down, up);
            let pos = new MousePosition(x, y);
            if (down) {
                Helpers.mouseDown(pos, otherSelectionArea);
            } else if (up) {
                Helpers.mouseUp(pos, otherSelectionArea);
            } else {
                Helpers.mouseMove(pos, otherSelectionArea);
            }
            Renderer.drawOtherMouse(pos);
            Renderer.drawSelectionArea(otherSelectionDiv, otherSelectionArea);
        });

        var delimiterValue = window.location.search.substring(1);
        if (delimiterValue.length == 8) { // TODO: verify string
            lobbyID = delimiterValue;
            connection.invoke("JoinLobby", lobbyID, true)
        } else {
            // TODO: error prompt, lobby does not exist
        }
    }

    public static resetGame() {
        Renderer.hideOverlay();
        Renderer.drawGame();
        Renderer.trackMouseSelecting();
    }

    public static displayGameOver() {

    }

    public static async createLobby() {
        connection.invoke("CreateLobby").then(
            (gameID: string) => {
                lobbyID = gameID;
                lobbyLinkText.innerText = `Invite Link: https://localhost:7140/?${lobbyID}`;
                playButton.style.display = "none";
                createLobbyButton.style.display = "none";
                connection.invoke("JoinLobby", lobbyID, false);
            });
    }
}

playButton.addEventListener("click", (): void => {
    Game.resetGame();
});

createLobbyButton.addEventListener("click", (): void => {
    Game.createLobby();
})
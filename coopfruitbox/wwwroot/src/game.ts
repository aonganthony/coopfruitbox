abstract class Game {
    public static startConnection() {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/gameHub")
            .build();

        connection.on("receiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
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

        connection.start().catch((err: any) => console.log(err));
    }

    public static resetGame() {
        Renderer.drawGame();
        Renderer.trackMouseSelecting();
    }

    public static displayGameOver() {

    }

    public static createLobby() {
        var lobbyCode;
        connection.invoke("CreateLobby").then(
            (code: string) => {
                lobbyCode = code;
                lobbyLinkText.innerText = `Invite Link: https://localhost:7140/?${lobbyCode}`;
            });
        playButton.style.display = "none";
        createLobbyButton.style.display = "none";
        connection.invoke("JoinLobby", lobbyCode, true);
    }

    public static joinLobbyFromCode() {
        var lobbyCode = window.location.search.substring(1);
        if (lobbyCode.length == 8) { // verify string
            connection.invoke("JoinLobby", lobbyCode)
        } else {
            // error prompt, lobby does not exist
        }
        console.log(lobbyCode);
    }

    public static hideOverlay() {
        playButton.style.display = "none";
        createLobbyButton.style.display = "none";
    }
}

playButton.addEventListener("click", (): void => {
    Game.resetGame();
    Game.hideOverlay();
});

createLobbyButton.addEventListener("click", (): void => {
    console.log('here');
    Game.createLobby();

})
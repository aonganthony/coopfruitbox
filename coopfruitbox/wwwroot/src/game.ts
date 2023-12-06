abstract class Game {
    public static createLobby() {
        connection.invoke("CreateLobby");
    }

    public static resetGame() {
        Renderer.drawGame();
    }

    public static displayGameOver() {

    }
}
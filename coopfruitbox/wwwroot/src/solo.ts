abstract class Solo {
    public static resetGame() {
        seed = Game.createBoardSeed();
        Game.resetGame();
    }

    public static gameOver() {
        Game.gameOver();
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        let selectedFruits: Fruit[] = Array.from(selected);
        let selectedScore = Helpers.sumOfFruits(selected);
        Helpers.mouseUp(pos, area);
        if (selectedScore == goal) {
            Solo.clearFruit(Helpers.getIDsFromFruit(selectedFruits));
        } else {
            selectedFruits.forEach(Helpers.highlightFruit);
        }
    }

    public static clearFruit(fruitIDsToClear: number[]) {
        popSound.play();
        for (const id of fruitIDsToClear) {
            if (!fruits[id].cleared) {
                fruits[id].clear();
                score += 1;
            }
        }
        Renderer.updateScore();
    }

    public static startGameTimer() {
        if (!timerInterval) {
            startSoloButton.style.display = "none";
            createLobbyButton.style.display = "none";
            time = startTime;
            Solo.gameTick(); // initial func call here to jumpstart setInterval
            timerInterval = setInterval(Solo.gameTick, 1000);
        }
    }

    public static gameTick() {
        Renderer.updateTimer();
        if (time <= 0) {
            Helpers.resetTimer();
            Solo.gameOver();
        } else {
            time -= 1;
        }
    }
}
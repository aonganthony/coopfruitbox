abstract class Host {
    public static setupConnection() {
        // Host.setupConnection
        connection.on("ReceiveClientData", (data: string) => {
            const clientDataObject: ClientDataObject = JSON.parse(data);
            console.log("received client data:", clientDataObject);
            switch (clientDataObject.clientObjectType as ClientObjectType) {
                case ClientObjectType.StartGame:
                    Host.startCountdown()
                    break;
                case ClientObjectType.Fruit:
                    // given client's fruits, clear them and send back to client to clear them
                    Host.clearFruit(Helpers.getFruitFromIDs(clientDataObject.fruitIDs));
                    break;
                case ClientObjectType.ResetGame:
                    Host.playAgain();
                    break;
            }
        });
    }

    public static startCountdown() {
        let data = new HostDataObject(HostObjectType.StartGame);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data))
        Helpers.startCountdown();
    }

    public static playAgain() {
        let data = new HostDataObject(HostObjectType.ResetGame);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data))
        Game.resetGame();
    }

    public static gameOver() {
        // TODO: implement gameOver logic for host to send to client
        let data = new HostDataObject(HostObjectType.GameOver);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data))
        Game.gameOver();
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        let selectedFruits: Fruit[] = Helpers.getAllFruitInArea(area);
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        let s = 0
        console.log("host: ", selectedFruits);
        // get fruits that are selected, check if sum to 10, clear them and send state to client
        for (const f of selectedFruits) {
            s += f.value;
        }
        if (s == 10) {
            Host.clearFruit(selectedFruits);
        } else {
            selectedFruits.forEach(Helpers.highlightFruit);
        }
    }

    public static clearFruit(fruitsToClear: Fruit[]) {
        for (const f of fruitsToClear) {
            if (!fruits[f.id].cleared) {
                fruits[f.id].clear();
                score += 1;
            }
        }
        let data = new HostDataObject(HostObjectType.Fruit, Helpers.getIDsFromFruit(fruitsToClear));
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data));
        data = new HostDataObject(HostObjectType.GameState, score, time);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data));
        Renderer.updateScore();
    }

    public static startGameTimer() {
        if (!timerInterval) {
            startSoloButton.style.display = "none";
            createLobbyButton.style.display = "none";
            time = startTime;
            Host.gameTick(); // initial func call here to jumpstart setInterval
            timerInterval = setInterval(Host.gameTick, 1000);
        }
    }

    public static gameTick() {
        let data = new HostDataObject(HostObjectType.GameState, score, time);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data))
        Renderer.updateTimer();
        if (time <= 0) {
            Helpers.resetTimer();
            Game.gameOver();
        } else {
            time -= 1;
        }
    }
}
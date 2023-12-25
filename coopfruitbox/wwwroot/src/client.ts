abstract class Client {
    public static setupConnection() {
        connection.on("ReceiveHostData", (data: string) => {
            const hostDataObject: HostDataObject = JSON.parse(data);
            console.log("received host data:", hostDataObject);
            switch (hostDataObject.hostObjectType as HostObjectType) {
                case HostObjectType.StartGame:
                    Helpers.startCountdown();
                    break;
                case HostObjectType.ResetGame:
                    console.log(hostDataObject.fruitSeed);
                    seed = hostDataObject.fruitSeed;
                    Game.resetGame();
                    break;
                case HostObjectType.Fruit:
                    // given host's fruits to clear, clear them and update score
                    Client.clearFruit(Helpers.getFruitFromIDs(hostDataObject.fruitIDs));
                    break;
                case HostObjectType.GameState:
                    Client.updateGameState(hostDataObject.score, hostDataObject.time);
                    break;
            }
        });
    }

    public static startCountdown() {
        let data = new ClientDataObject(ClientObjectType.StartGame);
        connection.invoke("SendClientData", lobbyID, JSON.stringify(data));
    }

    public static countdownTick() {
        Renderer.displayCountdown();
        if (time <= 0) {
            Helpers.resetTimer();
        } else {
            time -= 1;
        }
    }

    public static updateGameState(s: number, t: number) {
        score = s;
        time = t;
        Renderer.updateScore();
        Renderer.updateTimer();
    }

    public static resetGame() {
        let data = new ClientDataObject(ClientObjectType.ResetGame);
        connection.invoke("SendClientData", lobbyID, JSON.stringify(data));
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        let selectedFruits: Fruit[] = Helpers.getAllFruitInArea(area);
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        let s = 0;
        console.log("client: ", selectedFruits);
        for (const f of selectedFruits) {
            s += f.value;
        }

        if (s == 10) {
            let data = new ClientDataObject(ClientObjectType.Fruit, Helpers.getIDsFromFruit(selectedFruits));
            connection.invoke("SendClientData", lobbyID, JSON.stringify(data))
        } else {
            selectedFruits.forEach(Helpers.highlightFruit);
        }
    }

    public static clearFruit(fruitsToClear: Fruit[]) {
        for (const f of fruitsToClear) {
            if (!fruits[f.id].cleared) {
                fruits[f.id].clear();
            }
        }
    }
}
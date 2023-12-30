abstract class Host {
    public static setupConnection() {
        Host.setupSimplePeer();
        connection.on("ReceiveClientData", (data: string) => {
            const clientDataObject: ClientDataObject = JSON.parse(data);
            console.log("received client data:", clientDataObject);
            switch (clientDataObject.clientObjectType as ClientObjectType) {
                case ClientObjectType.Signal:
                    Host.receiveSignal(clientDataObject.signal);
                    break;
                case ClientObjectType.StartGame:
                    Host.startCountdown();
                    break;
                case ClientObjectType.ResetGame:
                    Host.resetGame();
                    break;
                case ClientObjectType.Fruit:
                    Host.clearFruit(Helpers.getFruitFromIDs(clientDataObject.fruitIDs));
                    break;
            }
        });
    }

    public static setupSimplePeer() {
        p = new SimplePeer({
            initiator: playerIsHost,
            trickle: false
        })
        p.on('error', err => console.log('error', err))
        p.on('signal', signal => {
            console.log("SIGNAL", signal);
            playerSignal = signal;
        })
        p.on('connect', () => {
            console.log('connected');
        })
        p.on('data', data => {
            Helpers.receiveCursor(JSON.parse(data));
        })
    }

    public static receiveSignal(signal: string) {
        console.log("RECEIVED", signal);
        p.signal(signal);
    }

    public static startCountdown() {
        let data = new HostDataObject(HostObjectType.StartGame);
        connection.invoke("SendHostData", lobbyID, JSON.stringify(data));
        Helpers.startCountdown();
    }

    public static countdownTick() {
        Renderer.displayCountdown();
        if (time <= 0) {
            Helpers.resetTimer();
            Host.resetGame();
        } else {
            time -= 1;
        }
    }

    public static async resetGame() {
        seed = Game.createBoardSeed();
        let data = new HostDataObject(HostObjectType.ResetGame, seed);
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
        let selectedFruits: Fruit[] = Array.from(selected);
        let selectedScore = Helpers.sumOfFruits(selected);
        Helpers.mouseUp(pos, area);
        if (selectedScore == goal) {
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
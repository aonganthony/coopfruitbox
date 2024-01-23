abstract class Client {
    public static setupConnection() {
        Client.setupSimplePeer();
        connection.on("ReceiveHostData", (data: string) => {
            const hostDataObject: HostDataObject = JSON.parse(data);
            console.log("received host data:", hostDataObject);
            switch (hostDataObject.hostObjectType as HostObjectType) {
                case HostObjectType.Signal:
                    Client.receiveSignal(hostDataObject.signal);
                    break;
                case HostObjectType.StartGame:
                    Helpers.startCountdown();
                    break;
                case HostObjectType.ResetGame:
                    console.log(hostDataObject.fruitSeed);
                    seed = hostDataObject.fruitSeed;
                    Game.resetGame();
                    break;
                case HostObjectType.Fruit:
                    Client.clearFruit(hostDataObject.fruitIDs);
                    break;
                case HostObjectType.GameState:
                    Client.updateGameState(hostDataObject.score, hostDataObject.time);
                    break;
                case HostObjectType.GameOver:
                    Game.gameOver();
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
            let data = new ClientDataObject(ClientObjectType.Signal, signal);
            console.log("SIGNAL", signal);
            connection.invoke("SendClientData", lobbyID, JSON.stringify(data));
        });
        p.on('connect', () => {
            console.log('connected');
        });
        p.on('data', data => {
            Helpers.receiveCursor(JSON.parse(data));
        })
        p.on('close', () => {
            Renderer.displayDisconnect();
        });
    }

    public static receiveSignal(signal: string) {
        console.log("RECEIVED", signal);
        p.signal(signal);
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
        let selectedFruits: Fruit[] = Array.from(selected);
        let selectedScore = Helpers.sumOfFruits(selected);
        Helpers.mouseUp(pos, area);
        if (selectedScore == goal) {
            // 1. send fruit to clear
            // 2. host receives fruit to cleare
            // 3. host clears the fruit
            // 4. host sends the fruit it just cleared
            // 5. client receives the fruit that has been cleared and clears it
            let data = new ClientDataObject(ClientObjectType.Fruit, Helpers.getIDsFromFruit(selectedFruits));
            connection.invoke("SendClientData", lobbyID, JSON.stringify(data))
        } else {
            selectedFruits.forEach(Helpers.highlightFruit);
        }
    }

    public static clearFruit(fruitIDsToClear: number[]) {
        for (const id of fruitIDsToClear) {
            if (!fruits[id].cleared) {
                fruits[id].clear();
            }
        }
    }
}
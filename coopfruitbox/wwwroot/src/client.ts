abstract class Client {
    public static setupConnection() {
        connection.on("ReceiveHostData", (data: string) => {
            const hostDataObject: HostDataObject = JSON.parse(data);
            console.log("received host data:", hostDataObject);
            switch (hostDataObject.hostObjectType as HostObjectType) {
                case HostObjectType.Fruit:
                    // given host's fruits to clear, clear them and update score
                    Client.clearFruit(Helpers.getFruitFromIDs(hostDataObject.fruitIDs));
                    break;
                case HostObjectType.NewGame:
                    break;
            }
        });
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
        // TODO: change this so that it takes clears fruit using the rows and columns as args 
        for (const f of fruitsToClear) {
            if (!fruits[f.id].cleared) {
                fruits[f.id].clear();
                score += 1;
            }
        }
        Renderer.updateScore();
    }
}
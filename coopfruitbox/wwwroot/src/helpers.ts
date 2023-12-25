abstract class Helpers {
    public static sendCursor(e: MouseEvent, mouseType: MouseEventType) {
        let pos = Helpers.getMousePosition(canvasContainer, e);
        let down = false, up = false;
        switch (mouseType) {
            case MouseEventType.Down:
                Helpers.mouseDown(pos, selectionArea);
                down = true;
                break;
            case MouseEventType.Move:
                Helpers.mouseMove(pos, selectionArea);
                break;
            case MouseEventType.Up:
                if (playerIsHost) {
                    Host.mouseUp(pos, selectionArea);
                } else {
                    Client.mouseUp(pos, selectionArea);
                }
                up = true;
                break;
        }
        Renderer.drawSelectionArea(selectionDiv, selectionArea);
        connection.send("DisplayCursor", lobbyID, pos.x, pos.y, down, up);
    }

    public static getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
        const rect: DOMRect = canvas.getBoundingClientRect() as DOMRect;
        let x = Math.min(Math.max(0, e.clientX - rect.left), rect.width - 8);
        let y = Math.min(Math.max(0, e.clientY - rect.top), rect.height - 8);
        return new MousePosition(Math.round(x), Math.round(y));
    }

    public static getFruitFromIDs(ids: number[]) {
        let lst: Fruit[] = [];
        for (const id of ids) {
            lst.push(fruits[id]);
        }
        return lst;
    }

    public static getIDsFromFruit(fts: Fruit[]) {
        let ids: number[] = [];
        for (const f of fts) {
            ids.push(f.id);
        }
        return ids;
    }

    public static fruitInArea(f: Fruit, area: MouseSelectionArea) {
        let center_x = f.x + fruit_radius / 2;
        let center_y = f.y + fruit_radius / 2;
        let [x1, x2, y1, y2] = area.getCoordsInOrder();
        return (x1 < center_x && center_x < x2 && y1 < center_y && center_y < y2) 
    }

    public static sumOfFruits(selectedSet: Set<Fruit>) {
        let sum = 0;
        for (let f of <Fruit[]>Array.from(selectedSet)) {
            sum += f.value;
        }
        return sum;
    }

    public static highlightFruit(f: Fruit) {
        f.draw();
    }

    public static mouseDown(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = false;
        area.initialPos = pos;
        area.currentPos = pos;
    }

    public static mouseMove(pos: MousePosition, area: MouseSelectionArea) {
        let selectedSet = (area == selectionArea) ? selected : selectedByOther;
        if (!area.hidden) {
            area.currentPos = pos;
            for (let f of fruits) {
                if (!f.cleared && Helpers.fruitInArea(f, area)) {
                    selectedSet.add(f);
                } else {
                    selectedSet.delete(f);
                }
                f.draw();
            }
            fruits.forEach(Helpers.highlightFruit);
        }
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        fruits.forEach(Helpers.highlightFruit);
    }

    public static resetTimer() {
        clearInterval(timerInterval);
        timerInterval = false;
    }

    public static startCountdown() {
        startSoloButton.style.display = "none";
        createLobbyButton.style.display = "none";
        time = 3;
        Helpers.resetTimer();
        let countdownTick = (playerIsHost) ? Host.countdownTick : Client.countdownTick;
        countdownTick();
        timerInterval = setInterval(countdownTick, 1000);
    }
}
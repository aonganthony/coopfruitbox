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

    public static getAllFruitInArea(area: MouseSelectionArea) {
        let selectedFruits: Fruit[] = [];
        for (let f of fruits) {
            if (Helpers.fruitInArea(f, area) && !f.cleared) {
                selectedFruits.push(f);
            }
        }
        return selectedFruits;
    }

    public static fruitInArea(f: Fruit, area: MouseSelectionArea) {
        let center_x = f.x + fruit_radius / 2;
        let center_y = f.y + fruit_radius / 2;
        let [x1, x2, y1, y2] = area.getCoordsInOrder();
        return (x1 < center_x && center_x < x2 && y1 < center_y && center_y < y2) 
    }

    public static highlightFruit(f: Fruit) {
        f.selected = Helpers.fruitInArea(f, selectionArea);
        f.selectedByOther = Helpers.fruitInArea(f, otherSelectionArea);
        f.draw();
    }

    public static mouseDown(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = false;
        area.initialPos = pos;
        area.currentPos = pos;
    }

    public static mouseMove(pos: MousePosition, area: MouseSelectionArea) {
        if (area.hidden) {
            // area.initialPos = pos;
        }
        if (!area.hidden) {
            area.currentPos = pos;
            fruits.forEach(Helpers.highlightFruit);
        }
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        fruits.forEach(Helpers.highlightFruit);
    }

    /* public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        let s = 0
        let selectedFruits: Fruit[] = Helpers.getAllFruitInArea(selectionArea);
        for (const f of selectedFruits) {
            if (f.selected && !f.cleared) {
                s += f.value;
            }
        }

        if (s == 10) {
            for (const f of fruits) {
                if ((f.selected || f.selectedByOther) && !f.cleared) { // if selected sum up to 10
                    f.clear();
                    score += 1;
                    scoreText.innerText = score.toString();
                }
            }
        } else {
            fruits.forEach(Helpers.highlightFruit);
        }

    } */

    public static resetTimer() {
        clearInterval(timerInterval);
        timerInterval = 0;
    }

    public static startGameTimer() {
        startSoloButton.style.display = "none";
        createLobbyButton.style.display = "none";
        time = startTime;
        Helpers.gameTick(); // initial func call here to jumpstart setInterval
        timerInterval = setInterval(Helpers.gameTick, 1000);
    }

    public static gameTick() {
        Renderer.updateTimer();
        if (time <= 0) {
            Helpers.resetTimer();
            Game.gameOver();
        } else {
            time -= 1;
        }
    }

    public static startCountdown() {
        startSoloButton.style.display = "none";
        createLobbyButton.style.display = "none";
        time = 3;
        Helpers.countdownTick();
        timerInterval = setInterval(Helpers.countdownTick, 1000);
    }

    public static countdownTick() {
        Renderer.displayCountdown();
        if (time <= 0) {
            Helpers.resetTimer();
            Game.resetGame();
        } else {
            time -= 1;
        }
    }
}
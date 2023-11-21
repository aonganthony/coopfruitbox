abstract class Helpers {
    public static getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
        const rect: DOMRect = canvas.getBoundingClientRect() as DOMRect;
        let x = Math.min(Math.max(0, e.clientX - rect.left), rect.width - 8);
        let y = Math.min(Math.max(0, e.clientY - rect.top), rect.height - 8);
        return new MousePosition(Math.round(x), Math.round(y));
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
            area.initialPos = pos;
        }
        area.currentPos = pos;
        if (!area.hidden) {
            fruits.forEach(Helpers.highlightFruit);
        }
    }

    public static mouseUp(pos: MousePosition, area: MouseSelectionArea) {
        area.hidden = true;
        area.initialPos = pos;
        area.currentPos = pos;
        for (const f of fruits) {
            if (f.selected || f.selectedByOther) { // if selected sum up to 10
                f.clear();
            }
        }
    }
}
abstract class Helpers {
    public static getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
        const rect: DOMRect = canvas.getBoundingClientRect() as DOMRect;
        let x = Math.min(Math.max(0, e.clientX - rect.left), rect.width - 8);
        let y = Math.min(Math.max(0, e.clientY - rect.top), rect.height - 8);
        return new MousePosition(Math.round(x), Math.round(y));
    }
}
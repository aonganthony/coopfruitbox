abstract class Helpers {
    public static getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
        const rect: DOMRect = canvas.getBoundingClientRect() as DOMRect;
        return new MousePosition(e.clientX - rect.left, e.clientY - rect.top);
    }
}
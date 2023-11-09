console.log('here')
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/gameHub")
    .build();


connection.on("receiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
    console.log('updating with', x, y);
    Renderer.drawOtherMouse(x, y);
});

connection.start().catch((err: any) => console.log(err));

gameCanvas.addEventListener("mousemove", (e: MouseEvent) => {
    let mousePos: MousePosition = Helpers.getMousePosition(gameCanvas, e);
    let x: number = mousePos.x;
    let y: number = mousePos.y;
    console.log(x, y, e.clientX, e.clientY)
    connection.send("DisplayCursor", x, y);
})
console.log('here')
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/gameHub")
    .build();


connection.on("receiveCursor", (x: number, y: number) => {
    console.log('updating with', x, y)
    gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(x, y, 5, 0, Math.PI * 2, false)
    gameCanvasContext.fillStyle = 'red'
    gameCanvasContext.fill()
    gameCanvasContext.drawImage(cursorImage, x, y);
});

connection.start().catch((err: any) => console.log(err));

gameCanvas.addEventListener("mousemove", (e: MouseEvent) => {
    let mousePos: MousePosition = Helpers.getMousePosition(gameCanvas, e);
    let x: number = mousePos.x;
    let y: number = mousePos.y;
    console.log(x, y, e.clientX, e.clientY)
    connection.send("DisplayCursor", x, y);
})
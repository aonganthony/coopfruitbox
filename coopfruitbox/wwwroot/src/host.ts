import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();


connection.on("receiveCursor", (cursorX, cursorY) => {
    // Draw cursor onto canvas
    gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)

    // Get the local x/y coordinates of the mouse on the canvas
    let x = cursorX - gameCanvas.offsetLeft
    let y = cursorY - gameCanvas.offsetTop

    // Draw cursor image where the mouse is
    gameCanvasContext.fillStyle = "rgba(255,255,255,0.5)";
    gameCanvasContext.drawImage(cursorImage, cursorX, cursorY);
});

connection.start();

gameCanvas.addEventListener("mousemove", (e: MouseEvent) => {
    connection.send("displayCursor", e.clientX, e.clientY);
})
console.log('here')
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/gameHub")
    .build();


connection.on("receiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
    console.log('updating with', x, y);
    let pos = new MousePosition(x, y);
    if (down) {
        otherSelectionArea.hidden = false;
        otherSelectionArea.initialPos = pos;
    } else if (up) {
        otherSelectionArea.hidden = true;
    } else {
        otherSelectionArea.currentPos = pos;
    }
    Renderer.drawOtherMouse(pos);
    Renderer.drawSelectionArea(otherSelectionDiv, otherSelectionArea);
});

connection.start().catch((err: any) => console.log(err));


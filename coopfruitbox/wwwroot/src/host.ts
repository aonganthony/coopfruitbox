console.log('here')
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/gameHub")
    .build();


connection.on("receiveCursor", (x: number, y: number, down: boolean, up: boolean) => {
    // console.log('updating with', x, y, down, up);
    let pos = new MousePosition(x, y);
    if (down) {
        Helpers.mouseDown(pos, otherSelectionArea);
    } else if (up) {
        Helpers.mouseUp(pos, otherSelectionArea);
    } else {
        Helpers.mouseMove(pos, otherSelectionArea);
    }
    Renderer.drawOtherMouse(pos);
    Renderer.drawSelectionArea(otherSelectionDiv, otherSelectionArea);
});

connection.start().catch((err: any) => console.log(err));


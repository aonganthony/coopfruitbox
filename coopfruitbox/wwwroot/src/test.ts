let testOtherMouseCanvas: HTMLCanvasElement = document.getElementById("test-other-mouse-canvas") as HTMLCanvasElement;
let testOtherMouseCanvasContext = testOtherMouseCanvas.getContext("2d");

let incoming: HTMLTextAreaElement = document.getElementById("incoming") as HTMLTextAreaElement;

p = new SimplePeer({
    initiator: location.hash === '#1',
    trickle: false
})

p.on('error', err => console.log('error', err))

p.on('signal', data => {
    console.log('SIGNAL', JSON.stringify(data))
    document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.querySelector('form').addEventListener('submit', ev => {
    ev.preventDefault();
    p.signal(JSON.parse(incoming.value))
})

p.on('connect', () => {
    console.log('CONNECT')
    // track mouse
    onmousemove = function (e) {
        let data = JSON.stringify([e.clientX, e.clientY]);
        console.log('sending ', data)
        p.send(data);
    }
})



p.on('data', data => {
    let e = JSON.parse(data);
    console.log("received e: ", e);
    let x = e[0]
    let y = e[1]
    console.log("received data: ", x, y);
    // receive cursor as data, display cursor
    testOtherMouseCanvasContext.clearRect(0, 0, testOtherMouseCanvas.width, testOtherMouseCanvas.height);
    testOtherMouseCanvasContext.beginPath();
    testOtherMouseCanvasContext.arc(x, y, 5, 0, Math.PI * 2, false)
    testOtherMouseCanvasContext.fillStyle = 'red'
    testOtherMouseCanvasContext.fill()
});

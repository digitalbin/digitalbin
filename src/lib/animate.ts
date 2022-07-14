export default function animate(callback: (time: number) => void) {
    function loop(time: number) {
        callback(time);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

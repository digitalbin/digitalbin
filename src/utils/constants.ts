function forceEven(int: number) {
    return int - int % 2;
}
export const size = forceEven(Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10));
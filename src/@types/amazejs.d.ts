declare module 'amazejs' {
  export class Backtracker {
    width: number;
    height: number;

    constructor(width: number, height: number) {}

    reset: () => void;
    generate: () => void;
    get: (x: number, y: number) => number;
    solve: (start: [number, number], end: [number, number]) => number[][];

  }
}

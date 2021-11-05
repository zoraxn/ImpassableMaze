import { RefObject } from 'react'
import { GyroscopeData2D, Direction } from '@limbus-mini-apps';
import amaze from 'amazejs';
import {COLORS} from "./constants";

export const generateMaze = (size = 60) => {
  const maze = new amaze.Backtracker(size, size);
  maze.reset();
  maze.generate();
  return maze;
};


export const _generate = (maze: amaze.Backtracker, cellSize: number, ref: RefObject<HTMLCanvasElement>) => {
  if (ref.current) {
    ref.current.width = maze.width * cellSize;
    ref.current.height = maze.height * cellSize;

    const context = ref.current.getContext('2d');

    if (context) {
      context.fillStyle = COLORS.mazeBackground;
      for (let i = 0; i < maze.width; i++) {
        for (let j = 0; j < maze.height; j++) {
          if (maze.get(i, j)) {
            context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
    }
  }
};

export const solveMaze = (maze: amaze.Backtracker, cellSize: number, ref: RefObject<HTMLCanvasElement>) => {
  if (ref.current) {
    const ctx = ref.current.getContext('2d');
    const sln = maze.solve([1, 1], [maze.height - 2, maze.width - 2]);

    if (ctx) {
      ctx.fillStyle = COLORS.pathColor;

      for (let i = 0; i < sln.length; i++) {
        ctx.fillRect(sln[i][0] * cellSize, sln[i][1] * cellSize, cellSize, cellSize);
      }

      ctx.fillStyle = COLORS.startPosition;
      ctx.fillRect(cellSize, cellSize, cellSize, cellSize);

      ctx.fillStyle = COLORS.endPosition;
      ctx.fillRect(cellSize * (maze.width - 2), cellSize * (maze.height - 2), cellSize, cellSize);
    }
  }
};

export const changePosition = (position: GyroscopeData2D, sign: number, direction: Direction, maze: amaze.Backtracker): number => {
  switch (direction) {
    case 'x': {
      if (sign < 0 && maze.get(position.x - 1, position.y)) {
        return position.x - 1;
      }

      if (sign > 0 && maze.get(position.x + 1, position.y)) {
        return position.x + 1;
      }

      return position.x;
    }

    case 'y': {
      if (sign < 0 && maze.get(position.x, position.y - 1)) {
        return position.y - 1;
      }

      if (sign > 0 && maze.get(position.x, position.y + 1)) {
        return position.y + 1;
      }

      return position.y;
    }
  }
}

export const getOppositeDirection = (x: Direction): Direction => x !== 'x' ? 'x' : 'y';

export const getDirection = (x: number, y: number): Direction => Math.abs(x) <= Math.abs(y) ? 'x': 'y';

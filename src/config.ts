import {Direction, GyroscopeData2D, GyroscopeData3D} from "@limbus-mini-apps";


export const DIFF_MAX = 0.1;
export const DIFF_MIN = 0.02;
export const START_LEVEL = 1;
export const START_MAZE_SIZE = 3;
export const CELL_SIZE = 8;
export const SPEED_MULTIPLIER_X = 0.04;
export const SPEED_MULTIPLIER_Y = 0.06;
export const GYROSCOPE_INIT: GyroscopeData3D = {
  x: 0,
  y: 0,
  z: 0,
};

export type GyroscopeChange = {
  position: GyroscopeData2D;
  velocity: GyroscopeData2D;
  previousPosition: GyroscopeData2D;
  previousVelocity: GyroscopeData2D;
} & Partial<{
  sign: number;
  direction: Direction;
}>;

export const GYROSCOPE_INIT_CHANGE: GyroscopeChange = {
  position: { x: 1, y: 1 },
  velocity: { x: 0, y: 0 },
  previousPosition: { x: 1, y: 1 },
  previousVelocity: { x: 0, y: 0 },
};

import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAdaptivity, ViewWidth, Group } from '@vkontakte/vkui';
import { GyroscopeData2D } from '@limbus-mini-apps';
import amaze from 'amazejs';

import { COLORS } from '../../utils/constants';
import { _generate, solveMaze } from '../../utils/functions';

const Canvas = styled.canvas`
  background-color: ${COLORS.mazeEdge};
`;

const Container = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
`;

export type MazeProps = {
  maze: amaze.Backtracker;
  position: GyroscopeData2D;
  prevPosition: GyroscopeData2D;
};

export const Maze: React.FC<MazeProps> = ({ maze, position, prevPosition }) => {
  const { viewWidth } = useAdaptivity();

  const ref = useRef<HTMLCanvasElement>(null);

  const cellSize = useMemo(() => {
    switch (viewWidth) {
      case ViewWidth.MOBILE:
        return 10;
      case ViewWidth.TABLET:
        return 16;
      default:
        return 32;
    }
  }, [viewWidth]);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext('2d');
      if (context) {
        context.clearRect(0, 0, ref.current.width, ref.current.height);
      }
    }
    _generate(maze, cellSize, ref);
    setTimeout(() => solveMaze(maze, cellSize, ref), 500);
  }, [maze, ref, cellSize]);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext('2d');
      if (context) {
        context.fillStyle = COLORS.mazeBackground;
        context.fillRect(prevPosition.x * cellSize, prevPosition.y * cellSize, cellSize, cellSize);

        context.fillStyle = COLORS.playerColor;
        context.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
      }
    }
  }, [maze, position, prevPosition, ref, cellSize]);

  return (
    <Group>
      <Container>
        <Canvas ref={ref} />
      </Container>
    </Group>
  );
};

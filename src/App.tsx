import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  SplitLayout,
  Panel,
  Group,
  PanelHeader,
  withAdaptivity,
} from '@vkontakte/vkui';
import amaze from 'amazejs';
import bridge, { VKBridgeEvent, AnyReceiveMethodName, ErrorData } from '@vkontakte/vk-bridge';
import { GyroscopeData2D, GyroscopeData3D } from '@limbus-mini-apps';

import { generateMaze, getDirection, getOppositeDirection, changePosition } from './utils/functions';
import { PanelWrapper } from './utils/wrappers';
import { Maze } from './components/Maze';
import { CommonStyles } from './utils/commonStyles';
import {
  DIFF_MAX,
  DIFF_MIN,
  GYROSCOPE_INIT,
  GYROSCOPE_INIT_CHANGE,
  START_LEVEL,
  CELL_SIZE,
  START_MAZE_SIZE,
  GyroscopeChange, SPEED_MULTIPLIER_X, SPEED_MULTIPLIER_Y
} from "./config";
import {InfoBlock} from "./components/InfoBlock";

const Container = styled.main`
  width: 100%;
`;

const App: React.FC = () => {
  const [level, setLevel] = useState(START_LEVEL);
  const [maze, setMaze] = useState<amaze.Backtracker>(generateMaze(START_MAZE_SIZE + CELL_SIZE * level));
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [operation, setGyroscopeChange] = useState<GyroscopeChange>(GYROSCOPE_INIT_CHANGE);
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData3D>(GYROSCOPE_INIT);
  const [gyroscopeError, setGyroscopeError] = useState<ErrorData>();

  useEffect(() => {
    const size = START_MAZE_SIZE + CELL_SIZE * level;
    if (size !== maze.width) {
      setMaze(() => generateMaze(START_MAZE_SIZE + CELL_SIZE * level));
      console.log('New maze generated');
    }
  }, [maze.width, level, setMaze]);

  useEffect(() => {
    const setNextLevel = async () => {
      if (maze && operation.position.x === maze.width - 2 && operation.position.y === maze.height - 2) {
        await bridge.send('VKWebAppGyroscopeStop');
        setTimeout(() => {
          setLevel((prev) => prev + 1);
          setGyroscopeChange(() => GYROSCOPE_INIT_CHANGE);
        }, 1000);
      }
    };
    setNextLevel();
  }, [maze, operation, setLevel]);

  useEffect(() => {
    // @ts-ignore
    bridge.send('VKWebAppGyroscopeStart', {"refresh_rate": 80});
    bridge.subscribe(({ detail }: VKBridgeEvent<AnyReceiveMethodName>) => {
      switch (detail.type) {
        case 'VKWebAppUpdateConfig': {
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = detail.data.scheme ? detail.data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
          break;
        }

        case 'VKWebAppGyroscopeStartResult': {
          setIsAvailable(() => detail.data.result);
          break;
        }

        case 'VKWebAppGyroscopeStartFailed': {
          setGyroscopeError(() => detail.data);
          break;
        }

        case 'VKWebAppGyroscopeChanged': {
          if (maze === undefined) {
            console.warn('Maze is undefined!')
            return;
          }
          const data = {
            x: parseFloat(detail.data.x),
            y: parseFloat(detail.data.y),
            z: parseFloat(detail.data.z),
          };
          setGyroscopeData(() => data);
          setGyroscopeChange((pos) => {
            if (pos.direction && pos.sign) {
              const oppositeDir = getOppositeDirection(pos.direction);
              const oppositeSign = Math.sign(data[oppositeDir]);
              const difference = Math.abs(data[oppositeDir] - pos.velocity[oppositeDir]);

              if (difference <= DIFF_MAX || (difference > DIFF_MIN && pos.sign === oppositeSign)) {
                return {
                  sign: pos.sign,
                  direction: pos.direction,
                  previousPosition: pos.position,
                  previousVelocity: pos.velocity,
                  position: {
                    [oppositeDir]: pos.position[oppositeDir],
                    [pos.direction]: changePosition(pos.position, pos.sign, pos.direction, maze),
                  } as GyroscopeData2D,
                  velocity: { x: data.x * SPEED_MULTIPLIER_X, y: data.y * SPEED_MULTIPLIER_Y },
                };
              }
            }

            if (Math.abs(data.x) > DIFF_MIN || Math.abs(data.y) > DIFF_MIN) {
              const speedX = data.x * SPEED_MULTIPLIER_X;
              const speedY = data.y * SPEED_MULTIPLIER_Y;
              const mainDirection = getDirection(speedX, speedY);
              const secondaryDirection = getOppositeDirection(mainDirection);
              const sign = Math.abs(speedX) > Math.abs(speedY) ? Math.sign(speedX) : Math.sign(speedY);
              return {
                sign,
                direction: mainDirection,
                position: {
                  [secondaryDirection]: pos.position[secondaryDirection],
                  [mainDirection]: changePosition(pos.position, Math.sign(speedX), mainDirection, maze),
                } as GyroscopeData2D,
                velocity: { x: speedX, y: speedY },
                previousPosition: pos.position,
                previousVelocity: pos.velocity,
              };
            }
            return pos;
          });
          break;
        }
      }

      return () => {
        bridge.send('VKWebAppGyroscopeStop');
      };
    });
  }, [maze]);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <Container>
              <CommonStyles />

              <PanelWrapper id="home">
                <Panel id="home">
                  <PanelHeader>Непроходимый лабиринт</PanelHeader>
                  <InfoBlock
                      titleText={'Инфо'}
                      valueText={'Попробуй пройти лабиринт :) Осторожно! Есть блоки, которые могут разрушаться от большой скорости!'}
                  />
                  {!isAvailable ?
                      <InfoBlock
                          titleText={`Ошибка`}
                          valueText={'Гироскоп не доступен!'}
                      /> : undefined
                  }

                  {isAvailable ? (
                      <InfoBlock
                          titleText={`Gyroscope received data:`}
                          valueText={
                            `x: ${gyroscopeData.x.toFixed(2)},
                         y: ${gyroscopeData.y.toFixed(3)},
                         z: ${gyroscopeData.z.toFixed(2)}`
                          }
                      />
                  ) : undefined}


                  {gyroscopeError && (
                      <InfoBlock
                          titleText={'Error'}
                          valueText={`
                            ${gyroscopeError.error_type}\n
                            ${JSON.stringify(gyroscopeError.error_data)}
                          `}
                      />
                  )}

                  {maze && (
                    <Group  style={{flex:1}}>
                      <Maze maze={maze} position={operation.position} prevPosition={operation.previousPosition} />
                    </Group>
                  )}
                </Panel>
              </PanelWrapper>
            </Container>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default withAdaptivity(App, { viewWidth: true });

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
  GyroscopeChange
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
    bridge.send('VKWebAppGyroscopeStart');
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
                  velocity: { x: data.x, y: data.y },
                };
              }
            }

            if (Math.abs(data.x) > DIFF_MIN || Math.abs(data.y) > DIFF_MIN) {
              const mainDirection = getDirection(data.x, data.y);
              const secondaryDirection = getOppositeDirection(mainDirection);
              const sign = Math.abs(data.x) > Math.abs(data.y) ? Math.sign(data.x) : Math.sign(data.y);
              return {
                sign,
                direction: mainDirection,
                position: {
                  [secondaryDirection]: pos.position[secondaryDirection],
                  [mainDirection]: changePosition(pos.position, Math.sign(data.x), mainDirection, maze),
                } as GyroscopeData2D,
                velocity: { x: data.x, y: data.y },
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
                  <PanelHeader>Непроходимый лабиринт by Romb</PanelHeader>
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
                    <Group style={{ padding: '0.3rem 0.5rem' }}>
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

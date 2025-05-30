import stylex from '@stylexjs/stylex';
import React, { useLayoutEffect, useState } from 'react';
import { Board } from './game/Board';
import { BOARD_SIZE, GAME } from '../game/gameSetup';
import { PinchZoom, PinchZoomRef } from '../ui/PinchZoom';
import { TileKey } from '../game/boardSetup';
import { Player } from '../game/playerSetup';
import { Tray } from './game/Tray';

const styles = stylex.create({
  center: {
    width: '100dvw',
    height: '100dvh',
    overflow: 'hidden',
    touchAction: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  pincher: {
    height: 0,
    flex: '1 1 0',
    zIndex: 1,
  },
  tray: {
    zIndex: 2,
    flexShrink: 0,
  },
});

const getCenter = (scale: number) => {
  const { height, width } = visualViewport;

  const x = (BOARD_SIZE * scale - width) / -2;
  const y = (BOARD_SIZE * scale - height) / -2;

  return { x, y };
};

const getPlayerCenter = (player: Player, scale: number) => {
  const {
    positionXY: [positionX, positionY],
  } = player;
  const x = -positionX * scale + visualViewport.width / 2;
  const y = -positionY * scale + visualViewport.height / 2;

  return { x, y };
};

export default function GameRoute() {
  const ref = React.useRef<PinchZoomRef>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ref.current?.setTransform({
      ...getCenter(0.5),
      scale: 0.5,
    });
  }, []);

  const onClickTile = (tileKey: TileKey, rect: DOMRect) => {
    setGameState((prevState) => {
      return {
        ...prevState,
        players: prevState.players.map((player, index) => {
          if (index !== prevState.activePlayerId) {
            return player;
          }
          return {
            ...player,
            position: tileKey,
            unconsumedDiceRoll: null, // Reset the dice roll after moving
            positionXY: [rect.x + rect.width / 2, rect.y + rect.height / 2],
          };
        }),
      };
    });
  };

  const [gameState, setGameState] = useState(GAME);

  return (
    <div {...stylex.props(styles.center)}>
      <div {...stylex.props(styles.pincher)}>
        <PinchZoom ref={ref}>
          <div
            ref={innerRef}
            style={{
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              background:
                'radial-gradient(circle at center, #22479D, #22479D00, #22479D00)',
            }}
          >
            <Board onClickTile={onClickTile} gameState={gameState} />
          </div>
        </PinchZoom>
      </div>
      <Tray
        styles={styles.tray}
        gameState={gameState}
        onClickDice={() => {
          setGameState((prevState) => {
            const unconsumedDiceRoll = Math.floor(Math.random() * 6) + 1;
            if (unconsumedDiceRoll >= 5) {
              ref.current.setTransform({
                ...getPlayerCenter(
                  prevState.players[prevState.activePlayerId],
                  0.33,
                ),
                scale: 0.33,
                animate: true,
              });
            }

            return {
              ...prevState,
              players: prevState.players.map((player, index) => {
                if (index !== prevState.activePlayerId) {
                  return player;
                }
                return {
                  ...player,
                  unconsumedDiceRoll,
                };
              }),
            };
          });
        }}
        onClickCheeses={() => {
          alert('keep ur own score lol');
        }}
        onClickNext={() => {
          setGameState((prevState) => {
            const nextPlayerId =
              (prevState.activePlayerId + 1) % prevState.players.length;

            ref.current.setTransform({
              ...getPlayerCenter(prevState.players[nextPlayerId], 0.5),
              scale: 0.5,
              animate: true,
            });

            return {
              ...prevState,
              activePlayerId: nextPlayerId,
            };
          });
        }}
      />
    </div>
  );
}

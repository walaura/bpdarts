import stylex from "@stylexjs/stylex";
import React, { useState } from "react";
import { Board } from "./game/Board";
import { BOARD_SIZE, GAME } from "../game/gameSetup";
import { PinchZoom, PinchZoomRef } from "../ui/PinchZoom";
import { TileKey } from "../game/boardSetup";
import { Player } from "../game/playerSetup";

const styles = stylex.create({
  center: {
    width: "100dvw",
    height: "100dvh",
    overflow: "hidden",
    touchAction: "none",
    display: "flex",
    flexDirection: "column",
  },
  pincher: {
    height: 0,
    flex: "1 1 0",
    zIndex: 1,
  },
  tray: {
    willChange: "transform",
    zIndex: 2,
    flexShrink: 0,
    padding: "0.5em",
    backgroundColor: "var(--sheet)",
    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1)",
    borderRadius: "0.5em 0.5em 0 0",
  },
});

const getCenter = () => {
  const { height, width } = visualViewport;

  const x = (BOARD_SIZE - width) / -2;
  const y = (BOARD_SIZE - height) / -2;

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

  const onClickTile = (tileKey: TileKey, rect: DOMRect) => {
    console.log(`Tile clicked: ${tileKey}`, rect);
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
            positionXY: [rect.x + rect.width / 2, rect.y + rect.height / 2],
            // unconsumedDiceRoll: null, // Reset the dice roll after moving
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
                "radial-gradient(circle at center, #22479D, #22479D00, #22479D00)",
            }}
          >
            <Board onClickTile={onClickTile} gameState={gameState} />
          </div>
        </PinchZoom>
      </div>
      <div {...stylex.props(styles.tray)}>
        <button
          onClick={() => {
            ref.current.setTransform({
              ...getCenter(),
              scale: 1,
              animate: true,
            });
          }}
        >
          center on board
        </button>
        <button
          onClick={() => {
            const player = gameState.players[gameState.activePlayerId];
            ref.current.setTransform({
              ...getPlayerCenter(player, 0.75),
              scale: 0.75,
              animate: true,
            });
          }}
        >
          center on player
        </button>
        <button
          onClick={() => {
            setGameState((prevState) => {
              const nextPlayerId =
                (prevState.activePlayerId + 1) % prevState.players.length;

              ref.current.setTransform({
                ...getPlayerCenter(prevState.players[nextPlayerId], 0.75),
                scale: 0.75,
                animate: true,
              });

              return {
                ...prevState,
                activePlayerId: nextPlayerId,
              };
            });
          }}
        >
          next player
        </button>
        <hr />
        player {gameState.activePlayerId + 1}{" "}
        <PlayerDeets player={gameState.players[gameState.activePlayerId]} />
      </div>
    </div>
  );
}

function PlayerDeets({ player }: { player: Player }) {
  return (
    <>
      Position: {player.position}, Color: {player.color}
    </>
  );
}

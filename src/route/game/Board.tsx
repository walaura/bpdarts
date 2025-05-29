import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { TileKey } from "../../game/boardSetup";
import { traverseBoard } from "../../game/traverseBoard";
import { BoardSvg } from "./BoardSvg";
import { BOARD_SIZE, Game } from "../../game/gameSetup";

const BoardContext = React.createContext<{
  hovered: TileKey | null;
  setHovered: (TileKey: TileKey | null) => void;
  onClick: (tileKey: TileKey, rect: DOMRect) => void;
  next: TileKey[];
  setNext: (next: TileKey[]) => void;
}>({
  hovered: null,
  setHovered: () => {},
  onClick: () => {},
  next: [],
  setNext: () => {},
});

export const useBoardContext = () => useContext(BoardContext);

export function Board({
  gameState,
  onClickTile,
}: {
  gameState: Game;
  onClickTile: (tileKey: TileKey, rect: DOMRect) => void;
}) {
  const [hovered, _setHovered] = useState<TileKey | null>(null);
  const [next, setNext] = useState<TileKey[]>([]);

  const setHovered = useCallback(
    (tileKey: TileKey | null) => {
      _setHovered(tileKey);
      const next = traverseBoard(tileKey, 6);
      setNext(next);
    },
    [_setHovered, setNext]
  );

  return (
    <BoardContext.Provider
      value={{ hovered, setHovered, next, setNext, onClick: onClickTile }}
    >
      <div
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          position: "relative",
        }}
      >
        {gameState.players.map((player, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: player.positionXY[0],
              top: player.positionXY[1],
              fontSize: 4,
              backgroundColor: "red",
              color: "white",
            }}
          >
            Player {index + 1} - Position: {player.position}, Color:{" "}
            {player.color}
          </div>
        ))}
        <BoardSvg />
      </div>
    </BoardContext.Provider>
  );
}

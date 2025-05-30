import React, { useContext, useMemo } from 'react';

import { COLOR_FOR_COLOR, TileKey } from '../../game/boardSetup';
import { traverseBoard } from '../../game/traverseBoard';
import { BoardSvg } from './BoardSvg';
import { BOARD_SIZE, Game } from '../../game/gameSetup';

const BoardContext = React.createContext<{
  onClick: (tileKey: TileKey, rect: DOMRect) => void;
  next: TileKey[];
}>({
  onClick: () => {},
  next: [],
});

export const useBoardContext = () => useContext(BoardContext);

export function Board({
  gameState,
  onClickTile,
}: {
  gameState: Game;
  onClickTile: (tileKey: TileKey, rect: DOMRect) => void;
}) {
  const player = useMemo(
    () => gameState.players[gameState.activePlayerId],
    [gameState.players, gameState.activePlayerId],
  );

  const next = useMemo(() => {
    if (!player.unconsumedDiceRoll) {
      return [];
    }
    return traverseBoard(player.position, player.unconsumedDiceRoll);
  }, [player.position, player.unconsumedDiceRoll]);

  return (
    <BoardContext.Provider
      value={{
        next,
        onClick: onClickTile,
      }}
    >
      <div
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          position: 'relative',
        }}
      >
        {gameState.players.map((player, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: player.positionXY[0],
              top: player.positionXY[1],
              fontSize: 16,
              transition: 'all 0.2s ease',
              backgroundColor: COLOR_FOR_COLOR[player.color],
              color: 'black',
              borderRadius: '50%',
              width: '2em',
              height: '2em',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {index + 1}
          </div>
        ))}
        <BoardSvg />
      </div>
    </BoardContext.Provider>
  );
}

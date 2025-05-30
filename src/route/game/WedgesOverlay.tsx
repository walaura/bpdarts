import React from 'react';
import { Color, COLOR_FOR_COLOR } from '../../logic/boardSetup';
import { Game } from '../../logic/gameSetup';
import { Overlay } from '../../ui/Overlay';
import { Pie } from '../../ui/drawables/Pie';
import stylex from '@stylexjs/stylex';
import { Flexbox } from '../../ui/styles/Flexbox';

const styles = stylex.create({
  pie: (backgroundColor: string) => ({
    borderRadius: '50%',
    padding: '.5rem',
    flexGrow: 0,
    width: '300px',
    height: '300px',
    backgroundColor,
    backgroundBlendMode: 'overlay',
    backgroundImage:
      'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.12) 100%)',
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.50), inset 0 1px 1px 0 rgba(255,255,255,0.4), inset 0 -1px 1px 0 rgba(0,0,0,0.4)',
  }),
  innerPie: {
    width: '100%',
    height: '100%',
    transform: 'scale(1.05)',
  },
});

export function WedgesOverlay({
  gameState,
  onAssignWedge,
  onClose,
}: {
  gameState: Game;
  onAssignWedge: (playerIndex: number, wedges: Color[]) => void;
  onClose: () => void;
}) {
  const player = gameState.players[gameState.activePlayerId];
  const playerColor = COLOR_FOR_COLOR[player.color];
  return (
    <Overlay onClose={onClose}>
      <Flexbox direction="column" align="center" gap={16}>
        Wedges for Player {gameState.activePlayerId + 1}
        <div {...stylex.props(styles.pie(playerColor))}>
          <Pie
            styles={styles.innerPie}
            onClickWedge={(wedge) => {
              onAssignWedge(
                gameState.activePlayerId,
                player.wedges.includes(wedge)
                  ? player.wedges.filter((w) => w !== wedge)
                  : [...player.wedges, wedge]
              );
            }}
            activeWedges={player.wedges}
          />
        </div>
      </Flexbox>
    </Overlay>
  );
}

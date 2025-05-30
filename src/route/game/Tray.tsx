import stylex, { StyleXStyles } from '@stylexjs/stylex';
import React, { useState } from 'react';
import { Color, COLOR_FOR_COLOR } from '../../game/boardSetup';
import { Game } from '../../game/gameSetup';
import Flexbox from '../../styles/Flexbox';
import { Button } from '../../ui/Button';
import { Overlay } from '../../ui/Overlay';

const styles = stylex.create({
  grow: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '0',
  },
  margin: {
    margin: '.5em',
  },
  tray: (backgroundColor) => ({
    willChange: 'transform',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-left, 0px)',
    backgroundColor,
    backgroundBlendMode: 'overlay',
    backgroundImage:
      'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.12) 100%)',
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.50), inset 0 1px 1px 0 rgba(255,255,255,0.41)',
    borderRadius: '0.5em 0.5em 0 0',
  }),
  nextPlayerBtn: (backgroundColor) => ({ backgroundColor }),
});

export function Tray({
  gameState,
  onClickNext,
  onClickDice,
  onAssignWedge,
  styles: externalStyles,
}: {
  gameState: Game;
  onClickNext: () => void;
  onClickDice?: () => void;
  onAssignWedge?: (playerIndex: number, wedges: Color[]) => void;
  styles?: StyleXStyles;
}) {
  const player = gameState.players[gameState.activePlayerId];
  const nextPlayer =
    gameState.players[
      (gameState.activePlayerId + 1) % gameState.players.length
    ];
  const color = COLOR_FOR_COLOR[player.color];
  const nextPlayerColor = COLOR_FOR_COLOR[nextPlayer.color];

  const [isWedgeOverlayOpen, setIsWedgeOverlayOpen] = useState(false);

  return (
    <>
      <div {...stylex.props(styles.tray(color), externalStyles)}>
        <Flexbox gap={8} styles={styles.margin}>
          <Flexbox gap={8} grow={true}>
            <Button
              label={`Dice - ${player.unconsumedDiceRoll ?? '?'}`}
              onClick={onClickDice}
              styles={styles.grow}
            ></Button>
            <Button
              label={'Cheeses'}
              onClick={() => setIsWedgeOverlayOpen(true)}
              styles={styles.grow}
            ></Button>
          </Flexbox>
          <Button
            label={'Next'}
            styles={styles.nextPlayerBtn(nextPlayerColor)}
            onClick={onClickNext}
          ></Button>
        </Flexbox>
      </div>
      {isWedgeOverlayOpen && (
        <Overlay
          onClose={() => {
            setIsWedgeOverlayOpen(false);
          }}
        >
          Current player is {gameState.activePlayerId} ({player.color}) with
          these wedges
          <br />
          <Flexbox gap={8} styles={styles.margin}>
            {player.wedges.map((wedge) => (
              <div
                key={wedge}
                style={{
                  width: '2em',
                  height: '2em',
                  backgroundColor: COLOR_FOR_COLOR[wedge],
                  borderRadius: '50%',
                }}
              ></div>
            ))}
          </Flexbox>
          <br />
          <Button
            label="Assign Wedges"
            onClick={() => {
              onAssignWedge(gameState.activePlayerId, [Color.Pink, Color.Blue]);
              setIsWedgeOverlayOpen(false);
            }}
          ></Button>
        </Overlay>
      )}
    </>
  );
}

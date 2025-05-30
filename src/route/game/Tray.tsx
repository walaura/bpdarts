import stylex, { StyleXStyles } from '@stylexjs/stylex';
import React, { useState } from 'react';
import { Color, COLOR_FOR_COLOR } from '../../game/boardSetup';
import { Game } from '../../game/gameSetup';
import { Flexbox } from '../../styles/Flexbox';
import { Button } from '../../ui/Button';
import { Overlay } from '../../ui/Overlay';
import { BottomControls } from '../../ui/BottomControls';

const styles = stylex.create({
  grow: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '0',
  },
  tray: (backgroundColor) => ({
    backgroundColor,
    backgroundBlendMode: 'overlay',
    backgroundImage:
      'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.12) 100%)',
    boxShadow:
      '0 2px 4px 0 rgba(0,0,0,0.50), inset 0 1px 1px 0 rgba(255,255,255,0.41)',
    borderRadius: '1rem 1rem 0 0',
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
  onAssignWedge: (playerIndex: number, wedges: Color[]) => void;
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
      <BottomControls styles={[styles.tray(color), externalStyles]}>
        <Flexbox gap={8} grow={true}>
          <Button
            label={`Dice - ${player.unconsumedDiceRoll ?? '?'}`}
            onClick={onClickDice}
            styles={styles.grow}
          ></Button>
          <Button
            label={`Wedges - ${player.wedges.length}`}
            onClick={() => setIsWedgeOverlayOpen(true)}
            styles={styles.grow}
          ></Button>
        </Flexbox>
        <Button
          label={'Next'}
          styles={styles.nextPlayerBtn(nextPlayerColor)}
          onClick={onClickNext}
        ></Button>
      </BottomControls>
      {isWedgeOverlayOpen && (
        <Overlay
          onClose={() => {
            setIsWedgeOverlayOpen(false);
          }}
        >
          Current player is {gameState.activePlayerId} (
          {COLOR_FOR_COLOR[player.color]}) with these wedges
          <br />
          <Flexbox gap={8} direction="column">
            {[
              Color.Blue,
              Color.Green,
              Color.Orange,
              Color.Pink,
              Color.Purple,
              Color.Yellow,
            ].map((wedge) => (
              <Button
                key={wedge}
                icon={
                  player.wedges.includes(wedge) && (
                    <div
                      key={wedge}
                      style={{
                        width: '2em',
                        height: '2em',
                        backgroundColor: COLOR_FOR_COLOR[wedge],
                        borderRadius: '50%',
                      }}
                    ></div>
                  )
                }
                label="Toggle wedge"
                onClick={() => {
                  onAssignWedge(
                    gameState.activePlayerId,
                    player.wedges.includes(wedge)
                      ? player.wedges.filter((w) => w !== wedge)
                      : [...player.wedges, wedge]
                  );
                }}
              ></Button>
            ))}
          </Flexbox>
          <br />
        </Overlay>
      )}
    </>
  );
}

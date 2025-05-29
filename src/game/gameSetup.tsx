import { Color, TileKey } from "./boardSetup";
import { Player } from "./playerSetup";

export type Game = {
  players: Player[];
  activePlayerId: number;
};

export const BOARD_SIZE = 1600;

export const GAME: Game = {
  activePlayerId: 0,
  players: [
    {
      position: TileKey.Center,
      positionXY: [BOARD_SIZE / 2, BOARD_SIZE / 2],
      unconsumedDiceRoll: 2,
      color: Color.Blue,
    },
    {
      position: TileKey.Center,
      positionXY: [BOARD_SIZE / 2, BOARD_SIZE / 2],
      unconsumedDiceRoll: null,
      color: Color.Orange,
    },
  ],
};

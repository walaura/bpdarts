import { Color, TileKey } from "./boardSetup";

export type Player = {
  position: TileKey;
  positionXY: [number, number];
  unconsumedDiceRoll: null | 1 | 2 | 3 | 4 | 5 | 6 | number;
  color: Color;
};

enum Color {
  Blue,
  Pink,
  Yellow,
  Purple,
  Green,
  Orange,
  Any,
}

export const COLOR_FOR_COLOR = {
  [Color.Blue]: "#0090CF",
  [Color.Pink]: "#D1027C",
  [Color.Yellow]: "#FDDA02",
  [Color.Purple]: "#7F3A8B",
  [Color.Green]: "#6EB028",
  [Color.Orange]: "#D7007A",
  [Color.Any]: "#FFFFFF",
};

export enum TileKey {
  Center = "Center",
  Spoke1Tile1 = "Spoke1Tile1",
  Spoke1Tile2 = "Spoke1Tile2",
  Spoke1Tile3 = "Spoke1Tile3",
  Spoke1Tile4 = "Spoke1Tile4",
  Spoke1Tile5 = "Spoke1Tile5",
  Spoke2Tile1 = "Spoke2Tile1",
  Spoke2Tile2 = "Spoke2Tile2",
  Spoke2Tile3 = "Spoke2Tile3",
  Spoke2Tile4 = "Spoke2Tile4",
  Spoke2Tile5 = "Spoke2Tile5",
  Spoke3Tile1 = "Spoke3Tile1",
  Spoke3Tile2 = "Spoke3Tile2",
  Spoke3Tile3 = "Spoke3Tile3",
  Spoke3Tile4 = "Spoke3Tile4",
  Spoke3Tile5 = "Spoke3Tile5",
  Spoke4Tile1 = "Spoke4Tile1",
  Spoke4Tile2 = "Spoke4Tile2",
  Spoke4Tile3 = "Spoke4Tile3",
  Spoke4Tile4 = "Spoke4Tile4",
  Spoke4Tile5 = "Spoke4Tile5",
  Spoke5Tile1 = "Spoke5Tile1",
  Spoke5Tile2 = "Spoke5Tile2",
  Spoke5Tile3 = "Spoke5Tile3",
  Spoke5Tile4 = "Spoke5Tile4",
  Spoke5Tile5 = "Spoke5Tile5",
  Spoke6Tile1 = "Spoke6Tile1",
  Spoke6Tile2 = "Spoke6Tile2",
  Spoke6Tile3 = "Spoke6Tile3",
  Spoke6Tile4 = "Spoke6Tile4",
  Spoke6Tile5 = "Spoke6Tile5",
  WheelCap1 = "WheelCap1",
  Wheel1Tile1 = "Wheel1Tile1",
  Wheel1Tile2 = "Wheel1Tile2",
  Wheel1Tile3 = "Wheel1Tile3",
  Wheel1Tile4 = "Wheel1Tile4",
  Wheel1Tile5 = "Wheel1Tile5",
  Wheel1Tile6 = "Wheel1Tile6",
  WheelCap2 = "WheelCap2",
  Wheel2Tile1 = "Wheel2Tile1",
  Wheel2Tile2 = "Wheel2Tile2",
  Wheel2Tile3 = "Wheel2Tile3",
  Wheel2Tile4 = "Wheel2Tile4",
  Wheel2Tile5 = "Wheel2Tile5",
  Wheel2Tile6 = "Wheel2Tile6",
  WheelCap3 = "WheelCap3",
  Wheel3Tile1 = "Wheel3Tile1",
  Wheel3Tile2 = "Wheel3Tile2",
  Wheel3Tile3 = "Wheel3Tile3",
  Wheel3Tile4 = "Wheel3Tile4",
  Wheel3Tile5 = "Wheel3Tile5",
  Wheel3Tile6 = "Wheel3Tile6",
  WheelCap4 = "WheelCap4",
  Wheel4Tile1 = "Wheel4Tile1",
  Wheel4Tile2 = "Wheel4Tile2",
  Wheel4Tile3 = "Wheel4Tile3",
  Wheel4Tile4 = "Wheel4Tile4",
  Wheel4Tile5 = "Wheel4Tile5",
  Wheel4Tile6 = "Wheel4Tile6",
  WheelCap5 = "WheelCap5",
  Wheel5Tile1 = "Wheel5Tile1",
  Wheel5Tile2 = "Wheel5Tile2",
  Wheel5Tile3 = "Wheel5Tile3",
  Wheel5Tile4 = "Wheel5Tile4",
  Wheel5Tile5 = "Wheel5Tile5",
  Wheel5Tile6 = "Wheel5Tile6",
  WheelCap6 = "WheelCap6",
  Wheel6Tile1 = "Wheel6Tile1",
  Wheel6Tile2 = "Wheel6Tile2",
  Wheel6Tile3 = "Wheel6Tile3",
  Wheel6Tile4 = "Wheel6Tile4",
  Wheel6Tile5 = "Wheel6Tile5",
  Wheel6Tile6 = "Wheel6Tile6",
}

type Tile = {
  links: TileKey[];
  color: Color;
};

export const TILES: { [key in TileKey]: Tile } = {
  [TileKey.Center]: {
    links: [
      TileKey.Spoke1Tile1,
      TileKey.Spoke2Tile1,
      TileKey.Spoke3Tile1,
      TileKey.Spoke4Tile1,
      TileKey.Spoke5Tile1,
      TileKey.Spoke6Tile1,
    ],
    color: Color.Any,
  },
  [TileKey.Spoke1Tile1]: {
    links: [TileKey.Center, TileKey.Spoke1Tile2],
    color: Color.Blue,
  },
  [TileKey.Spoke1Tile2]: {
    links: [TileKey.Spoke1Tile1, TileKey.Spoke1Tile3],
    color: Color.Pink,
  },
  [TileKey.Spoke1Tile3]: {
    links: [TileKey.Spoke1Tile2, TileKey.Spoke1Tile4],
    color: Color.Yellow,
  },
  [TileKey.Spoke1Tile4]: {
    links: [TileKey.Spoke1Tile3, TileKey.Spoke1Tile5],
    color: Color.Purple,
  },
  [TileKey.Spoke1Tile5]: {
    links: [TileKey.Spoke1Tile4, TileKey.WheelCap1],
    color: Color.Green,
  },
  [TileKey.Spoke2Tile1]: {
    links: [TileKey.Center, TileKey.Spoke2Tile2],
    color: Color.Orange,
  },
  [TileKey.Spoke2Tile2]: {
    links: [TileKey.Spoke2Tile1, TileKey.Spoke2Tile3],
    color: Color.Blue,
  },
  [TileKey.Spoke2Tile3]: {
    links: [TileKey.Spoke2Tile2, TileKey.Spoke2Tile4],
    color: Color.Pink,
  },
  [TileKey.Spoke2Tile4]: {
    links: [TileKey.Spoke2Tile3, TileKey.Spoke2Tile5],
    color: Color.Yellow,
  },
  [TileKey.Spoke2Tile5]: {
    links: [TileKey.Spoke2Tile4, TileKey.WheelCap2],
    color: Color.Purple,
  },
  [TileKey.Spoke3Tile1]: {
    links: [TileKey.Center, TileKey.Spoke3Tile2],
    color: Color.Green,
  },
  [TileKey.Spoke3Tile2]: {
    links: [TileKey.Spoke3Tile1, TileKey.Spoke3Tile3],
    color: Color.Orange,
  },
  [TileKey.Spoke3Tile3]: {
    links: [TileKey.Spoke3Tile2, TileKey.Spoke3Tile4],
    color: Color.Blue,
  },
  [TileKey.Spoke3Tile4]: {
    links: [TileKey.Spoke3Tile3, TileKey.Spoke3Tile5],
    color: Color.Pink,
  },
  [TileKey.Spoke3Tile5]: {
    links: [TileKey.Spoke3Tile4, TileKey.WheelCap3],
    color: Color.Yellow,
  },
  [TileKey.Spoke4Tile1]: {
    links: [TileKey.Center, TileKey.Spoke4Tile2],
    color: Color.Purple,
  },
  [TileKey.Spoke4Tile2]: {
    links: [TileKey.Spoke4Tile1, TileKey.Spoke4Tile3],
    color: Color.Green,
  },
  [TileKey.Spoke4Tile3]: {
    links: [TileKey.Spoke4Tile2, TileKey.Spoke4Tile4],
    color: Color.Orange,
  },
  [TileKey.Spoke4Tile4]: {
    links: [TileKey.Spoke4Tile3, TileKey.Spoke4Tile5],
    color: Color.Blue,
  },
  [TileKey.Spoke4Tile5]: {
    links: [TileKey.Spoke4Tile4, TileKey.WheelCap4],
    color: Color.Pink,
  },
  [TileKey.Spoke5Tile1]: {
    links: [TileKey.Center, TileKey.Spoke5Tile2],
    color: Color.Yellow,
  },
  [TileKey.Spoke5Tile2]: {
    links: [TileKey.Spoke5Tile1, TileKey.Spoke5Tile3],
    color: Color.Purple,
  },
  [TileKey.Spoke5Tile3]: {
    links: [TileKey.Spoke5Tile2, TileKey.Spoke5Tile4],
    color: Color.Green,
  },
  [TileKey.Spoke5Tile4]: {
    links: [TileKey.Spoke5Tile3, TileKey.Spoke5Tile5],
    color: Color.Orange,
  },
  [TileKey.Spoke5Tile5]: {
    links: [TileKey.Spoke5Tile4, TileKey.WheelCap5],
    color: Color.Blue,
  },
  [TileKey.Spoke6Tile1]: {
    links: [TileKey.Center, TileKey.Spoke6Tile2],
    color: Color.Pink,
  },
  [TileKey.Spoke6Tile2]: {
    links: [TileKey.Spoke6Tile1, TileKey.Spoke6Tile3],
    color: Color.Yellow,
  },
  [TileKey.Spoke6Tile3]: {
    links: [TileKey.Spoke6Tile2, TileKey.Spoke6Tile4],
    color: Color.Purple,
  },
  [TileKey.Spoke6Tile4]: {
    links: [TileKey.Spoke6Tile3, TileKey.Spoke6Tile5],
    color: Color.Green,
  },
  [TileKey.Spoke6Tile5]: {
    links: [TileKey.Spoke6Tile4, TileKey.WheelCap6],
    color: Color.Orange,
  },
  [TileKey.WheelCap1]: {
    links: [TileKey.Spoke1Tile5, TileKey.Wheel1Tile1, TileKey.Wheel6Tile6],
    color: Color.Any,
  },
  [TileKey.WheelCap2]: {
    links: [TileKey.Wheel1Tile6, TileKey.Wheel2Tile1, TileKey.Spoke2Tile5],
    color: Color.Any,
  },
  [TileKey.WheelCap3]: {
    links: [TileKey.Wheel2Tile6, TileKey.Wheel3Tile1, TileKey.Spoke3Tile5],
    color: Color.Any,
  },
  [TileKey.WheelCap4]: {
    links: [TileKey.Wheel3Tile6, TileKey.Wheel4Tile1, TileKey.Spoke4Tile5],
    color: Color.Any,
  },
  [TileKey.WheelCap5]: {
    links: [TileKey.Wheel4Tile6, TileKey.Wheel5Tile1, TileKey.Spoke5Tile5],
    color: Color.Any,
  },
  [TileKey.WheelCap6]: {
    links: [TileKey.Wheel5Tile6, TileKey.Wheel6Tile1, TileKey.Spoke6Tile5],
    color: Color.Any,
  },
  [TileKey.Wheel1Tile1]: {
    links: [TileKey.WheelCap1, TileKey.Wheel1Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel1Tile2]: {
    links: [TileKey.Wheel1Tile1, TileKey.Wheel1Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel1Tile3]: {
    links: [TileKey.Wheel1Tile2, TileKey.Wheel1Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel1Tile4]: {
    links: [TileKey.Wheel1Tile3, TileKey.Wheel1Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel1Tile5]: {
    links: [TileKey.Wheel1Tile4, TileKey.Wheel1Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel1Tile6]: {
    links: [TileKey.Wheel1Tile5, TileKey.WheelCap2],
    color: Color.Orange,
  },
  [TileKey.Wheel2Tile1]: {
    links: [TileKey.WheelCap2, TileKey.Wheel2Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel2Tile2]: {
    links: [TileKey.Wheel2Tile1, TileKey.Wheel2Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel2Tile3]: {
    links: [TileKey.Wheel2Tile2, TileKey.Wheel2Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel2Tile4]: {
    links: [TileKey.Wheel2Tile3, TileKey.Wheel2Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel2Tile5]: {
    links: [TileKey.Wheel2Tile4, TileKey.Wheel2Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel2Tile6]: {
    links: [TileKey.Wheel2Tile5, TileKey.WheelCap3],
    color: Color.Orange,
  },
  [TileKey.Wheel3Tile1]: {
    links: [TileKey.WheelCap3, TileKey.Wheel3Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel3Tile2]: {
    links: [TileKey.Wheel3Tile1, TileKey.Wheel3Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel3Tile3]: {
    links: [TileKey.Wheel3Tile2, TileKey.Wheel3Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel3Tile4]: {
    links: [TileKey.Wheel3Tile3, TileKey.Wheel3Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel3Tile5]: {
    links: [TileKey.Wheel3Tile4, TileKey.Wheel3Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel3Tile6]: {
    links: [TileKey.Wheel3Tile5, TileKey.WheelCap4],
    color: Color.Orange,
  },
  [TileKey.Wheel4Tile1]: {
    links: [TileKey.WheelCap4, TileKey.Wheel4Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel4Tile2]: {
    links: [TileKey.Wheel4Tile1, TileKey.Wheel4Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel4Tile3]: {
    links: [TileKey.Wheel4Tile2, TileKey.Wheel4Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel4Tile4]: {
    links: [TileKey.Wheel4Tile3, TileKey.Wheel4Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel4Tile5]: {
    links: [TileKey.Wheel4Tile4, TileKey.Wheel4Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel4Tile6]: {
    links: [TileKey.Wheel4Tile5, TileKey.WheelCap5],
    color: Color.Orange,
  },
  [TileKey.Wheel5Tile1]: {
    links: [TileKey.WheelCap5, TileKey.Wheel5Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel5Tile2]: {
    links: [TileKey.Wheel5Tile1, TileKey.Wheel5Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel5Tile3]: {
    links: [TileKey.Wheel5Tile2, TileKey.Wheel5Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel5Tile4]: {
    links: [TileKey.Wheel5Tile3, TileKey.Wheel5Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel5Tile5]: {
    links: [TileKey.Wheel5Tile4, TileKey.Wheel5Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel5Tile6]: {
    links: [TileKey.Wheel5Tile5, TileKey.WheelCap6],
    color: Color.Orange,
  },
  [TileKey.Wheel6Tile1]: {
    links: [TileKey.WheelCap6, TileKey.Wheel6Tile2],
    color: Color.Blue,
  },
  [TileKey.Wheel6Tile2]: {
    links: [TileKey.Wheel6Tile1, TileKey.Wheel6Tile3],
    color: Color.Pink,
  },
  [TileKey.Wheel6Tile3]: {
    links: [TileKey.Wheel6Tile2, TileKey.Wheel6Tile4],
    color: Color.Yellow,
  },
  [TileKey.Wheel6Tile4]: {
    links: [TileKey.Wheel6Tile3, TileKey.Wheel6Tile5],
    color: Color.Purple,
  },
  [TileKey.Wheel6Tile5]: {
    links: [TileKey.Wheel6Tile4, TileKey.Wheel6Tile6],
    color: Color.Green,
  },
  [TileKey.Wheel6Tile6]: {
    links: [TileKey.Wheel6Tile5, TileKey.WheelCap1],
    color: Color.Orange,
  },
};

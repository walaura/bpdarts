enum Color {
  Blue,
  Pink,
  Yellow,
  Brown,
  Green,
  Orange,
  Any,
}

export enum TileKey {
  center = "center",
  spoke1tile1 = "spoke1tile1",
  spoke1tile2 = "spoke1tile2",
  spoke1tile3 = "spoke1tile3",
  spoke1tile4 = "spoke1tile4",
  spoke1tile5 = "spoke1tile5",
  spoke2tile1 = "spoke2tile1",
  spoke2tile2 = "spoke2tile2",
  spoke2tile3 = "spoke2tile3",
  spoke2tile4 = "spoke2tile4",
  spoke2tile5 = "spoke2tile5",
  spoke3tile1 = "spoke3tile1",
  spoke3tile2 = "spoke3tile2",
  spoke3tile3 = "spoke3tile3",
  spoke3tile4 = "spoke3tile4",
  spoke3tile5 = "spoke3tile5",
  spoke4tile1 = "spoke4tile1",
  spoke4tile2 = "spoke4tile2",
  spoke4tile3 = "spoke4tile3",
  spoke4tile4 = "spoke4tile4",
  spoke4tile5 = "spoke4tile5",
  spoke5tile1 = "spoke5tile1",
  spoke5tile2 = "spoke5tile2",
  spoke5tile3 = "spoke5tile3",
  spoke5tile4 = "spoke5tile4",
  spoke5tile5 = "spoke5tile5",
  spoke6tile1 = "spoke6tile1",
  spoke6tile2 = "spoke6tile2",
  spoke6tile3 = "spoke6tile3",
  spoke6tile4 = "spoke6tile4",
  spoke6tile5 = "spoke6tile5",
}

type Tile = {
  links: TileKey[];
  color: Color;
};

export const TILES: Partial<{
  [key in TileKey]: Tile;
}> = {
  [TileKey.center]: {
    links: [
      TileKey.spoke1tile1,
      TileKey.spoke2tile1,
      TileKey.spoke3tile1,
      TileKey.spoke4tile1,
      TileKey.spoke5tile1,
      TileKey.spoke6tile1,
    ],
    color: Color.Any,
  },
  [TileKey.spoke1tile1]: {
    links: [TileKey.center, TileKey.spoke1tile2],
    color: Color.Blue,
  },
  [TileKey.spoke1tile2]: {
    links: [TileKey.spoke1tile1, TileKey.spoke1tile3],
    color: Color.Pink,
  },
  [TileKey.spoke1tile3]: {
    links: [TileKey.spoke1tile2, TileKey.spoke1tile4],
    color: Color.Yellow,
  },
  [TileKey.spoke1tile4]: {
    links: [TileKey.spoke1tile3, TileKey.spoke1tile5],
    color: Color.Brown,
  },
  [TileKey.spoke1tile5]: {
    links: [TileKey.spoke1tile4, TileKey.center],
    color: Color.Green,
  },
};

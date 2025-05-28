import { TileKey, TILES } from "./boardSetup";

export function traverseBoard(start: TileKey, length = 2): TileKey[] {
  const visited = new Set<TileKey>();
  let current = [start];

  for (let i = 0; i < length; i++) {
    current.forEach((v) => visited.add(v));
    const nextCurrent = [];
    for (const tile of current) {
      const next = TILES[tile].links.filter((n) => !visited.has(n));
      nextCurrent.push(...next);
    }
    current = nextCurrent;
  }

  return current;
}

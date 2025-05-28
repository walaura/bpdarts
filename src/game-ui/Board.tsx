import React, { useCallback, useRef, useState } from "react";
import {
  COLOR_FOR_COLOR,
  EMOJIS_FOR_COLOR,
  TileKey,
  TILES,
} from "../data/board-setup";

function WheelCap({
  rotate = 0,
  tileKey,
}: {
  rotate?: number;
  tileKey: TileKey;
}) {
  const { onMouseOver, fill } = useTileDebugProps(tileKey);
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        {...{ onMouseOver, fill }}
        d="M227.652166,32.5913102 C242.592322,31.0642606 257.569499,31.0983353 272.34538,32.6296463 L272.34538,32.6296463 L268.267684,71.4188529 C256.18754,70.1730526 243.94412,70.1454278 231.73035,71.3876416 L231.73035,71.3876416 Z"
      ></path>
      <text fontSize="3" fill="#FF0000" strokeWidth={0}>
        <tspan x="240.235352" y="53">
          {tileKey}
        </tspan>
      </text>
    </g>
  );
}

function WheelTile({
  rotate = 0,
  tileKey,
}: {
  rotate?: number;
  tileKey: TileKey;
}) {
  const { onMouseOver, fill } = useTileDebugProps(tileKey);
  const { fill: innerFill, emoji } = useTileInnerProps(tileKey);
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        d="M265.278259,31.5333759 L262.488005,71.4359764 C254.183933,70.8543183 245.837684,70.8482095 237.514158,71.423328 L234.723764,31.5179444 C244.907262,30.814298 255.118561,30.8217574 265.278259,31.5333759 Z"
        {...{ onMouseOver, fill }}
      ></path>
      <path
        d="M263.421069,32.4130731 C254.482618,31.8602989 245.517458,31.8553484 236.579837,32.3994289 L235.791,32.45 L238.442,70.361 L239.01303,70.3242278 C246.331104,69.8825036 253.671291,69.8865628 260.989942,70.3354274 L261.559,70.372 L264.21,32.465 L263.421069,32.4130731 Z"
        fill={innerFill}
        id="tile"
      ></path>
      <path
        d="M238.420318,33.2965482 C245.540497,32.9215635 252.675939,32.8963026 259.798986,33.2201521 L261.579473,33.3083873 L263.143,33.398 L260.631,69.313 L259.473893,69.2474323 C253.689502,68.9430117 247.893666,68.9147509 242.107667,69.1631284 L240.529928,69.2377268 L239.37,69.302 L236.858,33.385 L238.420318,33.2965482 Z M238.428209,33.4463405 L237.019,33.526 L239.509,69.144 L240.52219,69.0879265 C246.837251,68.7618257 253.16633,68.7652707 259.481775,69.0976395 L260.492,69.155 L262.982,33.539 L261.571438,33.4581719 C253.862553,33.0445902 246.136429,33.0403866 238.428209,33.4463405 Z"
        fill="#000000"
      ></path>
      <path
        d="M236.579837,32.3994289 C244.921616,31.8916205 253.287386,31.862079 261.633039,32.3098229 L263.421069,32.4130731 L264.21,32.465 L261.559,70.372 L260.989942,70.3354274 C254.194052,69.9186245 247.379592,69.8853529 240.581512,70.2363955 L239.01303,70.3242278 L238.442,70.361 L235.791,32.45 L236.579837,32.3994289 Z M236.610222,32.8985048 L236.325,32.917 L238.906,69.83 L238.982901,69.8251364 C245.797048,69.4138294 252.6303,69.3879599 259.447619,69.7467415 L261.095,69.841 L263.676,32.931 L263.390209,32.9121198 C254.472142,32.3606061 245.527434,32.3556668 236.610222,32.8985048 Z"
        fill="#000000"
      ></path>
      <text
        filter="url(#artwork)"
        style={{
          mixBlendMode: "multiply",
          opacity: 0.8,
        }}
        x="250"
        y="52"
        alignmentBaseline="middle"
        fontSize="11"
        textAnchor="middle"
      >
        {emoji}
      </text>
    </g>
  );
}

function Center({ tileKey }: { tileKey: TileKey }) {
  const { onMouseOver, fill } = useTileDebugProps(tileKey);
  return (
    <g>
      <path
        {...{ onMouseOver, fill }}
        d="M268.711325,217.591035 L287.42265,250 L268.711325,282.408965 L231.288675,282.408965 L212.57735,250 L231.288675,217.591035 L268.711325,217.591035 Z"
      ></path>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="250" y="250">
          {tileKey}
        </tspan>
      </text>
    </g>
  );
}

function SpokeTile({
  rotate = 0,
  offset = 0,
  tileKey,
}: {
  rotate?: number;
  offset?: number;
  tileKey: TileKey;
}) {
  const { onMouseOver, fill } = useTileDebugProps(tileKey);
  return (
    <g
      transform={`
        rotate(${rotate} 250 250),
        translate(0 ${offset * -29})
        `}
    >
      <rect
        x="231.5"
        y="188.5"
        width="37"
        height="28"
        {...{ onMouseOver, fill }}
      ></rect>
      <text fontSize="3" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="210">
          {tileKey}
        </tspan>
      </text>
    </g>
  );
}

function SpokeCap({
  rotate = 0,
  tileKey,
}: {
  rotate?: number;
  tileKey: TileKey;
}) {
  const { onMouseOver, fill } = useTileDebugProps(tileKey);
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        {...{ onMouseOver, fill }}
        d="M250,71.5 C257.727462,71.5 263.894187,71.8109511 268.499963,72.4352295 L268.499963,72.4352295 L268.497587,100.5 L231.5,100.5 L231.5,72.4352345 C236.10578,71.8109527 242.272518,71.5 250,71.5 Z"
      ></path>
      <text fontSize="3" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="90">
          {tileKey}
        </tspan>
      </text>
    </g>
  );
}

function useTileInnerProps(tileKey: TileKey) {
  const color = TILES[tileKey].color;
  const emojiRef = useRef({});
  let emoji = emojiRef.current[tileKey];
  if (!emoji) {
    const allEmojis = EMOJIS_FOR_COLOR[color];
    emoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
    emojiRef.current[tileKey] = emoji;
  }
  return { fill: COLOR_FOR_COLOR[color], emoji: emoji as string };
}

function useTileDebugProps(tileKey: TileKey | null) {
  const { setHovered, hovered, next } = React.useContext(BoardContext);
  const fill =
    hovered === tileKey
      ? "#FF0000"
      : next.includes(tileKey)
      ? "#00FF00"
      : undefined;

  const onMouseOver = useCallback(() => {
    setHovered(tileKey);
  }, [setHovered, tileKey]);

  return { onMouseOver, fill };
}

const BoardContext = React.createContext<{
  hovered: TileKey | null;
  setHovered: (TileKey: TileKey | null) => void;
  next: TileKey[];
  setNext: (next: TileKey[]) => void;
}>({
  hovered: null,
  setHovered: () => {},
  next: [],
  setNext: () => {},
});

export function Board() {
  const [hovered, _setHovered] = useState<TileKey | null>(null);
  const [next, setNext] = useState<TileKey[]>([]);

  const setHovered = (TileKey: TileKey | null) => {
    _setHovered(TileKey);
    const next = TILES[TileKey]?.links || [];
    setNext(next);
  };

  return (
    <BoardContext.Provider value={{ hovered, setHovered, next, setNext }}>
      <BoardImpl />
    </BoardContext.Provider>
  );
}

function BoardImpl() {
  return (
    <svg
      width="500px"
      height="500px"
      viewBox="0 0 500 500"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="artwork">
        <feColorMatrix
          type="saturate"
          values="0"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="SourceGraphic"
          result="colormatrix"
        />
      </filter>
      <g fill="white">
        <Center tileKey={TileKey.Center} />
        {/* Spokes */}
        <SpokeTile rotate={0} tileKey={TileKey.Spoke1Tile1} />
        <SpokeTile rotate={0} tileKey={TileKey.Spoke1Tile2} offset={1} />
        <SpokeTile rotate={0} tileKey={TileKey.Spoke1Tile3} offset={2} />
        <SpokeTile rotate={0} tileKey={TileKey.Spoke1Tile4} offset={3} />
        <SpokeCap rotate={0} tileKey={TileKey.Spoke1Tile5} />

        <SpokeTile rotate={60} tileKey={TileKey.Spoke2Tile1} />
        <SpokeTile rotate={60} tileKey={TileKey.Spoke2Tile2} offset={1} />
        <SpokeTile rotate={60} tileKey={TileKey.Spoke2Tile3} offset={2} />
        <SpokeTile rotate={60} tileKey={TileKey.Spoke2Tile4} offset={3} />
        <SpokeCap rotate={60} tileKey={TileKey.Spoke2Tile5} />

        <SpokeTile rotate={120} tileKey={TileKey.Spoke3Tile1} />
        <SpokeTile rotate={120} tileKey={TileKey.Spoke3Tile2} offset={1} />
        <SpokeTile rotate={120} tileKey={TileKey.Spoke3Tile3} offset={2} />
        <SpokeTile rotate={120} tileKey={TileKey.Spoke3Tile4} offset={3} />
        <SpokeCap rotate={120} tileKey={TileKey.Spoke3Tile5} />

        <SpokeTile rotate={180} tileKey={TileKey.Spoke4Tile1} />
        <SpokeTile rotate={180} tileKey={TileKey.Spoke4Tile2} offset={1} />
        <SpokeTile rotate={180} tileKey={TileKey.Spoke4Tile3} offset={2} />
        <SpokeTile rotate={180} tileKey={TileKey.Spoke4Tile4} offset={3} />
        <SpokeCap rotate={180} tileKey={TileKey.Spoke4Tile5} />

        <SpokeTile rotate={240} tileKey={TileKey.Spoke5Tile1} />
        <SpokeTile rotate={240} tileKey={TileKey.Spoke5Tile2} offset={1} />
        <SpokeTile rotate={240} tileKey={TileKey.Spoke5Tile3} offset={2} />
        <SpokeTile rotate={240} tileKey={TileKey.Spoke5Tile4} offset={3} />
        <SpokeCap rotate={240} tileKey={TileKey.Spoke5Tile5} />

        <SpokeTile rotate={300} tileKey={TileKey.Spoke6Tile1} />
        <SpokeTile rotate={300} tileKey={TileKey.Spoke6Tile2} offset={1} />
        <SpokeTile rotate={300} tileKey={TileKey.Spoke6Tile3} offset={2} />
        <SpokeTile rotate={300} tileKey={TileKey.Spoke6Tile4} offset={3} />
        <SpokeCap rotate={300} tileKey={TileKey.Spoke6Tile5} />

        {/* Big honkin wheel of life */}
        <WheelCap rotate={0} tileKey={TileKey.WheelCap1} />
        <WheelTile rotate={10} tileKey={TileKey.Wheel1Tile1} />
        <WheelTile rotate={18} tileKey={TileKey.Wheel1Tile2} />
        <WheelTile rotate={26} tileKey={TileKey.Wheel1Tile3} />
        <WheelTile rotate={34} tileKey={TileKey.Wheel1Tile4} />
        <WheelTile rotate={42} tileKey={TileKey.Wheel1Tile5} />
        <WheelTile rotate={50} tileKey={TileKey.Wheel1Tile6} />

        <WheelCap rotate={60} tileKey={TileKey.WheelCap2} />
        <WheelTile rotate={70} tileKey={TileKey.Wheel2Tile1} />
        <WheelTile rotate={78} tileKey={TileKey.Wheel2Tile2} />
        <WheelTile rotate={86} tileKey={TileKey.Wheel2Tile3} />
        <WheelTile rotate={94} tileKey={TileKey.Wheel2Tile4} />
        <WheelTile rotate={102} tileKey={TileKey.Wheel2Tile5} />
        <WheelTile rotate={110} tileKey={TileKey.Wheel2Tile6} />

        <WheelCap rotate={120} tileKey={TileKey.WheelCap3} />
        <WheelTile rotate={130} tileKey={TileKey.Wheel3Tile1} />
        <WheelTile rotate={138} tileKey={TileKey.Wheel3Tile2} />
        <WheelTile rotate={146} tileKey={TileKey.Wheel3Tile3} />
        <WheelTile rotate={154} tileKey={TileKey.Wheel3Tile4} />
        <WheelTile rotate={162} tileKey={TileKey.Wheel3Tile5} />
        <WheelTile rotate={170} tileKey={TileKey.Wheel3Tile6} />

        <WheelCap rotate={180} tileKey={TileKey.WheelCap4} />
        <WheelTile rotate={190} tileKey={TileKey.Wheel4Tile1} />
        <WheelTile rotate={198} tileKey={TileKey.Wheel4Tile2} />
        <WheelTile rotate={206} tileKey={TileKey.Wheel4Tile3} />
        <WheelTile rotate={214} tileKey={TileKey.Wheel4Tile4} />
        <WheelTile rotate={222} tileKey={TileKey.Wheel4Tile5} />
        <WheelTile rotate={230} tileKey={TileKey.Wheel4Tile6} />

        <WheelCap rotate={240} tileKey={TileKey.WheelCap5} />
        <WheelTile rotate={250} tileKey={TileKey.Wheel5Tile1} />
        <WheelTile rotate={258} tileKey={TileKey.Wheel5Tile2} />
        <WheelTile rotate={266} tileKey={TileKey.Wheel5Tile3} />
        <WheelTile rotate={274} tileKey={TileKey.Wheel5Tile4} />
        <WheelTile rotate={282} tileKey={TileKey.Wheel5Tile5} />
        <WheelTile rotate={290} tileKey={TileKey.Wheel5Tile6} />

        <WheelCap rotate={300} tileKey={TileKey.WheelCap6} />
        <WheelTile rotate={310} tileKey={TileKey.Wheel6Tile1} />
        <WheelTile rotate={318} tileKey={TileKey.Wheel6Tile2} />
        <WheelTile rotate={326} tileKey={TileKey.Wheel6Tile3} />
        <WheelTile rotate={334} tileKey={TileKey.Wheel6Tile4} />
        <WheelTile rotate={342} tileKey={TileKey.Wheel6Tile5} />
        <WheelTile rotate={350} tileKey={TileKey.Wheel6Tile6} />
      </g>
    </svg>
  );
}

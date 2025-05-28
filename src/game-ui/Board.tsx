import React, { useMemo } from "react";

type TileKey = string;

function WheelCap({ rotate = 0 }: { rotate?: number }) {
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path d="M227.652166,32.5913102 C242.592322,31.0642606 257.569499,31.0983353 272.34538,32.6296463 L272.34538,32.6296463 L268.267684,71.4188529 C256.18754,70.1730526 243.94412,70.1454278 231.73035,71.3876416 L231.73035,71.3876416 Z"></path>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="53">
          {rotate}
        </tspan>
      </text>
    </g>
  );
}

function WheelTile({ rotate = 0 }: { rotate?: number }) {
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        d="M235.257492,31.9828302 C245.085675,31.3262717 254.938593,31.3333499 264.744563,31.9977889 L264.744563,31.9977889 L262.024057,70.902948 C254.027341,70.365063 245.992835,70.3593257 237.978139,70.8907713 L237.978139,70.8907713 Z"
        stroke="#2F358F"
        fill="pink"
      ></path>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="53">
          {rotate}
        </tspan>
      </text>
    </g>
  );
}

function Center({ key }: { key?: TileKey }) {
  return (
    <g>
      <path
        d="M268.711325,217.591035 L287.42265,250 L268.711325,282.408965 L231.288675,282.408965 L212.57735,250 L231.288675,217.591035 L268.711325,217.591035 Z"
        stroke="#2F358F"
        fill="#FFFFFF"
      ></path>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="250" y="250">
          {key}
        </tspan>
      </text>
    </g>
  );
}

function SpokeTile({
  rotate = 0,
  offset = 0,
}: {
  rotate?: number;
  offset?: number;
}) {
  return (
    <g
      transform={`
        rotate(${rotate} 250 250),
        translate(0 ${offset * -29})
        `}
    >
      <rect
        stroke="#2F358F"
        fill="blue"
        x="231.5"
        y="188.5"
        width="37"
        height="28"
      ></rect>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="210">
          {rotate}
        </tspan>
      </text>
    </g>
  );
}

function SpokeCap({ rotate = 0 }: { rotate?: number }) {
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        d="M250,71.5 C257.727462,71.5 263.894187,71.8109511 268.499963,72.4352295 L268.499963,72.4352295 L268.497587,100.5 L231.5,100.5 L231.5,72.4352345 C236.10578,71.8109527 242.272518,71.5 250,71.5 Z"
        stroke="#2F358F"
        fill="lime"
      ></path>
      <text fontSize="7" fill="#FF0000" strokeWidth={0}>
        <tspan x="246.235352" y="90">
          {rotate}
        </tspan>
      </text>
    </g>
  );
}

export function Board({}) {
  return (
    <svg
      width="500px"
      height="500px"
      viewBox="0 0 500 500"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="white" stroke="black" strokeWidth="1">
        <Center />
        {/* Spokes */}
        <SpokeCap rotate={0} />
        <SpokeTile rotate={0} />
        <SpokeTile rotate={0} offset={1} />
        <SpokeTile rotate={0} offset={2} />
        <SpokeTile rotate={0} offset={3} />
        <SpokeCap rotate={60} />
        <SpokeTile rotate={60} />
        <SpokeTile rotate={60} offset={1} />
        <SpokeTile rotate={60} offset={2} />
        <SpokeTile rotate={60} offset={3} />
        <SpokeCap rotate={120} />
        <SpokeTile rotate={120} />
        <SpokeTile rotate={120} offset={1} />
        <SpokeTile rotate={120} offset={2} />
        <SpokeTile rotate={120} offset={3} />
        <SpokeCap rotate={180} />
        <SpokeTile rotate={180} />
        <SpokeTile rotate={180} offset={1} />
        <SpokeTile rotate={180} offset={2} />
        <SpokeTile rotate={180} offset={3} />
        <SpokeCap rotate={240} />
        <SpokeTile rotate={240} />
        <SpokeTile rotate={240} offset={1} />
        <SpokeTile rotate={240} offset={2} />
        <SpokeTile rotate={240} offset={3} />
        <SpokeCap rotate={300} />
        <SpokeTile rotate={300} />
        <SpokeTile rotate={300} offset={1} />
        <SpokeTile rotate={300} offset={2} />
        <SpokeTile rotate={300} offset={3} />
        {/* Big honkin wheel of life */}
        <WheelCap rotate={0} />
        <WheelTile rotate={10} />
        <WheelTile rotate={18} />
        <WheelTile rotate={26} />
        <WheelTile rotate={34} />
        <WheelTile rotate={42} />
        <WheelTile rotate={50} />
        <WheelCap rotate={60} />
        <WheelTile rotate={70} />
        <WheelTile rotate={78} />
        <WheelTile rotate={86} />
        <WheelTile rotate={94} />
        <WheelTile rotate={102} />
        <WheelTile rotate={110} />
        <WheelCap rotate={120} />
        <WheelTile rotate={130} />
        <WheelTile rotate={138} />
        <WheelTile rotate={146} />
        <WheelTile rotate={154} />
        <WheelTile rotate={162} />
        <WheelTile rotate={170} />
        <WheelCap rotate={180} />
        <WheelTile rotate={190} />
        <WheelTile rotate={198} />
        <WheelTile rotate={206} />
        <WheelTile rotate={214} />
        <WheelTile rotate={222} />
        <WheelTile rotate={230} />
        <WheelCap rotate={240} />
        <WheelTile rotate={250} />
        <WheelTile rotate={258} />
        <WheelTile rotate={266} />
        <WheelTile rotate={274} />
        <WheelTile rotate={282} />
        <WheelTile rotate={290} />
        <WheelCap rotate={300} />
        <WheelTile rotate={310} />
        <WheelTile rotate={318} />
        <WheelTile rotate={326} />
        <WheelTile rotate={334} />
        <WheelTile rotate={342} />
        <WheelTile rotate={350} />
      </g>
    </svg>
  );
}

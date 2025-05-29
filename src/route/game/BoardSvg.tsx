import React, { useCallback, useRef } from "react";
import {
  COLOR_FOR_COLOR,
  EMOJIS_FOR_COLOR,
  TileKey,
  TILES,
} from "../../game/boardSetup";
import stylex from "@stylexjs/stylex";
import { BOARD_SIZE } from "../../game/gameSetup";
import { useBoardContext } from "./Board";

const styles = stylex.create({
  clickThrough: {
    pointerEvents: "none",
  },
  emoji: {
    pointerEvents: "none",
    mixBlendMode: "plus-darker",
    opacity: 1,
  },
  emojiAtOpacity: (opacity: number) => ({
    opacity,
  }),
});

function WheelCap({
  rotate = 0,
  tileKey,
}: {
  rotate?: number;
  tileKey: TileKey;
}) {
  const outerProps = useTileOuterProps(tileKey);
  const { fill: innerFill, opacity } = useTileInnerProps(tileKey);
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        d="M272.894931,32.1844953 L268.712701,71.9680953 C256.341982,70.6575785 243.796641,70.628314 231.285258,71.9361906 L227.102545,32.1454628 C242.410192,30.5452327 257.759391,30.5810381 272.894931,32.1844953 Z"
        fill="#FFFFFF"
        {...outerProps}
      ></path>
      <path
        d="M230.284545,33.3424793 C243.403723,32.1571526 256.600923,32.1723974 269.712701,33.3770441 L271.246,33.523 L267.376,70.325 L266.082078,70.2028226 C255.872248,69.2807571 245.600761,69.2275896 235.379619,70.0510242 L233.91981,70.1746218 L232.621,70.295 L228.751,33.486 L230.284545,33.3424793 Z M230.329552,33.8404496 L229.301,33.937 L233.066,69.751 L233.87558,69.6765819 C244.60789,68.7238156 255.401419,68.7362018 266.127034,69.7048479 L266.931,69.78 L270.695,33.972 L269.666971,33.8749485 C256.585307,32.6730677 243.418478,32.6578571 230.329552,33.8404496 Z"
        fill={innerFill}
        opacity={opacity}
        {...stylex.props(styles.clickThrough)}
      ></path>
      <path
        d="M230.329552,33.8404496 C242.894921,32.7051608 255.532086,32.6737673 268.096773,33.7364195 L269.666971,33.8749485 L270.695,33.972 L266.931,69.78 L266.127034,69.7048479 C255.888947,68.7802312 245.588979,68.7269173 235.339444,69.5526408 L233.87558,69.6765819 L233.066,69.751 L229.301,33.937 L230.329552,33.8404496 Z M230.343054,33.9898407 L229.466,34.072 L233.2,69.588 L233.862311,69.52717 C244.603542,68.5736114 255.406025,68.5860076 266.140522,69.5554554 L266.797,69.617 L270.53,34.108 L269.653252,34.0243198 C256.580623,32.8232688 243.422904,32.8080684 230.343054,33.9898407 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <path
        d="M228.722652,32.9869339 C242.371336,31.6570364 256.11108,31.6252881 269.758432,32.8791397 L271.274414,33.0237465 L271.795,33.076 L267.822,70.871 L267.427999,70.8318377 C256.323517,69.7422772 245.139814,69.6841809 234.022045,70.6675218 L232.572287,70.8016905 L232.175,70.841 L228.202,33.039 L228.722652,32.9869339 Z M230.284545,33.3424793 L228.751,33.486 L232.621,70.295 L233.91981,70.1746218 C244.622384,69.2244963 255.386066,69.2368492 266.082078,70.2028226 L267.376,70.325 L271.246,33.523 L271.225211,33.5213196 C257.616207,32.1753461 243.908307,32.1115631 230.284545,33.3424793 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <path
        d="M260.82954,41.0506022 L249.99625,61.7317589 L239.15406,41.0324229 C246.39937,39.2880827 253.655129,39.3023415 260.82954,41.0506022 Z"
        stroke="#000000"
        strokeWidth="0.25"
        fill={innerFill}
        opacity={opacity}
        {...stylex.props(styles.clickThrough)}
        transform="translate(249.991800, 50.731759) rotate(-180.000000) translate(-249.991800, -50.731759) "
      ></path>
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
  const { onClick } = useTileOuterProps(tileKey);
  const { fill: innerFill, opacity } = useTileInnerProps(tileKey);

  return (
    <g onClick={onClick}>
      <g
        transform={`
      rotate(${rotate}, 250, 250)`}
      >
        <path d="M265.278259,31.5333759 L262.488005,71.4359764 C254.183933,70.8543183 245.837684,70.8482095 237.514158,71.423328 L234.723764,31.5179444 C244.907262,30.814298 255.118561,30.8217574 265.278259,31.5333759 Z"></path>
        <path
          d="M263.421069,32.4130731 C254.482618,31.8602989 245.517458,31.8553484 236.579837,32.3994289 L235.791,32.45 L238.442,70.361 L239.01303,70.3242278 C246.331104,69.8825036 253.671291,69.8865628 260.989942,70.3354274 L261.559,70.372 L264.21,32.465 L263.421069,32.4130731 Z"
          fill={innerFill}
          opacity={opacity}
          {...stylex.props(styles.clickThrough)}
        ></path>
        <path
          d="M238.420318,33.2965482 C245.540497,32.9215635 252.675939,32.8963026 259.798986,33.2201521 L261.579473,33.3083873 L263.143,33.398 L260.631,69.313 L259.473893,69.2474323 C253.689502,68.9430117 247.893666,68.9147509 242.107667,69.1631284 L240.529928,69.2377268 L239.37,69.302 L236.858,33.385 L238.420318,33.2965482 Z M238.428209,33.4463405 L237.019,33.526 L239.509,69.144 L240.52219,69.0879265 C246.837251,68.7618257 253.16633,68.7652707 259.481775,69.0976395 L260.492,69.155 L262.982,33.539 L261.571438,33.4581719 C253.862553,33.0445902 246.136429,33.0403866 238.428209,33.4463405 Z"
          fill="#000000"
          opacity={opacity}
        ></path>
        <path
          d="M236.579837,32.3994289 C244.921616,31.8916205 253.287386,31.862079 261.633039,32.3098229 L263.421069,32.4130731 L264.21,32.465 L261.559,70.372 L260.989942,70.3354274 C254.194052,69.9186245 247.379592,69.8853529 240.581512,70.2363955 L239.01303,70.3242278 L238.442,70.361 L235.791,32.45 L236.579837,32.3994289 Z M236.610222,32.8985048 L236.325,32.917 L238.906,69.83 L238.982901,69.8251364 C245.797048,69.4138294 252.6303,69.3879599 259.447619,69.7467415 L261.095,69.841 L263.676,32.931 L263.390209,32.9121198 C254.472142,32.3606061 245.527434,32.3556668 236.610222,32.8985048 Z"
          fill="#000000"
          opacity={opacity}
        ></path>
        <Image tileKey={tileKey} y={51} />
      </g>
    </g>
  );
}

function Center({ tileKey }: { tileKey: TileKey }) {
  const outerProps = useTileOuterProps(tileKey);
  return (
    <g>
      <path
        {...outerProps}
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
  const outerProps = useTileOuterProps(tileKey);
  const { fill: innerFill, opacity } = useTileInnerProps(tileKey);
  return (
    <g
      transform={`
        rotate(${rotate} 250 250),
        translate(0 ${offset * -29})
        `}
    >
      <polygon
        fill="#FFFFFF"
        points="269 188 269 217 231 217 231 188"
        {...outerProps}
      ></polygon>
      <polygon
        points="268 189 268 216 232 216 232 189"
        fill={innerFill}
        opacity={opacity}
        {...stylex.props(styles.clickThrough)}
      ></polygon>
      <path
        d="M267,190 L267,215 L233,215 L233,190 L267,190 Z M266.85,190.15 L233.15,190.15 L233.15,214.85 L266.85,214.85 L266.85,190.15 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <path
        d="M268,189 L268,216 L232,216 L232,189 L268,189 Z M267.5,189.5 L232.5,189.5 L232.5,215.5 L267.5,215.5 L267.5,189.5 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <Image tileKey={tileKey} y={202.5} />
    </g>
  );
}

function Image({ tileKey, y }: { tileKey: TileKey; y?: number }) {
  const { emoji, opacity } = useTileInnerProps(tileKey);
  const SIZE = 16;
  return (
    <image
      {...stylex.props(styles.emoji, styles.emojiAtOpacity(opacity))}
      x={250 - SIZE / 2}
      y={y - SIZE / 2}
      width={SIZE}
      height={SIZE}
      href={emoji.toString()}
    />
  );
}

function SpokeCap({
  rotate = 0,
  tileKey,
}: {
  rotate?: number;
  tileKey: TileKey;
}) {
  const outerProps = useTileOuterProps(tileKey);
  const { fill: innerFill, opacity } = useTileInnerProps(tileKey);
  return (
    <g
      transform={`
      rotate(${rotate}, 250, 250)`}
    >
      <path
        d="M250,71 L251.527575,71.0041623 L253.013528,71.0166493 L254.457856,71.037461 C254.695109,71.0416233 254.930628,71.0461325 255.164412,71.0509886 L256.546306,71.0842872 L257.886576,71.1259105 L259.185224,71.1758585 C259.398196,71.1848769 259.609435,71.1942421 259.818939,71.2039542 L261.055151,71.2663892 C261.257718,71.2774887 261.45855,71.2889351 261.657648,71.3007284 L262.831426,71.3756504 L263.96358,71.458897 C265.260146,71.5608741 266.471731,71.6798474 267.598335,71.8158169 L268.543184,71.9365245 C268.69719,71.9573361 268.849462,71.9784946 269,72 L268.997545,101 L231,101 L231,72 L231.456816,71.9365245 L232.401665,71.8158169 C233.528269,71.6798474 234.739854,71.5608741 236.03642,71.458897 L237.168574,71.3756504 L238.342352,71.3007284 L239.557752,71.2341311 C239.763788,71.2237253 239.971557,71.2136663 240.181061,71.2039542 L241.458897,71.1498439 C241.675338,71.1415193 241.893514,71.1335414 242.113424,71.1259105 L243.453694,71.0842872 L244.835588,71.0509886 L246.259105,71.0260146 C246.499827,71.022546 246.742282,71.0194242 246.986472,71.0166493 L248.472425,71.0041623 L250,71 Z"
        {...outerProps}
        fill="#FFFFFF"
      ></path>
      <path
        d="M250,72 L248.480819,72.0041326 L247.003293,72.0165271 C246.76051,72.0192811 246.519464,72.0223791 246.280155,72.025821 L244.865138,72.050599 L243.491815,72.0836263 L242.1602,72.124898 L240.870309,72.1744089 L239.622157,72.2321542 L238.41576,72.2981288 L237.251134,72.3723276 L236.128293,72.4547457 L235.047254,72.5453781 C234.870565,72.5611677 234.695619,72.5772994 234.522415,72.593773 L233.504107,72.6967173 L232.527639,72.8078633 L232,72.873 L232,100 L267.997,100 L268,72.873 L267.472361,72.8078633 L266.495893,72.6967173 L265.477585,72.593773 C265.304381,72.5772994 265.129435,72.5611677 264.952746,72.5453781 L263.871707,72.4547457 L262.748866,72.3723276 L261.58424,72.2981288 L260.377843,72.2321542 L259.129691,72.1744089 L257.8398,72.124898 L256.508185,72.0836263 L255.134862,72.050599 L253.719845,72.025821 L252.263152,72.0092975 L250.764796,72.0010333 L250,72 Z"
        fill={innerFill}
        opacity={opacity}
        {...stylex.props(styles.clickThrough)}
      ></path>
      <path
        d="M250,73 L250.760602,73.0010259 L252.30928,73.0097283 L253.812853,73.027293 L255.271287,73.0537088 L256.684547,73.0889643 L257.374226,73.1099034 L257.374226,73.1099034 L258.052597,73.1330482 L259.375404,73.1859493 L260.01983,73.2157028 L261.274705,73.2818086 L262.484248,73.3567033 C263.22604,73.4062567 263.94125,73.4609532 264.62984,73.5207806 L265.309555,73.5823177 L266.360165,73.6878849 L267,73.758 L266.997,99 L233,99 L233,73.758 L234.119082,73.6380751 C234.455256,73.6041315 234.798436,73.5715352 235.148619,73.5402879 L235.679143,73.4944288 L236.771685,73.4087861 L237.90619,73.3312522 L239.082628,73.2618371 L239.686562,73.2301773 L240.925842,73.1729594 L242.206977,73.1238854 L243.529936,73.0829654 L244.20709,73.0655663 L245.592728,73.0368961 L247.020113,73.016405 L248.489214,73.0041029 L250,73 Z M250.759972,73.1510248 L250,73.15 L248.045743,73.1569255 L248.045743,73.1569255 L246.161959,73.1776861 L245.428194,73.1898589 L245.428194,73.1898589 L243.994544,73.2208279 L242.266056,73.2719425 L242.266056,73.2719425 L240.608275,73.3368164 L239.333008,73.3986063 L238.712374,73.432794 L238.712374,73.432794 L237.505126,73.5077473 C236.517994,73.5738603 235.578147,73.6490989 234.685681,73.7334313 L233.637472,73.8389932 L233.15,73.892 L233.15,98.85 L266.847,98.85 L266.85,73.892 L266.362528,73.8389932 L265.312602,73.7332691 C264.776228,73.6825956 264.222742,73.6352064 263.652165,73.5911083 L262.488229,73.5073025 C262.290444,73.4940669 262.090761,73.4811975 261.889182,73.4686945 L260.656953,73.3980762 L259.379243,73.3362649 L258.723343,73.3086656 L258.723343,73.3086656 L257.377481,73.2600875 L255.631331,73.2117939 L255.631331,73.2117939 L253.814336,73.1773325 L252.309782,73.1597386 L250.759972,73.1510248 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <path
        d="M250,72 L250.764796,72.0010333 L252.263152,72.0092975 L253.719845,72.025821 L255.134862,72.050599 L256.508185,72.0836263 L257.8398,72.124898 L259.129691,72.1744089 L260.377843,72.2321542 L261.58424,72.2981288 L262.748866,72.3723276 L263.871707,72.4547457 L264.952746,72.5453781 L265.477585,72.593773 L266.495893,72.6967173 L267.472361,72.8078633 L268,72.873 L267.997,100 L232,100 L232,72.873 L232.527639,72.8078633 L233.504107,72.6967173 L234.522415,72.593773 L235.047254,72.5453781 L236.128293,72.4547457 L237.251134,72.3723276 L238.41576,72.2981288 L239.622157,72.2321542 L240.870309,72.1744089 L242.1602,72.124898 L243.491815,72.0836263 L244.865138,72.050599 L246.640421,72.0209161 L246.640421,72.0209161 L248.480819,72.0041326 L250,72 Z M250,72.5 L248.485017,72.5041178 L246.649888,72.5208383 L246.649888,72.5208383 L244.533741,72.5578576 L244.533741,72.5578576 L242.842012,72.6028187 L241.535609,72.6480138 C241.321356,72.6562293 241.108845,72.6647861 240.898075,72.6736842 L239.65436,72.7311658 C239.450558,72.741428 239.248499,72.7520312 239.048183,72.7629751 L237.867207,72.8327263 L236.728087,72.9106478 L235.630846,72.9967321 C235.272081,73.0267865 234.9203,73.0582001 234.575506,73.0909717 L233.562092,73.193359 L233.071114,73.2476057 L233.071114,73.2476057 L232.5,73.314 L232.5,99.5 L267.497,99.5 L267.5,73.314 L267.409374,73.3038865 C267.092546,73.2656881 266.768723,73.2288452 266.437908,73.193359 L265.424494,73.0909717 C265.0797,73.0582001 264.727919,73.0267865 264.369154,72.9967321 L263.271913,72.9106478 L262.132793,72.8327263 L260.951817,72.7629751 L259.101925,72.6736842 L259.101925,72.6736842 L257.157988,72.6028187 L257.157988,72.6028187 L255.809823,72.5658241 L253.709321,72.5257243 L253.709321,72.5257243 L252.25685,72.5092636 L250.762699,72.5010296 L250,72.5 Z"
        fill="#000000"
        opacity={opacity}
      ></path>
      <Image tileKey={tileKey} y={86.5} />
    </g>
  );
}

function useTileInnerProps(tileKey: TileKey) {
  const color = TILES[tileKey].color;
  const emojiRef = useRef({});
  const { next } = useBoardContext();

  const opacity = next.length > 0 ? (next.includes(tileKey) ? 1 : 0.2) : 1;
  let emoji = emojiRef.current[tileKey];
  if (!emoji) {
    const allEmojis = EMOJIS_FOR_COLOR[color];
    emoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
    emojiRef.current[tileKey] = emoji;
    console.log(EMOJIS_FOR_COLOR[color]);
  }
  return { fill: COLOR_FOR_COLOR[color], opacity, emoji: emoji as URL };
}

function useTileOuterProps(tileKey: TileKey | null) {
  const { onClick: onClickCallback } = useBoardContext();

  const onClick = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      const childRect = (
        event.target as SVGGraphicsElement
      ).getBoundingClientRect();
      const parentRect = (event.target as SVGGraphicsElement)
        .closest("svg")
        .getBoundingClientRect();

      const scale = BOARD_SIZE / parentRect.width;

      const rect = new DOMRect(
        (childRect.x - parentRect.x) * scale,
        (childRect.y - parentRect.y) * scale,
        childRect.width * scale,
        childRect.height * scale
      );

      onClickCallback(tileKey, rect);
    },
    [onClickCallback, tileKey]
  );

  return { onClick };
}

export function BoardSvg() {
  return (
    <svg
      width={BOARD_SIZE}
      height={BOARD_SIZE}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="artwork"></filter>
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

import stylex from "@stylexjs/stylex";
import React, { useLayoutEffect } from "react";
import { Board } from "./game/Board";
import { BOARD_SIZE } from "../game/gameSetup";
import { PinchZoom, PinchZoomRef } from "../ui/PinchZoom";

const styles = stylex.create({
  center: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    touchAction: "none",
  },
});

type Camera = {
  x: number;
  y: number;
  zoom: number;
};

const getCenter = () => {
  const { height, width } = visualViewport;

  const x = (BOARD_SIZE - width) / -2;
  const y = (BOARD_SIZE - height) / -2;

  return { x, y };
};

export default function GameRoute() {
  const ref = React.useRef<PinchZoomRef>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {}, []);

  return (
    <div {...stylex.props(styles.center)}>
      <button
        onClick={() => {
          ref.current.setTransform({
            ...getCenter(),
            scale: 1,
          });
        }}
      >
        center
      </button>
      <PinchZoom ref={ref}>
        <div
          ref={innerRef}
          style={{
            width: BOARD_SIZE,
            height: BOARD_SIZE,
            background: "linear-gradient(45deg, red, blue)",
          }}
        >
          <Board />
        </div>
      </PinchZoom>
    </div>
  );
}

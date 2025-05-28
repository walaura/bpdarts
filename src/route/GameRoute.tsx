import stylex from "@stylexjs/stylex";
import React, { useLayoutEffect } from "react";
import { Board } from "./game/Board";
import { BOARD_SIZE } from "../game/gameSetup";

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

const calculateTransform = ({ x, y }: Camera) => {
  const { height, width } = visualViewport;

  const centerX = (BOARD_SIZE - width) / 2 + x;
  const centerY = (BOARD_SIZE - height) / 2 + y;

  const baseZoom = Math.min(width / BOARD_SIZE, height / BOARD_SIZE);

  return `translate(-${centerX}px, -${centerY}px) scale(${baseZoom})`;
};

export default function GameRoute() {
  const cameraRef = React.useRef<Camera>({ x: 0, y: 0, zoom: 1 });
  const ref = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const zoomInnerRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const applyTransform = () => {
      innerRef.current?.style.setProperty(
        "transform",
        calculateTransform(cameraRef.current)
      );
      zoomInnerRef.current?.style.setProperty(
        "transform",
        `scale(${cameraRef.current.zoom})`
      );
    };
    const wheelie = (event: WheelEvent) => {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const zoomFactor = event.deltaY < 0 ? 1.05 : 0.95;
        cameraRef.current = {
          ...cameraRef.current,
          zoom: Math.max(0.1, cameraRef.current.zoom * zoomFactor),
        };
      } else {
        cameraRef.current = {
          ...cameraRef.current,
          x: cameraRef.current.x + event.deltaX,
          y: cameraRef.current.y + event.deltaY,
        };
      }
      applyTransform();
    };

    const cancel = (event: Event) => {
      event.preventDefault();
    };

    const onDblTap = (event: TouchEvent) => {
      event.preventDefault();
      if (cameraRef.current.zoom > 1) {
        cameraRef.current = {
          ...cameraRef.current,
          zoom: 1,
        };
      } else {
        cameraRef.current = {
          ...cameraRef.current,
          zoom: 2,
        };
      }
      applyTransform();
    };

    const outerEl = ref.current;
    applyTransform();

    window.addEventListener("gesturestart", cancel);
    window.addEventListener("wheel", wheelie);
    outerEl.addEventListener("dblclick", onDblTap);

    return () => {
      window.removeEventListener("wheel", wheelie);
      window.removeEventListener("gesturestart", cancel);
      outerEl.removeEventListener("dblclick", onDblTap);
    };
  }, []);

  return (
    <div {...stylex.props(styles.center)} ref={ref}>
      <div
        ref={innerRef}
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
        }}
      >
        <div
          ref={zoomInnerRef}
          style={{
            width: BOARD_SIZE,
            height: BOARD_SIZE,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Board />
        </div>
      </div>
    </div>
  );
}

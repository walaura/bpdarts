import stylex from "@stylexjs/stylex";
import PointerTracker, { Pointer } from "pointer-tracker";
import React, { useImperativeHandle } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

/**
 * Stolen from https://github.com/GoogleChromeLabs/pinch-zoom/blob/master/lib/pinch-zoom.ts
 * and adapted to reacc+stylex
 *
 * MATRIX CHEATSHEET
 * X = E
 * Y = F
 * Scale = A
 */

interface Point {
  clientX: number;
  clientY: number;
}

interface ApplyChangeOpts {
  panX?: number;
  panY?: number;
  scaleDiff?: number;
  originX?: number;
  originY?: number;
}

interface SetTransformOpts {
  scale?: number;
  x?: number;
  y?: number;
  animate?: boolean;
}

export interface PinchZoomRef {
  setTransform: (opts?: SetTransformOpts) => void;
}

type ScaleRelativeToValues = "container" | "content";

export interface ScaleToOpts {
  /** Transform origin. Can be a number, or string percent, eg "50%" */
  originX?: number | string;
  /** Transform origin. Can be a number, or string percent, eg "50%" */
  originY?: number | string;
  /** Should the transform origin be relative to the container, or content? */
  relativeTo?: ScaleRelativeToValues;
}

function getDistance(a: Point, b?: Point): number {
  if (!b) return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}

function getMidpoint(a: Point, b?: Point): Point {
  if (!b) return a;

  return {
    clientX: (a.clientX + b.clientX) / 2,
    clientY: (a.clientY + b.clientY) / 2,
  };
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function lerp(x, y, a) {
  return x * (1 - a) + y * a;
}

// I'd rather use DOMMatrix/DOMPoint here, but the browser support isn't good enough.
// Given that, better to use something everything supports.
let cachedSvg: SVGSVGElement;

function getSVG(): SVGSVGElement {
  return (
    cachedSvg ||
    (cachedSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  );
}

function createMatrix(): SVGMatrix {
  return getSVG().createSVGMatrix();
}

function createPoint(): SVGPoint {
  return getSVG().createSVGPoint();
}

const MIN_SCALE = 0.01;
const ANIMATION_TIMING = 600;

function PinchZoomRefless(
  {
    minScale = MIN_SCALE,
    children,
  }: {
    minScale?: number;
    children: React.ReactNode;
  },
  ref?: React.ForwardedRef<PinchZoomRef>
) {
  // The element that we'll transform.
  const parentElementRef = useRef<HTMLDivElement>(null);
  const positioningElementRef = useRef<HTMLElement>(null);
  const transform = useRef<SVGMatrix>(createMatrix());

  const nextTransform = useRef<SVGMatrix | null>(null);

  /**
   * Update transform values without checking bounds. This is only called in setTransform.
   */
  const updateTransform = useCallback(
    (scale: number, x: number, y: number) => {
      // Avoid scaling to zero
      if (scale < minScale) return;

      // Return if there's no change
      if (
        scale === transform.current.a &&
        x === transform.current.e &&
        y === transform.current.f
      )
        return;

      transform.current.e = x;
      transform.current.f = y;
      transform.current.d = transform.current.a = scale;

      parentElementRef.current.style.setProperty(
        "--x",
        transform.current.e + "px"
      );
      parentElementRef.current.style.setProperty(
        "--y",
        transform.current.f + "px"
      );
      parentElementRef.current.style.setProperty(
        "--scale",
        transform.current.a + ""
      );
    },
    [minScale]
  );

  /**
   * Starts an animation if theres a queued animation in place
   */
  const maybeStartAnimation = useCallback(
    (
      duration: number = ANIMATION_TIMING,
      timingFunction: (number) => number = easeOutCubic
    ) => {
      const startTime = performance.now();
      const cancel = () => {
        nextTransform.current = null;
      };
      const animate = () => {
        if (nextTransform.current === null) {
          return;
        }
        if (
          nextTransform.current.a === transform.current.a &&
          nextTransform.current.e === transform.current.e &&
          nextTransform.current.f === transform.current.f
        ) {
          nextTransform.current = null;
          return;
        }

        const now = performance.now();
        const elapsed = now - startTime;
        const progress = elapsed / duration;

        if (progress > 0.5) {
          updateTransform(
            nextTransform.current.a,
            nextTransform.current.e,
            nextTransform.current.f
          );
          cancel();
          return;
        }

        const scale = lerp(
          transform.current.a,
          nextTransform.current.a,
          timingFunction(progress)
        );
        const x = lerp(
          transform.current.e,
          nextTransform.current.e,
          timingFunction(progress)
        );
        const y = lerp(
          transform.current.f,
          nextTransform.current.f,
          timingFunction(progress)
        );

        updateTransform(scale, x, y);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    },
    [updateTransform]
  );

  /**
   * Update the stage with a given scale/x/y.
   */
  const setTransform = useCallback(
    (opts: SetTransformOpts = {}) => {
      const { scale = transform.current.a } = opts;

      let { x = transform.current.e, y = transform.current.f } = opts;

      // If we don't have an element to position, just set the value as given.
      // We'll check bounds later.
      if (!positioningElementRef.current) {
        updateTransform(scale, x, y);
        return;
      }

      // Get current layout
      const thisBounds = parentElementRef.current.getBoundingClientRect();
      const positioningElBounds =
        positioningElementRef.current.getBoundingClientRect();

      // Not displayed. May be disconnected or display:none.
      // Just take the values, and we'll check bounds later.
      if (!thisBounds.width || !thisBounds.height) {
        updateTransform(scale, x, y);
        return;
      }

      // Create points for _positioningEl.
      let topLeft = createPoint();
      topLeft.x = positioningElBounds.left - thisBounds.left;
      topLeft.y = positioningElBounds.top - thisBounds.top;
      let bottomRight = createPoint();
      bottomRight.x = positioningElBounds.width + topLeft.x;
      bottomRight.y = positioningElBounds.height + topLeft.y;

      // Calculate the intended position of _positioningEl.
      const matrix = createMatrix()
        .translate(x, y)
        .scale(scale)
        // Undo current transform
        .multiply(transform.current.inverse());

      topLeft = topLeft.matrixTransform(matrix);
      bottomRight = bottomRight.matrixTransform(matrix);

      // Ensure _positioningEl can't move beyond out-of-bounds.
      // Correct for x
      if (topLeft.x > thisBounds.width) {
        x += thisBounds.width - topLeft.x;
      } else if (bottomRight.x < 0) {
        x += -bottomRight.x;
      }

      // Correct for y
      if (topLeft.y > thisBounds.height) {
        y += thisBounds.height - topLeft.y;
      } else if (bottomRight.y < 0) {
        y += -bottomRight.y;
      }

      if (opts.animate) {
        const matrix = createMatrix();
        matrix.a = scale;
        matrix.e = x;
        matrix.f = y;
        nextTransform.current = matrix;
        maybeStartAnimation(ANIMATION_TIMING);
        return;
      }

      updateTransform(scale, x, y);
    },
    [maybeStartAnimation, updateTransform]
  );

  /** Transform the view & fire a change event */
  const applyChange = useCallback(
    (opts: ApplyChangeOpts = {}) => {
      const {
        panX = 0,
        panY = 0,
        originX = 0,
        originY = 0,
        scaleDiff = 1,
      } = opts;

      const matrix = createMatrix()
        // Translate according to panning.
        .translate(panX, panY)
        // Scale about the origin.
        .translate(originX, originY)
        // Apply current translate
        .translate(transform.current.e, transform.current.f)
        .scale(scaleDiff)
        .translate(-originX, -originY)
        // Apply current scale.
        .scale(transform.current.a);

      // Convert the transform into basic translate & scale.
      setTransform({
        scale: matrix.a,
        x: matrix.e,
        y: matrix.f,
      });
    },
    [setTransform]
  );

  useEffect(() => {
    if (!nextTransform) return;
  }, [nextTransform, updateTransform]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      nextTransform.current = null;

      if (!positioningElementRef.current) return;
      event.preventDefault();

      const currentRect = positioningElementRef.current.getBoundingClientRect();
      let { deltaY } = event;
      const { ctrlKey, deltaMode } = event;

      if (deltaMode === 1) {
        // 1 is "lines", 0 is "pixels"
        // Firefox uses "lines" for some types of mouse
        deltaY *= 15;
      }

      // ctrlKey is true when pinch-zooming on a trackpad.
      const divisor = ctrlKey ? 100 : 300;
      const scaleDiff = 1 - deltaY / divisor;

      applyChange({
        scaleDiff,
        originX: event.clientX - currentRect.left,
        originY: event.clientY - currentRect.top,
      });
    };

    const onPointerMove = (
      previousPointers: Pointer[],
      currentPointers: Pointer[]
    ) => {
      nextTransform.current = null;

      if (!positioningElementRef.current) return;

      // Combine next points with previous points
      const currentRect = positioningElementRef.current.getBoundingClientRect();

      // For calculating panning movement
      const prevMidpoint = getMidpoint(
        previousPointers[0],
        previousPointers[1]
      );
      const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);

      // Midpoint within the element
      const originX = prevMidpoint.clientX - currentRect.left;
      const originY = prevMidpoint.clientY - currentRect.top;

      // Calculate the desired change in scale
      const prevDistance = getDistance(
        previousPointers[0],
        previousPointers[1]
      );
      const newDistance = getDistance(currentPointers[0], currentPointers[1]);
      const scaleDiff = prevDistance ? newDistance / prevDistance : 1;

      applyChange({
        originX,
        originY,
        scaleDiff,
        panX: newMidpoint.clientX - prevMidpoint.clientX,
        panY: newMidpoint.clientY - prevMidpoint.clientY,
      });
    };

    let lastPointer = null;
    // Watch for pointers
    const pointerTracker: PointerTracker = new PointerTracker(
      parentElementRef.current,
      {
        start: (pointer, event) => {
          lastPointer = null;
          // We only want to track 2 pointers at most
          if (
            pointerTracker.currentPointers.length === 2 ||
            !positioningElementRef.current
          )
            return false;
          event.preventDefault();
          return true;
        },
        move: (previousPointers) => {
          lastPointer = previousPointers[0];
          onPointerMove(previousPointers, pointerTracker.currentPointers);
        },
        end: (finalPointer) => {
          if (finalPointer.id !== lastPointer?.id) {
            return;
          }
          const deltaX = (finalPointer.clientX - lastPointer.clientX) * 2;
          const deltaY = (finalPointer.clientY - lastPointer.clientY) * 2;

          const absDelta = Math.abs(deltaX) + Math.abs(deltaY);
          if (absDelta < 20) {
            return;
          }

          const matrix = createMatrix();
          matrix.a = transform.current.a;
          matrix.e = transform.current.e + deltaX;
          matrix.f = transform.current.f + deltaY;
          nextTransform.current = matrix;
          maybeStartAnimation(3000, (x) => 1 - Math.pow(1 - x, 10));
        },
        rawUpdates: true,
      }
    );

    const parentElement = parentElementRef.current!;
    parentElement.addEventListener("wheel", onWheel);
    return () => {
      parentElement.removeEventListener("wheel", onWheel);
      pointerTracker.stop();
    };
  }, [
    applyChange,
    maybeStartAnimation,
    parentElementRef,
    positioningElementRef,
    transform,
  ]);

  useEffect(() => {
    if (transform.current.a < minScale) {
      setTransform({ scale: minScale });
    }
  }, [minScale, setTransform, transform.current.a]);

  useLayoutEffect(() => {
    positioningElementRef.current = parentElementRef.current
      ?.children[0] as HTMLElement;

    positioningElementRef.current.style.setProperty(
      "transform",
      "translate3d(var(--x), var(--y), 0) scale(var(--scale))"
    );
    positioningElementRef.current.style.setProperty("transform-origin", "0 0");
    positioningElementRef.current.style.setProperty("will-change", "transform");

    setTransform({});
  });

  useImperativeHandle(ref, () => ({
    setTransform,
  }));

  return (
    <div {...stylex.props(styles.root)} ref={parentElementRef}>
      {children}
    </div>
  );
}

export const PinchZoom = React.forwardRef(PinchZoomRefless);

const styles = stylex.create({
  root: {
    display: "block",
    overflow: "hidden",
    touchAction: "none",
  },
});

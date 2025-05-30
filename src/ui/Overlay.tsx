import stylex from '@stylexjs/stylex';
import React, { useLayoutEffect, useRef } from 'react';
import { Flexbox } from './styles/Flexbox';
import { Button } from './Button';
import { BottomControls } from './BottomControls';

const maskOpen = [
  { opacity: 0, transform: 'scale(1.3) translateY(20vh)' },
  { opacity: 1 },
];

const maskClose = [
  { opacity: 1 },
  { opacity: 0 },
  { opacity: 0, transform: 'scale(.9) translateY(-20vh)' },
];

const spiny = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const animationOptions = {
  duration: 300,
  easing: 'ease-in-out',
};

const styles = stylex.create({
  mask: {
    willChange: 'transform, opacity',
    position: 'fixed',
    zIndex: 3,
    top: '-40vh',
    bottom: '-40vh',
    left: '-40vh',
    right: '-40vh',
    width: '100%',
    height: '100%',
    padding: '40vh',
    background:
      'radial-gradient(circle at 50% 50%, #04000F00 0%, #110048 70%), linear-gradient(to top, #110048 0%, #110048ee 40%, #0190CFee 180%)',
  },
  maskOut: {},
  button: {
    grow: 1,
    width: '100%',
  },
  burst: {
    position: 'absolute',
    padding: '40vh',
    top: 'calc((100dvmax - 100vh)/-2)',
    left: 'calc((100dvmax - 100vw)/-2)',
    background:
      'repeating-conic-gradient(#fff 0 3deg, rgba(0,0,0,.1) 3deg 9deg)',
    maskImage:
      'radial-gradient(circle at 50% 50%, rgb(0 0 0), transparent 50%)',
    mixBlendMode: 'overlay',
    opacity: 0.1,
    width: '100dvmax',
    height: '100dvmax',
    zIndex: 1,
    animation: `${spiny} 60s linear infinite`,
  },
  contents: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export function Overlay({
  onClose: onCloseImpl,
  children,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const anim = ref.current.animate(maskOpen, animationOptions);
    return () => {
      anim.cancel();
    };
  }, []);

  return (
    <div {...stylex.props(styles.mask)} ref={ref}>
      <Flexbox direction="column" styles={styles.contents}>
        <Flexbox grow>
          <Flexbox align="center" justify="center">
            <div>{children}</div>
          </Flexbox>
        </Flexbox>
        <BottomControls>
          <Button
            styles={styles.button}
            label="Close"
            onClick={() => {
              const anim = ref.current.animate(maskClose, {
                ...animationOptions,
                fill: 'forwards',
              });
              anim.onfinish = () => {
                onCloseImpl();
              };
            }}
          />
        </BottomControls>
      </Flexbox>
      <div {...stylex.props(styles.burst)} />
    </div>
  );
}

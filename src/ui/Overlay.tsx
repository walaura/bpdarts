import stylex from '@stylexjs/stylex';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Flexbox } from '../styles/Flexbox';
import { Button } from './Button';
import { BottomControls } from './BottomControls';

const maskOpen = [
  { opacity: 0, transform: 'scale(1.3) translateY(20vh)' },
  { opacity: 1 },
];

const animationOptions = {
  duration: 150,
  easing: 'ease-out',
};

const styles = stylex.create({
  mask: {
    willChange: 'transform, opacity',
    position: 'fixed',
    zIndex: 3,
    top: '-20vh',
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: '20vh',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  maskOut: {},
  button: {
    grow: 1,
    width: '100%',
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
    <Flexbox direction="column" gap={8} styles={[styles.mask]} ref={ref}>
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
            const anim = ref.current.animate(maskOpen, {
              ...animationOptions,
              duration: animationOptions.duration * 0.8,
              direction: 'reverse',
            });
            anim.onfinish = () => {
              onCloseImpl();
            };
          }}
        />
      </BottomControls>
    </Flexbox>
  );
}

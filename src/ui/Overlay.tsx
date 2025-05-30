import stylex from '@stylexjs/stylex';
import React from 'react';
import Flexbox from '../styles/Flexbox';
import { Button } from './Button';

const styles = stylex.create({
  mask: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export function Overlay({
  onClose,
  children,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div {...stylex.props(styles.mask)}>
      <Flexbox>
        <Flexbox grow>contents {children}</Flexbox>
        <Flexbox>
          <Button label="Close" onClick={onClose} />
        </Flexbox>
      </Flexbox>
    </div>
  );
}

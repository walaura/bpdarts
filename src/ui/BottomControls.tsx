import stylex, { StyleXStyles } from '@stylexjs/stylex';
import React from 'react';
import { Flexbox } from '../styles/Flexbox';

const styles = stylex.create({
  margin: {
    margin: '.75rem',
  },
  tray: {
    willChange: 'transform',
    minHeight: '5rem',
    display: 'flex',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-left, 0px)',
  },
});

export function BottomControls({
  children,
  styles: externalStyles,
}: {
  children?: React.ReactNode;
  styles?: StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.tray, externalStyles)}>
      <Flexbox gap={8} styles={styles.margin} grow={true}>
        {children}
      </Flexbox>
    </div>
  );
}

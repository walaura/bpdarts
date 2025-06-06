import stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import React, { forwardRef } from 'react';

const styles = stylex.create({
  box: {
    display: 'flex',
  },
  wGap: (gap: number) => ({
    gap: `${gap / 16}rem`,
  }),
  boxGrow: {
    flexGrow: 1,
  },
  boxFit: {
    width: 'fit-content',
  },
});

const directionStyles = stylex.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});

const alignStyles = stylex.create({
  center: {
    alignItems: 'center',
  },
  start: {
    alignItems: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
  },
  unset: {},
});

const justifyStyles = stylex.create({
  center: {
    justifyContent: 'center',
  },
  start: {
    justifyContent: 'flex-start',
  },
  end: {
    justifyContent: 'flex-end',
  },
  between: {
    justifyContent: 'space-between',
  },
});

function FlexboxImpl(
  {
    styles: externalStyles,
    children,
    direction = 'row',
    gap,
    grow = false,
    fit = false,
    align = 'unset',
    justify = 'center',
  }: {
    children: React.ReactNode;
    styles?: StyleXStyles;
    gap?: 4 | 8 | 12 | 16 | 20;
    direction?: 'row' | 'column';
    grow?: boolean;
    fit?: boolean;
    align?: 'center' | 'start' | 'end' | 'unset';
    justify?: 'center' | 'start' | 'end' | 'between';
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      {...stylex.props(
        externalStyles,
        styles.box,
        directionStyles[direction],
        alignStyles[grow ? 'grow' : align],
        justifyStyles[justify],
        gap && styles.wGap(gap),
        grow && styles.boxGrow,
        fit && styles.boxFit
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}

export const Flexbox = forwardRef(FlexboxImpl);

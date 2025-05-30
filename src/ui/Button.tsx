import React from 'react';
import stylex, { StyleXStyles } from '@stylexjs/stylex';
import { Flexbox } from '../styles/Flexbox';

const styles = stylex.create({
  button: {
    border: 'none',
    minHeight: '4rem',
    minWidth: '4rem',
    padding: '1rem',
    fontSize: '1em',
    color: '#111',
    background: 'rgba(255,255,255,0.70);',
    backgroundBlendMode: 'overlay',
    textShadow: '0 1px 0 rgba(255,255,255,0.3)',
    fontWeight: 'bold',
    backgroundImage:
      'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(0,0,0,.2) 100%);',
    boxShadow:
      '0 -1px 2px 1px rgba(0,0,0,0.1), inset 0 -1px 6px 0 rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.2), inset 0 -1px 1px 0 rgba(0,0,0,0.2);',
    borderRadius: '.75rem',
    WebkitTapHighlightColor: 'transparent',
    ':active': {
      backgroundImage:
        'linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%);',
    },
  },
  buttonActive: {
    borderColor: 'var(--accent)',
    color: 'var(--accent)',
  },
  buttonPrimary: {
    border: 0,
    background: '#000',
    color: '#fff',
    paddingVertical: '1em',
    paddingHorizontal: '2em',
  },
});
export const Button = ({
  label,
  icon,
  onClick,
  isPrimary = false,
  isActive = false,
  isLabelHidden = false,
  styles: externalStyles,
}: {
  label: string;
  isLabelHidden?: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
  isActive?: boolean;
  styles?: StyleXStyles;
}) => {
  return (
    <button
      {...stylex.props(
        styles.button,
        isPrimary === true && styles.buttonPrimary,
        isActive === true && styles.buttonActive,
        externalStyles
      )}
      aria-label={label}
      aria-selected={isActive}
      title={isLabelHidden ? label : undefined}
      onClick={() => {
        onClick();
      }}
    >
      <Flexbox gap={4} align="center">
        {icon} {!isLabelHidden && label}
      </Flexbox>
    </button>
  );
};

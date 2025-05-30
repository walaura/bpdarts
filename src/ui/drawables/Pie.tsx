import React from 'react';
import { Color, COLOR_FOR_COLOR } from '../../logic/boardSetup';
import stylex, { StyleXStyles } from '@stylexjs/stylex';

const MIDPOINT = 210;

function Wedge({
  rotate = 0,
  color: colorKey,
  onClick,
  isActive = false,
}: {
  rotate?: number;
  color?: Color;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const color = COLOR_FOR_COLOR[colorKey];
  return (
    <g
      transform={`
      rotate(${rotate}, ${MIDPOINT}, ${MIDPOINT})`}
    >
      <path
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.1}
        d="M123.79101,40.6831182 L209.96151,189.934802 L296.161201,40.6310465 L296.113948,40.6065731 C242.392276,13.3336357 178.558304,12.8444305 124.003265,40.5723397 L123.79101,40.6831182 Z"
        fill={isActive ? color : 'rgba(0,0,0,.25)'}
        onClick={onClick}
      ></path>
      {!isActive && onClick && (
        <path
          style={{ pointerEvents: 'none' }}
          d="M163.239244,52.7806413 C193.47463,43.7658822 225.665626,43.6953887 255.965832,52.5488625 L256.942597,52.8375538 L258.771382,53.3911804 L209.961004,137.934007 L161.160126,53.4083378 L163.239244,52.7806413 Z M249.73,57.051 L249.434607,56.9745827 C223.605486,50.3103169 196.535168,50.2924231 170.751834,56.9209914 L170.199,57.064 L209.961,125.933 L249.73,57.051 Z"
          fill={color}
        ></path>
      )}
    </g>
  );
}

export function Pie({
  onClickWedge,
  activeWedges = [],
  styles: customStyles,
}: {
  onClickWedge?: (wedge: Color) => void;
  activeWedges?: Color[];
  styles?: StyleXStyles;
}) {
  const wedges: [Color, number][] = [
    [Color.Green, 0],
    [Color.Yellow, 60],
    [Color.Orange, 120],
    [Color.Pink, 180],
    [Color.Blue, 240],
    [Color.Purple, 300],
  ];

  return (
    <svg
      {...stylex.props(customStyles)}
      width="200px"
      height="200px"
      viewBox={`0 0 ${MIDPOINT * 2} ${MIDPOINT * 2}`}
    >
      {wedges.map(([color, rotate]) => (
        <Wedge
          key={color}
          rotate={rotate}
          color={color}
          onClick={onClickWedge ? () => onClickWedge?.(color) : null}
          isActive={activeWedges.includes(color)}
        />
      ))}
    </svg>
  );
}

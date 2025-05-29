import React from "react";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import Flexbox from "../styles/Flexbox";

const styles = stylex.create({
  button: {
    border: "none",
    minHeight: "4em",
    minWidth: "4em",
    padding: "1em",
    color: "#000",
    background: "rgba(255,255,255,0.70);",
    backgroundBlendMode: "overlay",
    backgroundImage:
      "linear-gradient(179deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.00) 100%);",
    boxShadow:
      "0 -1px 1px 2px rgba(0,0,0,0.12), inset 0 1px 1px 0 rgba(255,255,255,0.41), inset 0 -1px 1px 0 rgba(0,0,0,0.19);",
    borderRadius: ".75em",
    WebkitTapHighlightColor: "transparent",
    ":active": {
      backgroundImage: "none",
    },
  },
  buttonActive: {
    borderColor: "var(--accent)",
    color: "var(--accent)",
  },
  buttonPrimary: {
    border: 0,
    background: "#000",
    color: "#fff",
    paddingVertical: "1em",
    paddingHorizontal: "2em",
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

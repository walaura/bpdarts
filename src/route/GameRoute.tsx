import stylex from "@stylexjs/stylex";
import React from "react";
import Flexbox from "../styles/Flexbox";
import { Board } from "./game/Board";

const styles = stylex.create({
  center: {
    width: "100%",
    flex: "1 0 0",
    display: "flex",
    alignItems: "center",

  },
});

export default function GameRoute() {
  return (
    <Flexbox direction="column" styles={styles.center}>
      <Board />
    </Flexbox>
  );
}

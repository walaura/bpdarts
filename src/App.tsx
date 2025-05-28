import React from "react";
import stylex from "@stylexjs/stylex";
import { useRouter } from "./app/useRouter";
import GameRoute from "./route/GameRoute";

const styles = stylex.create({
  root: (tokens: { accent: string }) => ({
    display: "flex",
    minHeight: "100dvh",
    "--accent": tokens.accent ?? "#12fff7",
    "--active": "var(--accent)",
    backgroundColor: "#110048",
  }),
  center: {
    width: "100%",
    flex: "1 0 0",
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    position: "absolute",
    bottom: "2em",
    left: "2em",
    right: "2em",
  },
});

export default function App() {
  const route = useRouter();
  return (
    <div {...stylex.props(styles.root({ accent: "#12fff7" }))}>
      {route.route === "home" ? <GameRoute /> : null}
    </div>
  );
}

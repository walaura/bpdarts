import stylex from "@stylexjs/stylex";
import React, { ForwardedRef, useCallback, useEffect, useState } from "react";
import Flexbox from "../styles/Flexbox";
import { Board } from "../game-ui/Board";

const styles = stylex.create({
  center: {
    backgroundColor: "#222222",
    width: "100%",
    flex: "1 0 0",
    display: "flex",
    alignItems: "center",
  },
});

enum Operation {
  ADD,
  REMOVE,
  MULTI,
  DIVISION,
}

function getOperationName(op: Operation): string {
  switch (op) {
    case Operation.ADD:
      return "+";
    case Operation.REMOVE:
      return "-";
    case Operation.MULTI:
      return "x";
    case Operation.DIVISION:
      return "/";
    default:
      return "n";
  }
}

interface Nums {
  value: number;
}

type OperationForTier = Operation[];

interface State {
  operationForTier: OperationForTier;
  numbersOnTier: number[][];
  exp?: Operation;
}

const STARTING_STATE: State = {
  operationForTier: [Operation.ADD, null, Operation.DIVISION, Operation.MULTI],
  numbersOnTier: [[4], [], [], [2]],
  exp: null,
};

function Number({
  number,
  operationForTier,
  numberStates,
  onChangeNumberStates,
}: {
  number: number;
  operationForTier: OperationForTier;
  numberStates: boolean[];
  onChangeNumberStates: (numberStates: boolean[]) => void;
}) {
  return (
    <Flexbox>
      {number} -{" "}
      {numberStates.map((state, idx) => (
        <label>
          <input
            type="checkbox"
            checked={state}
            onChange={() => {
              onChangeNumberStates(
                numberStates.map((og, idxx) => (idx === idxx ? !state : og))
              );
            }}
          />
        </label>
      ))}
    </Flexbox>
  );
}

export default function SetupRoute() {
  const [{ operationForTier, numbersOnTier, exp }, setState] =
    useState(STARTING_STATE);

  const updateNumber = useCallback(
    (number: number, numberStates: boolean[]) => {
      setState((old) => ({
        ...old,
        numbersOnTier: old.numbersOnTier.map((tier, idx) =>
          numberStates[idx] === true
            ? tier.includes(number)
              ? tier
              : [...tier, number]
            : tier.filter((n) => n !== number)
        ),
      }));
    },
    [setState]
  );

  return (
    <Flexbox direction="column" styles={styles.center}>
      <Board />
    </Flexbox>
  );
}

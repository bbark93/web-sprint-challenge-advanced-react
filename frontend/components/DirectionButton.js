import React from "react";
import { getXY, coordinates } from "./InfoFunct";

export default function DirectionButton(props) {
  function getNextIndex(direction) {
    let [x, y] = getXY(props.index);

    if (direction === "down" && y < 3) y++;
    if (direction === "up" && y > 1) y--;
    if (direction === "left" && x > 1) x--;
    if (direction === "right" && x < 3) x++;

    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i].x == x && coordinates[i].y == y) {
        return i;
      }
    }
  }

  function move(evt) {
    const Direction = evt.target.id;

    props.setMessage("");
    if (getNextIndex(Direction) == props.index) {
      props.setMessage(`You can't go ${Direction}`);
      return;
    }
    props.setIndex(getNextIndex(Direction));
    props.setSteps(props.steps + 1);
  }

  return (
    <button id={props.direction} onClick={move}>
      {props.direction}
    </button>
  );
}

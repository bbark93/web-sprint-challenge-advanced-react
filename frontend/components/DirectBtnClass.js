import React from "react";

export default class DirectBtnClass extends React.Component {
  reset = () => {
    this.props.updateState('message', this.props.initialState.message);
    this.props.updateState('email', this.props.initialState.email);
    this.props.updateState('index', this.props.initialState.index);
    this.props.updateState('steps', this.props.initialState.steps);
  };

  getNextIndex = (direction) => {
    let [x, y] = this.props.getXY(this.props.state.index);

    if (direction === "down" && y < 3) y++;
    if (direction === "up" && y > 1) y--;
    if (direction === "left" && x > 1) x--;
    if (direction === "right" && x < 3) x++;

    for (let i = 0; i < this.props.coordinates.length; i++) {
      if (
        this.props.coordinates[i].x == x && this.props.coordinates[i].y == y
      ) {
        return i;
      }
    }
  };

  move = (evt) => {
    const direction = evt.target.id;

    this.props.updateState('index',this.getNextIndex(direction));
    this.props.updateState('steps',this.props.state.steps + 1);
  }

  render() {
    return (
      <div id="keypad">
        {["left", "up", "right", "down", "reset"].map((btn) => (
          <button key={btn} id={btn} onClick={btn == 'reset' ? this.reset : this.move}>
            {btn}
          </button>
        ))}
      </div>
    );
  }
}

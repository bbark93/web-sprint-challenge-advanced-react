import React from "react";

export default class DirectBtnClass extends React.Component {
  reset = () => {
    this.setState(this.props.initialState);
    // Object.keys(this.props.initialState).forEach(key => {
    //     this.props.updateState(this.props.key, key);
    // });
  };

  getNextIndex = (direction) => {
    let [x, y] = this.props.getXY(this.props.state.index);

    if (direction === "down" && y < 3) y++;
    if (direction === "up" && y > 1) y--;
    if (direction === "left" && x > 1) x--;
    if (direction === "right" && x < 3) x++;

    for (let i = 0; i < this.props.coordinates.length; i++) {
      if (
        this.props.coordinates[i].x == x &&
        this.props.coordinates[i].y == y
      ) {
        return i;
      }
    }
  };

  move = (evt) => {
    const direction = evt.target.id;

    this.setState({message: this.props.initialState.message});
    if (this.getNextIndex(direction) == this.props.state.index) {
      this.setState({message: `You can't go ${direction}`});
      return;
    }
    this.setState({index: this.getNextIndex(direction)});
    console.log('getNextIndex =', this.getNextIndex(direction));
    console.log('next index =',this.props.state.index);
    this.setState({steps: this.props.state.steps + 1});
  }

  render() {
    return (
      <div id="keypad">
        {["left", "up", "right", "down", "reset"].map((btn) => (
        //   if (btn == "reset") {
        //     <button id={btn} onClick={this.reset}>
        //       {btn}
        //     </button>;
        //   }
          <button key={btn} id={btn} onClick={btn == 'reset' ? this.reset : this.move}>
            {btn}
          </button>
        ))}
      </div>
    );
  }
}

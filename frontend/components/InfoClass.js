import React from "react";

export default class InfoClass extends React.Component {
    getXYMessage = () => {
        const [x, y] = this.props.getXY(this.props.state.index);
    
        return `Coordinates (${x}, ${y})`;
      }

  render() {
    return (
      <div className="info">
        <h3 id="coordinates">{this.getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${this.props.state.steps} time${this.props.state.steps == 1 ? '': 's'}`}</h3>
      </div>
    );
  }
}
// You moved {this.props.state.steps} times
// ${props.steps == 1 ? '': 's'}
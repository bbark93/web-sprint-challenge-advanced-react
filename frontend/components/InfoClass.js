import React from "react";

export default class InfoClass extends React.Component {
    // getXY = () => {
    //     return [this.props.coordinates[this.props.state.index].x, this.props.coordinates[this.props.state.index].y];
    // }

    getXYMessage = () => {
        const [x, y] = this.props.getXY(this.props.state.index);
    
        return `Coordinates (${x}, ${y})`;
      }

  render() {
    return (
      <div className="info">
        <h3 id="coordinates">{this.getXYMessage()}</h3>
        <h3 id="steps">You moved {this.props.state.steps} times</h3>
      </div>
    );
  }
}

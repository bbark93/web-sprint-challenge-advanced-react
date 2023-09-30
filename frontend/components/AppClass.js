import React from "react";
import axios from "axios";

import InfoClass from "./InfoClass";
import DirectBtnClass from "./DirectBtnClass";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

const coordinates = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
];

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    };
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return [coordinates[this.state.index].x, coordinates[this.state.index].y];
  };

  updateState = (stateName, stateValue) => {
    this.setState({[stateName]: stateValue})
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault();
    this.setState({ email: evt.target.value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const payload = {
      x: coordinates[this.state.index].x,
      y: coordinates[this.state.index].y,
      steps: this.state.steps,
      email: this.state.email,
    };

    this.postPayload(payload);
    this.setState({ email: initialEmail });
  };

  postPayload = (payload) => {
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => {
        if (err.response.status == 403)
          this.setState({ message: err.response.data.message });
        if (err.response.status == 422)
          this.setState({ message: err.response.data.message });
      });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <InfoClass
          state={this.state}
          coordinates={coordinates}
          getXY={this.getXY}
        />
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <DirectBtnClass
          state={this.state}
          initialState={initialState}
          getXY={this.getXY}
          coordinates={coordinates}
          updateState={this.updateState}
        />
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

import React from 'react'
import axios from 'axios'

import InfoClass from './InfoClass'
import DirectBtnClass from './DirectBtnClass'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

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
    this.state = {...initialState};
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return [coordinates[this.state.index].x, coordinates[this.state.index].y];
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [x, y] = this.getXY(this.state.index);

    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let [x, y] = this.getXY(this.state.index);

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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;

    this.setState({message: initialMessage});
    if (this.getNextIndex(direction) == this.state.index) {
      this.setState({message: `You can't go ${direction}`});
      return;
    }
    this.setState({index: this.getNextIndex(direction)});
    this.setState({steps: this.state.steps + 1});
  }

  updateState = (stateValue, stateName)=> {
    this.setState({[stateName]:stateValue});
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault();
    this.setState({email: evt.target.value});
  }

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
    this.setState({email: initialEmail})
  }

  postPayload = (payload) => {
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        this.setState({message: res.data.message});
      })
      .catch((err) => {
        if (err.response.status == 403) this.setState({message: err.response.data.message});
        if (err.response.status == 422) this.setState({message: err.response.data.message});
      });
  };

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <InfoClass state={this.state} coordinates={coordinates} getXY={this.getXY} />
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        {/* <div id="keypad">
          <button id="left" onClick={this.move} >LEFT</button>
          <button id="up" onClick={this.move} >UP</button>
          <button id="right" onClick={this.move} >RIGHT</button>
          <button id="down" onClick={this.move} >DOWN</button>
          <button id="reset" onClick={this.reset} >reset</button>
        </div> */}
        <DirectBtnClass state={this.state} initialState={initialState} getXY={this.getXY} coordinates={coordinates} setState={this.setState} />
        <form onSubmit={this.onSubmit} >
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email} ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

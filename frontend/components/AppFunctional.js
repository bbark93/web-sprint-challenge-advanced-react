import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ResetFunct from './ResetFunct'
import InfoFunct from './InfoFunct'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const coordinates = [
                          { x:1,y:1 },
                          { x:2,y:1 },
                          { x:3,y:1 },
                          { x:1,y:2 },
                          { x:2,y:2 },
                          { x:3,y:2 },
                          { x:1,y:3 },
                          { x:2,y:3 },
                          { x:3,y:3 }
                        ];

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return [coordinates[index].x,coordinates[index].y];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [x, y] = getXY();

    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let [x, y] = getXY();

    if (direction === 'down' && y < 3) y++;
    if (direction === 'up' && y > 1) y--;
    if (direction === 'left' && x > 1) x--;
    if (direction === 'right' && x < 3) x++;

    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i].x == x && coordinates[i].y == y) {
        return i;
      }
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    console.log(evt.target.id);
    const direction = evt.target.id;

    setMessage(initialMessage);
    if (getNextIndex(direction) == index){
      setMessage(`You can't go ${direction}`)
      return;
    } 
    setIndex(getNextIndex(direction));
    setSteps(steps + 1);
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    setEmail(evt.target.value);
    console.log(email);
    formSubmit();
    setEmail(initialEmail);

  }

  const postPayload = payload => {
    axios.post("http://localhost:9000/api/result", payload)
      .then(res => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch(err => {
        // console.log(err);
        if (err.response.status == 403) setMessage(err.response.data.message);
      })
  }

  const formSubmit = () => {
    const [x, y] = getXY();
    const payload = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    }
    postPayload(payload);
  } 

  return (
    <div id="wrapper" className={props.className}>
      <InfoFunct steps={steps} index={index}/>
      {/* <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${steps} times`}</h3>
      </div> */}
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
        {console.log(index)}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move} >LEFT</button>
        <button id="up" onClick={move} >UP</button>
        <button id="right" onClick={move} >RIGHT</button>
        <button id="down" onClick={move} >DOWN</button>
        {/* <button id="reset" onClick={reset} >reset</button> */}
        <ResetFunct 
            setEmail={setEmail} 
            setIndex={setEmail}
            setSteps={setSteps}
            setMessage={setMessage}/>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

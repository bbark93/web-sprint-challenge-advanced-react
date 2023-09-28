import React, { useState } from "react";
import axios from "axios";

import ResetFunct from "./ResetFunct";
import InfoFunct, { coordinates } from "./InfoFunct";
import DirectionButton from "./DirectionButton";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex) 

  function onChange(evt) {
    // You will need this to update the value of the input.
    evt.preventDefault();
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    // const [x, y] = getXY();
    const payload = {
      x: coordinates[index].x,
      y: coordinates[index].y,
      steps: steps,
      email: email,
    };

    
    postPayload(payload);
    setEmail(initialEmail);
  }

  const postPayload = (payload) => {
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 403) setMessage(err.response.data.message);
        if (err.response.status == 422) setMessage(err.response.data.message);
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <InfoFunct steps={steps} index={index} />
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        {["left", "up", "right", "down"].map((direction) => (
          <DirectionButton
            key={direction}
            direction={direction}
            index={index}
            steps={steps}
            setIndex={setIndex}
            setSteps={setSteps}
            setMessage={setMessage}
          />
        ))}
        <ResetFunct
          setEmail={setEmail}
          setIndex={setIndex}
          setSteps={setSteps}
          setMessage={setMessage}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

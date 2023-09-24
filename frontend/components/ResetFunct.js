import React from "react";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function ResetFunct(props) {
  function reset() {
    // console.log(props);
    props.setSteps(initialSteps);
    props.setMessage(initialMessage);
    props.setEmail(initialEmail);
    props.setIndex(initialIndex);
  }

  return (
    <button id="reset" onClick={reset}>
      reset
    </button>
  );
}

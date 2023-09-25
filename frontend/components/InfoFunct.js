import React from "react";

export const coordinates = [
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

export function getXY(index) {
    return [coordinates[index].x,coordinates[index].y];
}

function getXYMessage(index) {
  const [x, y] = getXY(index);

  return `Coordinates (${x}, ${y})`; 
}

export default function InfoFunct(props) {
  return (
    <div className="info">
        <h3 id="coordinates">{getXYMessage(props.index)}</h3>
        <h3 id="steps">{`You moved ${props.steps} times`}</h3>
    </div>
  );
}
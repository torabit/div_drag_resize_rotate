import React from "react";
import { Position, Size } from "../../models";
import RotateDiv from "../atoms/RotateDiv";
import { cursorDirectionArray, direction } from "../../utils";

interface Props {
  deg: number
  setDeg: (deg: number) => void
  size: Size
  position: Position
}

const RotateAll: React.FC<Props> = (props) => {
  const directionsNum = [
    direction.ne, 
    direction.se, 
    direction.sw, 
    direction.nw
  ];
  return (
    <>
      {directionsNum.map(d => (
        <RotateDiv 
          key={d}
          styleName={`rotate ${cursorDirectionArray[d]}`} 
          deg={props.deg} 
          setDeg={props.setDeg}
          size={props.size}
          position={props.position}
        />
      ))}
    </>
  )
}

export default RotateAll;
import React from "react";
import { Position, Size } from "../../models";
import ResizeDiv from "../atoms/ResizeDiv";
import { cursorDirectionArray, direction } from "../../utils";

interface Props {
  size: Size
  setSize: (size: Size) => void
  position: Position
  setPosition: (position: Position) => void
  deg: number
}

const ResizerAll: React.FC<Props> = (props) => {
  const directionsNum = [
    direction.n, 
    direction.ne, 
    direction.e, 
    direction.se, 
    direction.s, 
    direction.sw, 
    direction.w, 
    direction.nw
  ];
  return (
    <>
      {directionsNum.map(d => (
        <ResizeDiv 
          key={d}
          directionNum={d} 
          styleName={`resizer ${cursorDirectionArray[d]}`}
          size={props.size}
          setSize={props.setSize}
          position={props.position}
          setPosition={props.setPosition}
          deg={props.deg}
        />
      ))}
    </>
  )
}

export default ResizerAll;
import React from "react";
import { Position, Size } from "../../models";
import ResizeDiv from "../atoms/ResizeDiv";
import { cursorDirectionArray } from "../../utils";

interface Props {
  size: Size
  setSize: (size: Size) => void
  position: Position
  setPosition: (position: Position) => void
  deg: number
}

const ResizerAll: React.FC<Props> = (props) => {
  const direction = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {direction.map(d => (
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
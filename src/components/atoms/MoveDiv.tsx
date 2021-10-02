import React from "react";
import { Movable } from "../../able";
import { Position } from "../../models";

interface Props {
  position: Position
  setPosition: (position: Position) => void
}

const MoveDiv: React.FC<Props> = (props) => {
  const move = Movable<HTMLDivElement>(props.position, props.setPosition);
  return(
    <div
      className="move"
      onPointerDown={move.onPointerDown}
      onPointerMove={move.onPointerMove}
      onPointerUp={move.onPointerUp}
    />  
  )
}

export default MoveDiv;
import React from "react";
import { Movable } from "../../able";

const MoveDiv: React.FC = () => {
  const move = Movable<HTMLDivElement>();
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
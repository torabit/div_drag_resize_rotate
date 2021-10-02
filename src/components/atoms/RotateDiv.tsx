import React from "react";
import { Rotatable } from "../../able";
import { Position, Size } from "../../models";

interface Props {
  styleName: string
  deg: number
  setDeg: (deg: number) => void
  size: Size
  position: Position
}

const RotateDiv: React.FC<Props> = (props) => {
  const rotate = Rotatable<HTMLDivElement>(
    props.deg, 
    props.setDeg,
    props.size,
    props.position
  );

  return(
    <div 
      className={props.styleName}
      onPointerDown={rotate.onPointerDown}
      onPointerMove={rotate.onPointerMove}
      onPointerUp={rotate.onPointerUp}
    />
  );
}

export default RotateDiv;
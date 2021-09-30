import React from "react";
import { Rotatable } from "../../able";

interface Props {
  styleName: string
}

const RotateDiv: React.FC<Props> = (props) => {
  const rotate = Rotatable<HTMLDivElement>();

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
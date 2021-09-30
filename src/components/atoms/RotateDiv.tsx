import React from "react";
import { Rotatable } from "../../able";
import "../../App.css";

const RotateDiv: React.FC = () => {
  const rotate = Rotatable<HTMLDivElement>();

  return(
    <div className="rotate">
        <div className="rotate-circle"
          onPointerDown={rotate.onPointerDown}
          onPointerMove={rotate.onPointerMove}
          onPointerUp={rotate.onPointerUp}
        />
        <div className="rotate-bar"/>
    </div>
  );
}

export default RotateDiv;
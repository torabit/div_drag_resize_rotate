import React from "react";
import { Resizeable } from "../../able";

interface Props {
  direction: number;
}

const ResizeDiv: React.FC<Props> = (props) => {
  const resize = Resizeable<HTMLDivElement>(props.direction);

  return (
    <div
      className="resizer"
      onPointerDown={resize.onPointerDown}
      onPointerMove={resize.onPointerMove}
      onPointerUp={resize.onPointerUp}
    />
  )
}

export default ResizeDiv;
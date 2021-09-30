import React from "react";
import { Resizeable } from "../../able";

interface Props {
  directionNum: number;
  styleName: string;
}

const ResizeDiv: React.FC<Props> = (props) => {
  const resize = Resizeable<HTMLDivElement>(props.directionNum);

  return (
    <div
      className={props.styleName}
      onPointerDown={resize.onPointerDown}
      onPointerMove={resize.onPointerMove}
      onPointerUp={resize.onPointerUp}
    />
  )
}

export default ResizeDiv;
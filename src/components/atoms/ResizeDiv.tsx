import React from "react";
import { Resizeable } from "../../able";
import { getCursor } from "../../utils";
import { Position, Size } from "../../models";

interface Props {
  directionNum: number
  styleName: string
  size: Size
  setSize: (size: Size) => void
  position: Position
  setPosition: (position: Position) => void
  deg: number
}

const ResizeDiv: React.FC<Props> = (props) => {
  const resize = Resizeable<HTMLDivElement>(
    props.size, 
    props.setSize, 
    props.position,
    props.setPosition,
    props.deg,
    props.directionNum
  );
  const cursor = getCursor(props.deg, props.directionNum);
  
  return (
    <div
      className={props.styleName}
      onPointerDown={resize.onPointerDown}
      onPointerMove={resize.onPointerMove}
      onPointerUp={resize.onPointerUp}
      style={{
        cursor: cursor
      }}
    />
  )
}

export default ResizeDiv;
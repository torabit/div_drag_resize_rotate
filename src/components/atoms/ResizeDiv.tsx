import React from "react";
import { Resizeable } from "../../able";
import { getCursor } from "../../utils";
import DegState from "../../states/atoms/DegState";
import { useRecoilValue } from "recoil";

interface Props {
  directionNum: number;
  styleName: string;
}

const ResizeDiv: React.FC<Props> = (props) => {
  const resize = Resizeable<HTMLDivElement>(props.directionNum);
  const deg = useRecoilValue(DegState);
  const cursor = getCursor(deg, props.directionNum);
  
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
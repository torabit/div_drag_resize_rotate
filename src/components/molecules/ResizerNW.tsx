import React from "react";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";
import RotateDiv from "../atoms/RotateDiv";

const ResizerNW: React.FC = () => {
  return (
    <div>
      <RotateDiv styleName={"rotate nw"}/>
      <ResizeDiv directionNum={direction.nw} styleName={"resizer nw"}/>
    </div>
  )
}

export default ResizerNW;
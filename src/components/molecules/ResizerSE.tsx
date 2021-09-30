import React from "react";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";
import RotateDiv from "../atoms/RotateDiv";

const ResizerSE: React.FC = () => {
  return (
    <div>
      <RotateDiv styleName={"rotate se"}/>
      <ResizeDiv directionNum={direction.se} styleName={"resizer se"}/>
    </div>
  )
}

export default ResizerSE;
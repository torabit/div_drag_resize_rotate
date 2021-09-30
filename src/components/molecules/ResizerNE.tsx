import React from "react";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";
import RotateDiv from "../atoms/RotateDiv";

const ResizerNE: React.FC = () => {
  return (
    <div>
      <RotateDiv styleName={"rotate ne"}/>
      <ResizeDiv directionNum={direction.ne} styleName={"resizer ne"}/>
    </div>
  )
}

export default ResizerNE;
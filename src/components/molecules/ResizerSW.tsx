import React from "react";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";
import RotateDiv from "../atoms/RotateDiv";

const ResizerSW: React.FC = () => {
  return (
    <div>
      <RotateDiv styleName={"rotate sw"}/>
      <ResizeDiv directionNum={direction.sw} styleName={"resizer sw"}/>
    </div>
  )
}

export default ResizerSW;
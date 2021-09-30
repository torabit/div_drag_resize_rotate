import React from "react";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";
import ResizerNE from "../molecules/ResizerNE";
import ResizerSE from "../molecules/ResizerSE";
import ResizerSW from "../molecules/ResizerSW";
import ResizerNW from "../molecules/ResizerNW";

const ResizerAll: React.FC = () => {
  return (
    <React.Fragment>
      <ResizeDiv directionNum={direction.n} styleName={"resizer n"}/>
      <ResizerNE/>
      <ResizeDiv directionNum={direction.e} styleName={"resizer e"}/>
      <ResizerSE/>
      <ResizeDiv directionNum={direction.s} styleName={"resizer s"}/>
      <ResizerSW/>
      <ResizeDiv directionNum={direction.w} styleName={"resizer w"}/>
      <ResizerNW/>
    </React.Fragment>
  )
}

export default ResizerAll;
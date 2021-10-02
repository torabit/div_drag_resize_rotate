import React from "react";
import { Position, Size } from "../../models";
import { direction } from "../../utils";
import ResizeDiv from "../atoms/ResizeDiv";

interface Props {
  size: Size
  setSize: (size: Size) => void
  position: Position
  setPosition: (position: Position) => void
  deg: number
}

const ResizerAll: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <ResizeDiv 
        directionNum={direction.n} 
        styleName={"resizer n"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.ne} 
        styleName={"resizer ne"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.e} 
        styleName={"resizer e"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.se} 
        styleName={"resizer se"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.s} 
        styleName={"resizer s"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.sw} 
        styleName={"resizer sw"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.w} 
        styleName={"resizer w"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
      <ResizeDiv 
        directionNum={direction.nw} 
        styleName={"resizer nw"}
        size={props.size}
        setSize={props.setSize}
        position={props.position}
        setPosition={props.setPosition}
        deg={props.deg}
      />
    </React.Fragment>
  )
}

export default ResizerAll;
import React from "react";
import { Position, Size } from "../../models";
import RotateDiv from "../atoms/RotateDiv";

interface Props {
  deg: number
  setDeg: (deg: number) => void
  size: Size
  position: Position
}

const RotateAll: React.FC<Props> = (props) => {
  return (
    <>
      <RotateDiv styleName={"rotate ne"} 
        deg={props.deg} 
        setDeg={props.setDeg}
        size={props.size}
        position={props.position}
      />
      <RotateDiv 
        styleName={"rotate se"} 
        deg={props.deg} 
        setDeg={props.setDeg}
        size={props.size}
        position={props.position}
      />
      <RotateDiv 
        styleName={"rotate sw"} 
        deg={props.deg} 
        setDeg={props.setDeg}
        size={props.size}
        position={props.position}
      />
      <RotateDiv 
        styleName={"rotate nw"} 
        deg={props.deg} 
        setDeg={props.setDeg}
        size={props.size}
        position={props.position}
      />
    </>
  )
}

export default RotateAll;
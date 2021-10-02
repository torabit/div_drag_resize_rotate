import React, { useState } from "react";
import MoveDiv from "../atoms/MoveDiv";
import ResizerAll from "../molecules/ResizerAll";
import RotateAll from "../molecules/RotateAll";
import { Position, Size } from "../../models";
import '../../App.css';

interface Props {
  position: Position,
  size: Size,
  deg: number
  isMovable: boolean,
  isResizeable: boolean,
  isRotatable: boolean
}

const MyDraggable: React.FC<Props> = (props) => {
  const [position, setPosition] = useState(props.position);
  const [size, setSize] = useState(props.size);
  const [deg, setDeg] = useState(props.deg);
  return (
    <div
      className="item"
      id="item"
      style={{ 
        transform: `rotate(${deg}deg)`, 
        width: Math.abs(size.width), 
        height: Math.abs(size.height),
        left: position.x - Math.abs(size.width) / 2,
        top: position.y - Math.abs(size.height) / 2, 
      }}
    >
      {props.isMovable && (
        <MoveDiv
          position={position}
          setPosition={setPosition}
        />
      )}
      {props.isResizeable && (
        <ResizerAll 
          size={size} 
          setSize={setSize} 
          position={position}
          setPosition={setPosition}
          deg={deg}
        />
      )}
      {props.isRotatable && (
        <RotateAll 
          deg={deg} 
          setDeg={setDeg}
          size={size}
          position={position}
        />
      )}
    </div>
  );
};

export default MyDraggable;
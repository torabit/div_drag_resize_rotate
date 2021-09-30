import React from "react";
import { useRecoilValue } from "recoil";
import PositionState from "../../states/atoms/PositionState";
import SizeState from "../../states/atoms/SizeState";
import RadianState from "../../states/atoms/RadianState";
import MoveDiv from "../atoms/MoveDiv";
import ResizerAll from "../organisms/ResizerAll";
import '../../App.css';


const MyDraggable: React.FC = () => {
  const position = useRecoilValue(PositionState);
  const size = useRecoilValue(SizeState);
  const radian = useRecoilValue(RadianState);
  
  return (
    <div
      className="item"
      id="item"
      style={{ 
        transform: `rotate(${radian}deg)`, 
        width: Math.abs(size.width), 
        height: Math.abs(size.height),
        left: position.x - Math.abs(size.width) / 2,
        top: position.y - Math.abs(size.height) / 2, 
      }}
    >
      <MoveDiv/>
      <ResizerAll/>
    </div>
  );
};

export default MyDraggable;
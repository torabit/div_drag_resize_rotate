import React from "react";
import { useRecoilValue } from "recoil";
import PositionState from "../../states/atoms/PositionState";
import SizeState from "../../states/atoms/SizeState";
import RadianState from "../../states/atoms/RadianState";
import { Resizeable } from "../../able"
import { direction } from "../../utils";
import '../../App.css';
import RotateDiv from "../atoms/RotateDiv";
import MoveDiv from "../atoms/MoveDiv";
// import ResizeDiv from "../atoms/ResizeDiv";

const MyDraggable: React.FC = () => {
  const position = useRecoilValue(PositionState);
  const size = useRecoilValue(SizeState);
  const radian = useRecoilValue(RadianState);

  const resizingE = Resizeable<HTMLDivElement>(direction.e);
  const resizingW = Resizeable<HTMLDivElement>(direction.w);
  const resizingS = Resizeable<HTMLDivElement>(direction.s);
  const resizingN = Resizeable<HTMLDivElement>(direction.n);
  const resizingNe = Resizeable<HTMLDivElement>(direction.ne);
  const resizingSe = Resizeable<HTMLDivElement>(direction.se);
  const resizingSw = Resizeable<HTMLDivElement>(direction.sw);
  const resizingNw = Resizeable<HTMLDivElement>(direction.nw);
  
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
      <RotateDiv/>
      {/* <ResizeDiv direction={direction.e}/> */}
      <div
        className="resizer n"
        onPointerDown={resizingN.onPointerDown}
        onPointerMove={resizingN.onPointerMove}
        onPointerUp={resizingN.onPointerUp}
      />
      <div 
        className="resizer ne"
        onPointerDown={resizingNe.onPointerDown}
        onPointerMove={resizingNe.onPointerMove}
        onPointerUp={resizingNe.onPointerUp}
      />
      <div className="resizer nw"
        onPointerDown={resizingNw.onPointerDown}
        onPointerMove={resizingNw.onPointerMove}
        onPointerUp={resizingNw.onPointerUp}
      />
      <div
        className="resizer e"
        onPointerDown={resizingE.onPointerDown}
        onPointerMove={resizingE.onPointerMove}
        onPointerUp={resizingE.onPointerUp}
      />
      <div 
        className="resizer se"
        onPointerDown={resizingSe.onPointerDown}
        onPointerMove={resizingSe.onPointerMove}
        onPointerUp={resizingSe.onPointerUp}
      />
      <div
        className="resizer s"
        onPointerDown={resizingS.onPointerDown}
        onPointerMove={resizingS.onPointerMove}
        onPointerUp={resizingS.onPointerUp}
      />
      <div 
        className="resizer sw"
        onPointerDown={resizingSw.onPointerDown}
        onPointerMove={resizingSw.onPointerMove}
        onPointerUp={resizingSw.onPointerUp}
      />
      <div
        className="resizer w"
        onPointerDown={resizingW.onPointerDown}
        onPointerMove={resizingW.onPointerMove}
        onPointerUp={resizingW.onPointerUp}
      />
    </div>
  );
};

export default MyDraggable;
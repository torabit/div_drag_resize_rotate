import React from "react";
import { useRecoilValue } from "recoil";
import PositionState from "../../states/atoms/PositionState";
import SizeState from "../../states/atoms/SizeState";
import DegState from "../../states/atoms/DegState";
import { Movable, Resizer, Rotatable} from "../../able"
import { Direction } from "../../utils";
import '../../App.css';

const MyDraggable: React.FC = () => {
  const position = useRecoilValue(PositionState);
  const size = useRecoilValue(SizeState);
  const deg = useRecoilValue(DegState);
  
  const move = Movable<HTMLDivElement>();
  const rotate = Rotatable<HTMLDivElement>();

  const resizingE = Resizer<HTMLDivElement>(Direction.e);
  const resizingW = Resizer<HTMLDivElement>(Direction.w);
  const resizingS = Resizer<HTMLDivElement>(Direction.s);
  const resizingN = Resizer<HTMLDivElement>(Direction.n);
  const resizingNe = Resizer<HTMLDivElement>(Direction.ne);
  const resizingSe = Resizer<HTMLDivElement>(Direction.se);
  const resizingSw = Resizer<HTMLDivElement>(Direction.sw);
  const resizingNw = Resizer<HTMLDivElement>(Direction.nw);
  
  return (
    <div
      className="item"
      id="item"
      style={{ 
        transform: `rotate(${deg}deg)`, 
        width: Math.abs(size.width), 
        height: Math.abs(size.height),
        left: Math.abs(position.x),
        top: Math.abs(position.y), 
      }}
    >
      <div
        className="move"
        onPointerDown={move.onPointerDown}
        onPointerMove={move.onPointerMove}
        onPointerUp={move.onPointerUp}
      />
      <div className="rotate">
        <div className="rotate-circle"
          onPointerDown={rotate.onPointerDown}
          onPointerMove={rotate.onPointerMove}
          onPointerUp={rotate.onPointerUp}
        />
        <div className="rotate-bar"/>
      </div>
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
import { useState, useCallback, PointerEvent } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";
import {useDragReturn, RotateState} from "../interfaces/index";
import { stat } from "fs";

export const Rotatable = <T extends Element> (): useDragReturn<T> => {

  const [state, setState] = useState<RotateState | null>(null);
  const [deg, setDeg] = useRecoilState(DegState);
  const size = useRecoilValue(SizeState);
  const position = useRecoilValue(PositionState);


  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        currentSize: {
          height: size.height,
          width: size.width
        },
        currentPosition: {
          x: position.x,
          y: position.y
        },
        startVector: {
          x: event.clientX - position.x,
          y: event.clientY - position.y,
        },
      });
      console.log(position.x + (size.width / 2), position.y + (size.height / 2));
    },
    [size.height, size.width, size.height, size.width, position.x, position.y]
  );

  const dragging = useCallback(
    (event: PointerEvent<T>) => {

      event.preventDefault();
      if (state === null) return;

      const currentCursor = {
        x: event.pageX,
        y: event.pageY
      };
      // let centerX = state.currentPosition.x + (state.currentSize.width / 2);
      // let centerY = state.currentPosition.y + (state.currentSize.height / 2);
      const rotateVector = {
        x: event.clientX - state.currentPosition.x,
        y: event.clientY - state.currentPosition.y
      }
      
      const dot = state.startVector.x * rotateVector.x + state.startVector.y * rotateVector.y;
      const det = state.startVector.x * rotateVector.y - state.startVector.y * rotateVector.x;
      const radian = Math.atan2(det, dot) / Math.PI
      const angle = radian * 180
      // let radian = Math.atan2(centerY - currentCursor.y, centerX - currentCursor.x);
      // let rot = (radian * (180 / Math.PI));
      // let angle = rot;
      // if(rot >= 360) {
      //   angle -= 360;
      // } else if(rot < 0) {
      //   angle += 360;
      // }
      setDeg((deg + angle + 360) % 360);
    },
    [state]
  );

  const endDrag = useCallback(
    (event: PointerEvent<T>) => {

      event.currentTarget.releasePointerCapture(event.pointerId);
      setState(null);

      if (state === null) return;

      const currentCursor = {
        x: event.pageX,
        y: event.pageY
      };

      // let centerX = state.currentPosition.x + (state.currentSize.width / 2);
      // let centerY = state.currentPosition.y + (state.currentSize.height / 2);
      const rotateVector = {
        x: event.clientX - state.currentPosition.x,
        y: event.clientY - state.currentPosition.y
      }
      const dot = state.startVector.x * rotateVector.x + state.startVector.y * rotateVector.y;
      const det = state.startVector.x * rotateVector.y - state.startVector.y * rotateVector.x;
      const radian = Math.atan2(det, dot) / Math.PI
      const angle = radian * 180
      setDeg((deg + angle + 360) % 360);

    },
    [state]
  );
  return {
    onPointerDown: startDrag,
    onPointerMove: dragging,
    onPointerUp: endDrag,
    dragging: state !== null
  };
}
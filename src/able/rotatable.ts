import { useState, useCallback, PointerEvent } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import RadianState from "../states/atoms/RadianState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";
import {useDragReturn, RotateState} from "../interfaces/index";
import { getAngle } from "../utils";

export const Rotatable = <T extends Element> (): useDragReturn<T> => {

  const [state, setState] = useState<RotateState | null>(null);
  const [radian, setRadian] = useRecoilState(RadianState);
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
    },
    [size.height, size.width, position.x, position.y]
  );

  const dragging = useCallback(
    (event: PointerEvent<T>) => {

      event.preventDefault();
      if (state === null) return;

      const rotateVector = {
        x: event.clientX - state.currentPosition.x,
        y: event.clientY - state.currentPosition.y
      }
      
      const angle = getAngle(state.startVector, rotateVector);
      setRadian(angle + (radian + 360) % 360);
    },
    [state, setRadian]
  );

  const endDrag = useCallback(
    (event: PointerEvent<T>) => {

      event.currentTarget.releasePointerCapture(event.pointerId);
      setState(null);

      if (state === null) return;

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
import { useState, useCallback, PointerEvent } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";
import {useDragReturn, RotateState} from "../models/index";
import { getAngle } from "../utils";

export const Rotatable = <T extends Element> (): useDragReturn<T> => {

  const [state, setState] = useState<RotateState | null>(null);
  const [deg, setDeg] = useRecoilState(DegState);
  const size = useRecoilValue(SizeState);
  const position = useRecoilValue(PositionState);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        startSize: {
          height: size.height,
          width: size.width
        },
        startPosition: {
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
        x: event.clientX - state.startPosition.x,
        y: event.clientY - state.startPosition.y
      }
      
      const angle = getAngle(state.startVector, rotateVector);
      setDeg(angle + (deg + 360) % 360);
    },
    [state, setDeg]
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
import { useState, useCallback, PointerEvent } from "react";
import {useDragReturn, RotateState, Size, Position} from "../models/index";
import { getAngle } from "../utils";

export const Rotatable = <T extends Element> (
  deg: number,
  setDeg: (deg: number) => void,
  size: Size,
  position: Position
): useDragReturn<T> => {

  const [state, setState] = useState<RotateState | null>(null);

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
      let newDeg = angle + deg;
      setDeg(newDeg);
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
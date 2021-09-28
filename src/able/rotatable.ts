import { useState, useCallback, PointerEvent } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";
import {useDragReturn, RotateState} from "../interfaces/index";

export const Rotatable = <T extends Element> (): useDragReturn<T> => {

  const [state, setState] = useState<RotateState | null>(null);
  const setDeg = useSetRecoilState(DegState);
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
        }
      });
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

      let x = state.currentPosition.x + (state.currentSize.width / 2);
      let y = state.currentPosition.y + (state.currentSize.height / 2);
      let radian = Math.atan2(currentCursor.y - y, currentCursor.x  - x);
      let rot = (radian * (180 / Math.PI) + 90);

      setDeg(Math.round(rot));
    },
    [state, setDeg]
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

      let x = state.currentPosition.x + (state.currentSize.width / 2);
      let y = state.currentPosition.y + (state.currentSize.height / 2);
      let radian = Math.atan2(currentCursor.y - y, currentCursor.x  - x);
      let rot = (radian * (180 / Math.PI) + 90);

      setDeg(Math.round(rot));
    },
    [state, setDeg]
  );
  return {
    onPointerDown: startDrag,
    onPointerMove: dragging,
    onPointerUp: endDrag,
    dragging: state !== null
  };
}
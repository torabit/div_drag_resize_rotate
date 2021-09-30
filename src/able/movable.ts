import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState} from "recoil";
import PositionState from "../states/atoms/PositionState";
import { useDragReturn, DragState } from "../models/index";
import { getDelta } from "../utils";

export const Movable = <T extends Element>(): useDragReturn<T> => {

  const [state, setState] = useState<DragState | null>(null);

  const [position, setPosition] = useRecoilState(PositionState);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      
      event.currentTarget.setPointerCapture(event.pointerId);

      setState({
        startPosition: {
          x: position.x,
          y: position.y,
        },
        startCursor: {
          x: event.clientX,
          y: event.clientY,
        }
      });
      
    },
    [position.x, position.y]
  );

  const dragging = useCallback(
    (event: PointerEvent<T>) => {

      event.preventDefault();
      if (state === null) return;

      const currentCursor = {
        x: event.clientX,
        y: event.clientY
      };
      
      const delta = getDelta(state.startCursor, currentCursor);

      setPosition({
        x: state.startPosition.x - delta.x,
        y: state.startPosition.y - delta.y,
      });

    },
    [state, setPosition]
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
};

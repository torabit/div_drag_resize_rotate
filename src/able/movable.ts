import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState} from "recoil";
import PositionState from "../states/atoms/PositionState";
import { useDragReturn, DragState } from "../interfaces/index";

export const Movable = <T extends Element>(): useDragReturn<T> => {

  const [state, setState] = useState<DragState | null>(null);

  const [position, setPosition] = useRecoilState(PositionState);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      
      event.currentTarget.setPointerCapture(event.pointerId);

      setState({
        currentPosition: {
          x: position.x,
          y: position.y,
        },
        startCursor: {
          x: event.pageX,
          y: event.pageY,
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
        x: event.pageX,
        y: event.pageY
      };

      setPosition({
        x: state.currentPosition.x + currentCursor.x - state.startCursor.x,
        y: state.currentPosition.y + currentCursor.y - state.startCursor.y,
      });

    },
    [state, setPosition]
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

      setPosition({
        x: state.currentPosition.x + currentCursor.x - state.startCursor.x,
        y: state.currentPosition.y + currentCursor.y - state.startCursor.y,
      });

    },
    [state, setPosition]
  );
  return {
    onPointerDown: startDrag,
    onPointerMove: dragging,
    onPointerUp: endDrag,
    dragging: state !== null
  };
};

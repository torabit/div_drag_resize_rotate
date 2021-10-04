import { useState, useCallback, PointerEvent } from "react";
import { useDragReturn, DragState, Position } from "../models/index";
import { getDelta } from "../utils";

export const Movable = <T extends Element>(
  position: Position,
  setPosition: (position: Position) => void
): useDragReturn<T> => {

  const [state, setState] = useState<DragState | null>(null);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      
      // 素早くドラッグした場合、要素からカーソルがはみ出た場合の挙動を強制する。
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

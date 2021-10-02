import { useState, useCallback, PointerEvent } from "react";
import { useDragReturn, ReSizeState, Position, Size } from "../models";
import { direction, getDelta, getLength } from "../utils";

export const Resizeable = <T extends Element> (
  size: Size,
  setSize: (size:Size) => void,
  position: Position,
  setPosition: (position: Position) => void,
  deg: number,
  directionNum: number
): useDragReturn<T> => {
  
  const [state, setState] = useState<ReSizeState | null>(null);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        startSize: {
          height: size.height,
          width: size.width
        },
        startCursor: {
          x: event.clientX,
          y: event.clientY
        },
        startPosition: {
          x: position.x,
          y: position.y
        }
      });
    },
    [size.height, size.width, position.x, position.y]
  );

  const dragging = useCallback(
    (event: PointerEvent<T>) => {

      event.preventDefault();
      if (state === null) return;

      const currentCursor: Position = {
        x: event.clientX,
        y: event.clientY
      };

      const delta = getDelta(state.startCursor, currentCursor);
      const deltaL = getLength(delta.x, delta.y);
      const rotateAngle = deg * Math.PI / 180;
      const alpha = Math.atan2(delta.y, delta.x);
      const beta = alpha - rotateAngle;
      const deltaW = deltaL * Math.cos(beta);
      const deltaH = deltaL * Math.sin(beta);

      switch (directionNum) {
        case direction.n: 
          // s固定
          setSize({
            width: state.startSize.width,
            height: state.startSize.height + deltaH
          });
          setPosition({
            x: state.startPosition.x + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.ne:
          // sw固定
          setSize({
            width: state.startSize.width - deltaW,
            height: state.startSize.height + deltaH
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaW / 2 * Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.e:
          // w固定
          setSize({
            width: state.startSize.width - deltaW,
            height: state.startSize.height
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle),
            y: state.startPosition.y - deltaW / 2* Math.sin(rotateAngle)
          });
        break;

        case direction.se:
          // nw固定
          setSize({
            width: state.startSize.width - deltaW,
            height: state.startSize.height - deltaH
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaW / 2* Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.s:
          // n固定
          setSize({
            width: state.startSize.width,
            height: state.startSize.height - deltaH
          });
          setPosition({
            x: state.startPosition.x + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.sw:
          // ne固定
          setSize({
            width: state.startSize.width + deltaW,
            height: state.startSize.height - deltaH
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaW / 2* Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.w:
          // e固定
          setSize({
            width: state.startSize.width + deltaW,
            height: state.startSize.height
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle),
            y: state.startPosition.y - deltaW / 2 * Math.sin(rotateAngle)
          });
        break;

        case direction.nw:
          // se固定
          setSize({
            width: state.startSize.width + deltaW,
            height: state.startSize.height + deltaH
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaW / 2 * Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          })
        break;
      }
    },
    [state, setSize, setPosition, directionNum, deg]
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
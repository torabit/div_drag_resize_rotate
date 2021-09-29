import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDragReturn, ReSizeState } from "../interfaces";
import { Direction } from "../utils";
import RadianState from "../states/atoms/RadianState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";

export const Resizer = <T extends Element> (direction: number): useDragReturn<T> => {
  
  const [state, setState] = useState<ReSizeState | null>(null);

  const [size, setSize] = useRecoilState(SizeState);
  const [position, setPosition] = useRecoilState(PositionState);
  const radian = useRecoilValue(RadianState);

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        currentSize: {
          height: size.height,
          width: size.width
        },
        startCursor: {
          x: event.clientX,
          y: event.clientY
        },
        currentPosition: {
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

      const currentCursor = {
        x: event.clientX,
        y: event.clientY
      };

      const deltaX = state.startCursor.x - currentCursor.x;
      const deltaY = state.startCursor.y - currentCursor.y; 
      const deltaL = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const rotateAngle = radian * Math.PI / 180;
      const alpha = Math.atan2(deltaY, deltaX);
      const beta = alpha - rotateAngle;
      const deltaW = deltaL * Math.cos(beta);
      const deltaH = deltaL * Math.sin(beta)

      switch (direction) {
        case Direction.n: 
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height + deltaH
          });
          setPosition({
            x: state.currentPosition.x + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case Direction.ne:
          setSize({
            width: state.currentSize.width - deltaW,
            height: state.currentSize.height + deltaH
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaW / 2 * Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case Direction.e:
          setSize({
            width: state.currentSize.width - deltaW,
            height: state.currentSize.height
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle),
            y: state.currentPosition.y - deltaW / 2* Math.sin(rotateAngle)
          });
        break;

        case Direction.se:
          setSize({
            width: state.currentSize.width - deltaW,
            height: state.currentSize.height - deltaH
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaW / 2* Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case Direction.sw:
          setSize({
            width: state.currentSize.width + deltaW,
            height: state.currentSize.height - deltaH
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaW / 2* Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case Direction.w:
          setSize({
            width: state.currentSize.width + deltaW,
            height: state.currentSize.height
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle),
            y: state.currentPosition.y - deltaW / 2 * Math.sin(rotateAngle)
          });
        break;

        case Direction.s:
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height - deltaH
          });
          setPosition({
            x: state.currentPosition.x + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case Direction.nw:
          setSize({
            width: state.currentSize.width + deltaW,
            height: state.currentSize.height + deltaH
          });
          setPosition({
            x: state.currentPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.currentPosition.y - deltaW / 2 * Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          })
        break;
      }
    },
    [state, setSize, setPosition, direction, radian]
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
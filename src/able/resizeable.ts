import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDragReturn, ReSizeState, Position } from "../models";
import { direction, getDelta, getLength } from "../utils";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";

export const Resizeable = <T extends Element> (divDirection: number): useDragReturn<T> => {
  
  const [state, setState] = useState<ReSizeState | null>(null);

  const [size, setSize] = useRecoilState(SizeState);
  const [position, setPosition] = useRecoilState(PositionState);
  const deg = useRecoilValue(DegState);

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

      switch (divDirection) {
        case direction.n: 
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
          setSize({
            width: state.startSize.width - deltaW,
            height: state.startSize.height - deltaH
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle) + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaW / 2* Math.sin(rotateAngle) - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.sw:
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
          setSize({
            width: state.startSize.width + deltaW,
            height: state.startSize.height
          });
          setPosition({
            x: state.startPosition.x - deltaW / 2 * Math.cos(rotateAngle),
            y: state.startPosition.y - deltaW / 2 * Math.sin(rotateAngle)
          });
        break;

        case direction.s:
          setSize({
            width: state.startSize.width,
            height: state.startSize.height - deltaH
          });
          setPosition({
            x: state.startPosition.x + deltaH / 2 * Math.sin(rotateAngle),
            y: state.startPosition.y - deltaH / 2 * Math.cos(rotateAngle)
          });
        break;

        case direction.nw:
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
    [state, setSize, setPosition, divDirection, deg]
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
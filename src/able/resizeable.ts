import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDragReturn, ReSizeState, Direction } from "../interfaces";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";

export const Resizer = <T extends Element> (direction: number): useDragReturn<T> => {
  
  const [state, setState] = useState<ReSizeState | null>(null);

  const [size, setSize] = useRecoilState(SizeState);
  const [position, setPosition] = useRecoilState(PositionState);
  const deg = useRecoilValue(DegState);

  const checkDeg = useCallback(() => {
      if(deg >= 247.5 || deg >= -90 && deg <= -67.5)return (direction + 7) % 8;
      else if(deg >= -67.5 && deg <= -22.5) return (direction) % 8;
      else if(deg >= -22.5 && deg <= 22.5) return direction;
      else if(deg >= 22.5 && deg <= 67.5) return (direction + 1) % 8;
      else if(deg >= 67.5 && deg <= 112.5) return (direction + 2) % 8;
      else if(deg >= 112.5 && deg <= 157.5) return (direction + 3) % 8;
      else if(deg >= 157.5 && deg <= 202.5) return (direction + 4) % 8;
      else if(deg >= 202.5 && deg <= 247.5) return (direction + 5) % 8;
      return direction + 6 % 8;
    },
    [deg, direction]
  );

  const startDrag = useCallback(
    (event: PointerEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        currentSize: {
          height: size.height,
          width: size.width
        },
        startCursor: {
          x: event.pageX,
          y: event.pageY
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
        x: event.pageX,
        y: event.pageY
      };
      console.log(checkDeg());
      switch (checkDeg()) {
        case Direction.n: 
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x,
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.ne:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x,
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.e:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height
          });
        break;

        case Direction.se:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.sw:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y
          });
        break;

        case Direction.w:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y
          });
        break;

        case Direction.s:
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.nw:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          })
        break;
      }
    },
    [state, setSize, setPosition]
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

      switch (checkDeg()) {
        case Direction.n: 
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x,
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.ne:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x,
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.e:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height
          });
        break;

        case Direction.se:
          setSize({
            width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.sw:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y
          });
        break;

        case Direction.w:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y
          });
        break;

        case Direction.s:
          setSize({
            width: state.currentSize.width,
            height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
          });
        break;

        case Direction.nw:
          setSize({
            width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
            height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
          });
          setPosition({
            x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
            y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
          })
        break;
      }
    },
    [state, setSize, setPosition]
  );
  return {
    onPointerDown: startDrag,
    onPointerMove: dragging,
    onPointerUp: endDrag,
    dragging: state !== null
  };
}
import { useState, useCallback, PointerEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDragReturn, ReSizeState } from "../interfaces";
import { Direction } from "../utils";
import DegState from "../states/atoms/DegState";
import PositionState from "../states/atoms/PositionState";
import SizeState from "../states/atoms/SizeState";

export const Resizer = <T extends Element> (direction: number): useDragReturn<T> => {
  
  const [state, setState] = useState<ReSizeState | null>(null);

  const [size, setSize] = useRecoilState(SizeState);
  const [position, setPosition] = useRecoilState(PositionState);
  const deg = useRecoilValue(DegState);

  // const checkDeg = useCallback(() => {
  //     if(deg > 311 || deg < 49) return direction;
  //     else if(deg > 41 && deg < 139) return (direction + 2) % 8;
  //     else if(deg > 131 && deg < 229) return (direction + 4) % 8;
  //     else if(deg > 221 && deg < 319) return (direction + 6) % 8;
  //   },
  //   [deg, direction]
  // );

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

      let isHorizontal = !(Math.round(Math.abs(deg - 90) / 90) % 2);
      console.log(direction);
      // if(!isHorizontal) {
        switch (direction) {
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
            const deltaX = state.startCursor.x - currentCursor.x;
            const deltaY = state.startCursor.y - currentCursor.y; 
            const deltaL = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const radian = deg * Math.PI / 180;
            const alpha = Math.atan2(deltaY, deltaX);
            const beta = alpha - radian;
            const deltaW = deltaL * Math.cos(beta);
            const deltaH = deltaL * Math.sin(beta)
            setSize({
              width: state.currentSize.width - deltaW,
              height: state.currentSize.height
            });
            console.log('x', deltaW * Math.cos(radian), 'y', deltaW * Math.sin(radian))
            console.log('radian', radian);
            console.log('deltaW', deltaW);
            console.log('beta',beta);
            setPosition({
              x: state.currentPosition.x - deltaW / 2 * Math.cos(radian),
              y: state.currentPosition.y - deltaW / 2* Math.sin(radian)
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
        // }
      // } else {
      //   const centerX = state.currentPosition.x + (state.currentSize.width / 2);
      //   const centerY = state.currentPosition.y + (state.currentSize.height / 2);
      //   const currentX = centerX - (state.currentPosition.y - centerY);
      //   const currentY = centerY + (state.currentPosition.x - centerX);
      //   switch (direction) {
      //     case Direction.n: 
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height
      //       });
      //       setPosition({
      //         x: state.currentPosition.x - ((state.startCursor.y - currentCursor.y) / 2),
      //         y: state.currentPosition.y - ((state.startCursor.y - currentCursor.y) / 2),
      //       });
      //     break;

      //     case Direction.ne:
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x ,
      //         y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
      //       });
      //     break;

      //     case Direction.e:
      //       setSize({
      //         width: state.currentSize.width,
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x - ((state.startCursor.x - currentCursor.x) / 2),
      //         y: state.currentPosition.y + ((state.startCursor.x - currentCursor.x) / 2)
      //       });
      //     break;

      //     case Direction.se:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //     break;

      //     case Direction.s:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height
      //       });
      //       setPosition({
      //         x: state.currentPosition.x + ((state.startCursor.y - currentCursor.y) / 2),
      //         y: state.currentPosition.y - ((state.startCursor.y - currentCursor.y) / 2),
      //       });
      //     break;

      //     case Direction.sw:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x,
      //         y: state.currentPosition.y
      //       });
      //     break;

      //     case Direction.w:
      //       setSize({
      //         width: state.currentSize.width,
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x - ((state.startCursor.x - currentCursor.x) / 2),
      //         y: state.currentPosition.y - ((state.startCursor.x - currentCursor.x) / 2)
      //       });
      //     break;

      //     case Direction.nw:
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x,
      //         y: state.currentPosition.y
      //       })
      //     break;
      //   }
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
        x: event.clientX,
        y: event.clientY
      };

      let isHorizontal = !(Math.round(Math.abs(deg - 90) / 90) % 2);

      // if(!isHorizontal || undefined) {
        // switch (direction) {
        //   case Direction.n: 
        //     setSize({
        //       width: state.currentSize.width,
        //       height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
        //     });
        //     setPosition({
        //       x: state.currentPosition.x,
        //       y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
        //     });
        //   break;

        //   case Direction.ne:
        //     setSize({
        //       width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
        //     });
        //     setPosition({
        //       x: state.currentPosition.x,
        //       y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
        //     });
        //   break;

        //   case Direction.e:
        //     setSize({
        //       width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height
        //     });
        //     const deltaW = (state.startCursor.x - currentCursor.x) / 2
        //     const radian = deg * Math.PI / 180;
            
        //     setPosition({
        //       x: deltaW * Math.cos(radian),
        //       y: deltaW * Math.sin(radian)
        //     });
        //   break;

        //   case Direction.se:
        //     setSize({
        //       width: state.currentSize.width - (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
        //     });
        //   break;

        //   case Direction.sw:
        //     setSize({
        //       width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
        //     });
        //     setPosition({
        //       x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
        //       y: state.currentPosition.y
        //     });
        //   break;

        //   case Direction.w:
        //     setSize({
        //       width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height
        //     });
        //     setPosition({
        //       x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
        //       y: state.currentPosition.y
        //     });
        //   break;

        //   case Direction.s:
        //     setSize({
        //       width: state.currentSize.width,
        //       height: state.currentSize.height - (state.startCursor.y - currentCursor.y)
        //     });
        //   break;

        //   case Direction.nw:
        //     setSize({
        //       width: state.currentSize.width + (state.startCursor.x - currentCursor.x),
        //       height: state.currentSize.height + (state.startCursor.y - currentCursor.y)
        //     });
        //     setPosition({
        //       x: state.currentPosition.x - (state.startCursor.x - currentCursor.x),
        //       y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
        //     })
        //   break;
        // }
      // } else {
      //   const centerX = state.currentPosition.x + (state.currentSize.width / 2);
      //   const centerY = state.currentPosition.y + (state.currentSize.height / 2);
      //   const currentX = centerX - (state.currentPosition.y - centerY);
      //   const currentY = centerY + (state.currentPosition.x - centerX);
      //   switch (direction) {
      //     case Direction.n: 
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height
      //       });
      //       // setPosition({
      //       //   x: state.currentPosition.x,
      //       //   y: state.currentPosition.y - ((state.startCursor.y - currentCursor.y) / 2),
      //       // });
      //     break;

      //     case Direction.ne:
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x,
      //         y: state.currentPosition.y - (state.startCursor.y - currentCursor.y)
      //       });
      //     break;

      //     case Direction.e:
      //       setSize({
      //         width: state.currentSize.width,
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x - ((state.startCursor.x - currentCursor.x) / 2),
      //         y: state.currentPosition.y + ((state.startCursor.x - currentCursor.x) / 2)
      //       });
      //     break;

      //     case Direction.se:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height - (state.startCursor.x - currentCursor.x)
      //       });
      //     break;

      //     case Direction.s:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height
      //       });
      //       setPosition({
      //         x: state.currentPosition.x + ((state.startCursor.y - currentCursor.y) / 2),
      //         y: state.currentPosition.y - ((state.startCursor.y - currentCursor.y) / 2),
      //       });
      //     break;

      //     case Direction.sw:
      //       setSize({
      //         width: state.currentSize.width - (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x,
      //         y: state.currentPosition.y
      //       });
      //     break;

      //     case Direction.w:
      //       setSize({
      //         width: state.currentSize.width,
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x - ((state.startCursor.x - currentCursor.x) / 2),
      //         y: state.currentPosition.y - ((state.startCursor.x - currentCursor.x) / 2)
      //       });
      //     break;

      //     case Direction.nw:
      //       setSize({
      //         width: state.currentSize.width + (state.startCursor.y - currentCursor.y),
      //         height: state.currentSize.height + (state.startCursor.x - currentCursor.x)
      //       });
      //       setPosition({
      //         x: state.currentPosition.x,
      //         y: state.currentPosition.y
      //       })
      //     break;
      //   }
    //   }
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
import { Direction } from "../models"

export const direction: Direction = {n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7}

export const getLength = (
  x: number, y: number
) => Math.sqrt(x * x + y * y);

export const getAngle = (
  startVector: {x: number, y: number},
  rotateVector: {x: number, y: number},
) => {
  const dot = startVector.x * rotateVector.x + startVector.y * rotateVector.y;
  const det = startVector.x * rotateVector.y - startVector.y * rotateVector.x;
  const angle = Math.atan2(det, dot) / Math.PI * 180;
  return (angle + 360) % 360;
}

export const getDelta = (
  startCursor: {x: number, y: number},
  currentCursor: {x: number, y: number}
) => {
  const delta = {
    x: startCursor.x - currentCursor.x,
    y: startCursor.y - currentCursor.y,
  }
  return delta;
}

const cursorDirectionArray = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ]

export const getCursor = (
  rotateAngle: number, 
  d: number
) => {
  const increment = getCursorMap(rotateAngle);
  const newIndex = (d + increment!) % 8
  return cursorDirectionArray[ newIndex ] + '-resize';
}

const getCursorMap = (angle: number) => {
  const index = Math.floor(angle / 30);
  if(index === 0) return 0;
  else if(index === 1) return 1;
  else if(index === 2 || index === 3) return 2;
  else if(index === 4) return 3;
  else if(index === 5 || index === 6) return 4;
  else if(index === 7) return 5;
  else if(index === 8 || index === 9) return 6;
  else if(index === 10) return 7;
  else if(index === 11)return 8;
}
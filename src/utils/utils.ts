import { Direction } from "../interfaces"

export const direction: Direction = {n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7}

export const getLength = (
  x:number, y:number
) => Math.sqrt(x * x + y * y);

export const getAngle = (
  startVector : {x: number, y: number},
  rotateVector: {x: number, y: number},
) => {
  const dot = startVector.x * rotateVector.x + startVector.y * rotateVector.y;
  const det = startVector.x * rotateVector.y - startVector.y * rotateVector.x;
  const angle = Math.atan2(det, dot) / Math.PI * 180;
  return (angle + 360) % 360;
}
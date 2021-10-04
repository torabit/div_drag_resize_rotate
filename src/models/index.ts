import { PointerEvent } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Direction {
  n: number,
  ne: number,
  e: number,
  se: number,
  s: number,
  sw: number,
  w: number,
  nw: number,
}

export interface useDragReturn<T extends Element> {
  onPointerDown: (event: PointerEvent<T>) => void;
  onPointerMove: (event: PointerEvent<T>) => void;
  onPointerUp: (event: PointerEvent<T>) => void;
  dragging: boolean;
}

export interface DragState {
  startPosition: Position;
  startCursor: Position;
}

export interface ReSizeState {
  startSize: Size;
  startPosition: Position;
  startCursor: Position;
}

export interface RotateState {
  startSize: Size;
  startPosition: Position;
  startVector: Position;
  startDeg: number;
}
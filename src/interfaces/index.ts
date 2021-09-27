import { PointerEvent } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface useDragReturn<T extends Element> {
  onPointerDown: (event: PointerEvent<T>) => void;
  onPointerMove: (event: PointerEvent<T>) => void;
  onPointerUp: (event: PointerEvent<T>) => void;
  dragging: boolean;
}

export interface DragState {
  currentPosition: Position;
  startCursor: Position;
}

export interface ReSizeState {
  currentSize: Size;
  currentPosition: Position;
  startCursor: Position
}

export const Direction = {
  'n': 0, 
  'ne': 1, 
  'e': 2, 
  'se': 3, 
  's': 4,
  'sw': 5,
  'w': 6,
  'nw': 7
}
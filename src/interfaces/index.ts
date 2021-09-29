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

export interface RotateState {
  currentSize: Size;
  currentPosition: Position;
  startVector: Position
}
import { atom } from "recoil";
import { Position } from "../../interfaces";

const PositionState = atom<Position> ({
  key: "PositionState",
  default: {x: 0, y: 0}
});

export default PositionState;
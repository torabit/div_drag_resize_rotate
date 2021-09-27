import { atom } from "recoil";
import { Position } from "../../interfaces";

const PositionState = atom<Position> ({
  key: "PositionState",
  default: {x: 300, y: 150}
});

export default PositionState;
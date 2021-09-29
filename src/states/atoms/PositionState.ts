import { atom } from "recoil";
import { Position } from "../../interfaces";

const PositionState = atom<Position> ({
  key: "PositionState",
  default: {x: 250, y: 200}
});

export default PositionState;
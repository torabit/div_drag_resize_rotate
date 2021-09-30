import { atom } from "recoil";
import { Position } from "../../models";

const PositionState = atom<Position> ({
  key: "PositionState",
  default: {x: 250, y: 200}
});

export default PositionState;
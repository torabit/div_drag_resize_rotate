import { atom } from "recoil";

const DegState = atom<number> ({
  key: "DegState",
  default: 0
});

export default DegState;
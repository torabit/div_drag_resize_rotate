import { atom } from "recoil";

const RadianState = atom<number> ({
  key: "RadianState",
  default: 0
});

export default RadianState;
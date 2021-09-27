import { atom } from "recoil";
import { Size } from "../../interfaces";

const SizeState = atom<Size> ({
  key: "SizeState",
  default: {width: 150, height: 150}
});

export default SizeState;
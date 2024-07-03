import { atom } from "jotai";

export const userAtom = atom();
export const fmcAtom = atom();
export const socialAtom = atom();
export const audioAtom = atom({
  isPlaying: false,
  isPaused: false,
  url: null,
});

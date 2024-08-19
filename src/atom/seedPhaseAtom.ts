import { atom } from "recoil";

export const seedPhaseAtom = atom<string[]>({
    key: 'seedPhaseAtom',
    default: [],
});
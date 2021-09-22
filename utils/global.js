import { atom } from "recoil"

export const dropdownMenu = atom({
  key: "dropdownMenu",
  default: false,
})

export const sideState = atom({
  key: "sideState",
  default: true,
})

import { atom } from "recoil"

export const dropdownMenu = atom({
  key: "dropdownMenu",
  default: false,
})

export const sideState = atom({
  key: "sideState",
  default: true,
})

export const showPhoto = atom({
  key: "showPhoto",
  default: false,
})

export const photoUrl = atom({
  key: "photoUrl",
  default: "default",
})

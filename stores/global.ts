import { atom } from 'recoil'

export const tokenState = atom<undefined | string>({
  key: 'token',
  default: undefined,
})

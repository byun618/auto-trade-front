import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { tokenState } from '../stores/global'

export const useTokenValue = () => {
  const token = useRecoilValue(tokenState)

  return token
}

export const useSetToken = () => {
  const setToken = useSetRecoilState(tokenState)

  return setToken
}

const useToken = () => {
  return useRecoilState(tokenState)
}

export default useToken

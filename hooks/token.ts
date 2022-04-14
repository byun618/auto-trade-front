import { get, set, CookieValue } from '../lib/helper/cookie'

type useTokenHook = [CookieValue, (v: string) => void]

export function getToken(): CookieValue {
  return get('token')
}

export function setToken(token: CookieValue): void {
  set('token', token)
}

function useToken(initialValue?: CookieValue): useTokenHook {
  const token = get('token')
  const setToken = (toValue: CookieValue): void => {
    set('token', toValue)
  }

  if (initialValue) {
    setToken(initialValue)
  }

  return [token, setToken]
}

export default useToken

import { get, set, CookieValue } from '../lib/helper/cookie'

type useTokenHook = [CookieValue, (v: string) => void]

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

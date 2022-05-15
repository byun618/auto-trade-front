import { get, set, remove, CookieValue } from '../lib/helper/cookie'

const useCookie = (name: string) => {
  const cookie = get(name)

  const setCookie = (value: CookieValue) => set(name, value)

  const removeCookie = () => remove(name)

  return [cookie, setCookie, removeCookie]
}

export default useCookie

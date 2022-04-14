import Cookies from 'universal-cookie'

export type CookieValue = string | undefined

const cookies: Cookies = new Cookies()

export function get(name: string): CookieValue {
  const value: CookieValue = cookies.get(name)

  return value
}

export function set(name: string, value: CookieValue): void {
  return cookies.set(name, value)
}

export default cookies

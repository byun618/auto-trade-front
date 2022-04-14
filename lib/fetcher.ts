import Cookies from 'universal-cookie'

type Methods = 'GET' | 'POST'

const cookies: Cookies = new Cookies()

const token: string = cookies.get('token') ?? ''

async function request(
  method: Methods,
  url: string,
  body?: BodyInit | null,
): Promise<Response | void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    })

    const data = await response.json()

    return data
  } catch (err) {
    console.log('>>> ', err)
  }

  // 에러 처리 추가 필요
}

export function get(
  url: string,
  body: BodyInit | null = null,
): Promise<Response | void> {
  return request('GET', url, body)
}

export function post(
  url: string,
  body: BodyInit | null = null,
): Promise<Response | void> {
  return request('POST', url, body)
}

import Cookies from 'universal-cookie'
import axios, { AxiosError, AxiosResponse, Method } from 'axios'

const cookies: Cookies = new Cookies()

interface RequestPayload {
  method: Method
  url: string
  params?: object
  data?: object
}

const token: string = cookies.get('token') ?? ''

async function request<T>({
  method,
  url,
  params,
  data,
}: RequestPayload): Promise<AxiosResponse<T>> {
  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (err: any) {
    console.log(err)
    if (err.response) {
      const {
        data: {
          error: { message },
        },
      } = err.response
      throw new Error(message)
    }
    throw err
  }
}

export async function get<T>(
  url: string,
  params?: object,
): Promise<AxiosResponse<T>> {
  return await request({
    method: 'GET',
    url,
    params,
  })
}

export async function post<T>(
  url: string,
  data?: object,
): Promise<AxiosResponse<T>> {
  return await request({ method: 'POST', url, data })
}

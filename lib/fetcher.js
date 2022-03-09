async function request(method, url, body) {
  try {
    const response = await fetch(`http://localhost:3000${url}`, {
      method,
      body,
    })

    const data = await response.json()

    return data
  } catch (err) {
    console.log('>>>', err)
  }
}

export function get(url, body) {
  return request('GET', url, body)
}

export function post(url, body) {
  return request('POST', url, body)
}

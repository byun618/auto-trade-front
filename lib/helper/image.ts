interface ImagePayload {
  url: string
  width: number
  height: number
}

/**
 * ncnc-lambda를 이용하여 리사이징된 이미지의 url을 가져옵니다.
 * @param {ImagePayload} imagePayload
 * @returns {string} `url`
 */
export function getImageResizeQueryAddedUrl({
  url,
  width,
  height,
}: ImagePayload): string {
  return `${url}?w=${width * 3}&h=${height * 3}&f=`
}

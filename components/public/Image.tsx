import NextImage from 'next/image'

interface ImagePayload {
  url: string
  width: number
  height: number
}

interface ImageProps {
  src?: any
  url?: string
  alt: string
  width: number
  height: number
  style?: object
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

/**
 * `url`은 반드시 NCNC-BENEFITS 버킷의 CloudFront domain을 사용해야 합니다.
 *
 * 이 외의 주소는 `next.config.js`의 `images.domain` 배열에 추가 후 사용하세요.
 */
export default function Image({
  src,
  url,
  alt,
  width,
  height,
  style,
}: ImageProps) {
  return (
    <NextImage
      src={url ? getImageResizeQueryAddedUrl({ url, width, height }) : src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}

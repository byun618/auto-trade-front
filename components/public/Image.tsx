import NextImage from 'next/image'
import { getImageResizeQueryAddedUrl } from '../../lib/helper/image'

// any 없애기
interface ImageProps {
  src?: any
  url?: string
  alt: string
  width: number
  height: number
  style?: object
}

/**
 * `url`은 반드시 NCNC-BENEFITS 버킷의 CloudFront domain을 사용해야 합니다.
 *
 * 이 외의 주소는 `next.config.js`의 `images.domain` 배열에 추가 후 사용하세요.
 */
export default function Image({ src, url, alt, width, height }: ImageProps) {
  return (
    <NextImage
      src={url ? getImageResizeQueryAddedUrl({ url, width, height }) : src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}

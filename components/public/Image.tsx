import NextImage, { StaticImageData } from 'next/image'
import { getImageResizeQueryAddedUrl } from '../../lib/helper/image'

interface StaticRequire {
  default: StaticImageData
}

type StaticImport = StaticRequire | StaticImageData

interface ImageData {
  alt: string
  width: number
  height: number
  style?: object
}

interface ImageSrcProps extends ImageData {
  src: string | StaticImport
}

interface ImageUrlProps extends ImageData {
  url: string
}

type ImageProps = ImageSrcProps | ImageUrlProps

/**
 * `url`은 반드시 NCNC-BENEFITS 버킷의 CloudFront domain을 사용해야 합니다.
 *
 * 이 외의 주소는 `next.config.js`의 `images.domain` 배열에 추가 후 사용하세요.
 */
export default function Image(imageProps: ImageProps) {
  const { alt, width, height, style } = imageProps

  let src

  if ('url' in imageProps) {
    src = getImageResizeQueryAddedUrl({ url: imageProps.url, width, height })
  } else {
    src = imageProps.src
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
    />
  )
}

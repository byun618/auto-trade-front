import NextImage, { StaticImageData } from 'next/image'
import { getImageResizeQueryAddedUrl } from '../../lib/helper/image'

interface StaticRequire {
  default: StaticImageData
}

type StaticImport = StaticRequire | StaticImageData

interface ImageProps {
  src?: string | StaticImport
  url?: string
  alt: string
  width: number
  height: number
  style?: object
}

export default function Image(imageProps: ImageProps) {
  const { alt, width, height, style } = imageProps

  let src

  if ('url' in imageProps) {
    if (imageProps.url) {
      src = getImageResizeQueryAddedUrl({ url: imageProps.url, width, height })
    }
  } else {
    src = imageProps.src
  }

  return src ? (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
    />
  ) : (
    <></>
  )
}

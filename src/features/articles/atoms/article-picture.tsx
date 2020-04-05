import React from 'react'

import { Image } from '../../../ui/atoms'
import { Multimedia } from '../types'

type Props = {
  columnWidth: number
  data: Multimedia
  className?: string
}

export const ArticlePicture: React.FC<Props> = ({ data, columnWidth, className }) => {
  const { url, width, height } = data
  const uri = `${process.env.CONTENT_URI}/${url}`
  const imgHeight = Math.ceil((columnWidth * height) / width)

  return (
    <Image src={uri} height={imgHeight} alt="article image" loading="lazy" className={className} />
  )
}

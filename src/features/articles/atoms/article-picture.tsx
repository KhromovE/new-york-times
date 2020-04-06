import React from 'react'
import styled from 'styled-components'

import { Image } from '../../../ui/atoms'
import { Multimedia } from '../types'

type Props = {
  imageWidth: number
  data: Multimedia
  className?: string
}

const StyledImage = styled(Image)`
  margin-bottom: 1rem;
`

export const ArticlePicture: React.FC<Props> = ({ data, imageWidth, className }) => {
  const { url, width, height } = data
  const uri = `${process.env.CONTENT_URL}/${url}`
  const imgHeight = Math.ceil((imageWidth * height) / width)

  return (
    <StyledImage
      src={uri}
      height={imgHeight}
      alt="article image"
      loading="lazy"
      className={className}
    />
  )
}

import React from 'react'
import styled from 'styled-components'

import { Image } from '../../../ui/atoms'
import { CONTENT_URI } from '../../../constants/uri'
import { Multimedia } from '../types'

type Props = {
  columnWidth: number
  data: Multimedia
}

const ArticleImage = styled(Image)`
  width: 100%;
  filter: sepia(80%) grayscale(1) contrast(1) opacity(0.8);
`

export const ArticlePicture: React.FC<Props> = ({ data, columnWidth }) => {
  const { url, width, height } = data
  const uri = `${CONTENT_URI}/${url}`
  const imgHeight = Math.ceil((columnWidth * height) / width)

  return <ArticleImage src={uri} height={imgHeight} alt="article image" loading="lazy" />
}

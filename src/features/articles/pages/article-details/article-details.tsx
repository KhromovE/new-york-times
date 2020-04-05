import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../../../ui/templates'
import { Header } from '../../molecules'
import { FullArticle } from '../../organisms'
import { $article, pageLoaded } from './model'

export const ArticleDetails: React.FC = () => {
  const { id } = useParams()
  const article = useStore($article)

  useEffect(() => {
    pageLoaded(id)
  }, [id])

  return (
    <MainTemplate subline={<div>qwe</div>} header={<Header />}>
      {article !== null && <FullArticle article={article} />}
    </MainTemplate>
  )
}

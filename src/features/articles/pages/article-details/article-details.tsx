import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useStoreMap } from 'effector-react'

import { MainTemplate } from '../../../../ui/templates'
import { DateString } from '../../atoms'
import { Header } from '../../molecules'
import { FullArticle } from '../../organisms'
import { $store } from './model'

export const ArticleDetails: React.FC = () => {
  const { id } = useParams()
  const article = useStoreMap({
    store: $store,
    keys: [id],
    fn: ({ list }, [articleId]) => list.find((item) => item.id === articleId) || null,
  })

  return (
    <MainTemplate subline={<DateString noMobile="true" />} header={<Header />}>
      {article !== null ? <FullArticle article={article} /> : <Redirect to="/" />}
    </MainTemplate>
  )
}

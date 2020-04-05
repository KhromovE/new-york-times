export type ArticlesDataParams = Readonly<{
  q?: string
  page?: number
  sort?: string
  fl?: string
}>

export type ArticlesData = Readonly<{
  response: {
    docs: {
      multimedia: { url: string }[]
      lead_paragraph: string
      abstract: string
      headline: {
        main: string
      }
      pub_date: string
      byline: { original: string }
      word_count: string
      _id: string
    }[]
  }
}>

export type Multimedia = Readonly<{
  url: string
  width: number
  height: number
  subtype: string
}>

export type Article = Readonly<{
  multimedia: Multimedia[]
  leadParagraph: string
  abstract: string
  headline: {
    main: string
  }
  pubDate: string
  byline: { original: string }
  wordCount: string
  id: string
  webUrl: string
}>

export type PreparedArticlesData = Readonly<{
  response: {
    docs: Article[]
  }
}>

export type SkeletonArticle = Readonly<{
  titleLineCount: number
  byLineCount: number
  textLineCount: number
  hasPicture: boolean
  pictureSize: number
}>

export type Sort = 'oldest' | 'newest'

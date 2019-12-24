import { h } from 'preact'
import NavBar from '../components/NavBar'
import PopularTags from '../components/PopularTags'
import { getArticles, getArticlesByTag } from '../services'
import ArticlePreview from '../components/ArticlePreview'
import { useEffect, useState } from 'preact/hooks'
import Pagination from '../components/Pagination'

interface HomeProps {
  tag?: string;
}

export default function Home(props: HomeProps) {
  const [ articles, setArticles ] = useState<Article[]>([])
  const [ articlesCount, setArticlesCount ] = useState(0)
  const [ page, setPage ] = useState(1)

  const fetchFeeds = async () => {
    setArticles([])
    if (props.tag) {
      const { articles = [], articlesCount = 0 } = await getArticlesByTag(props.tag, page)
      setArticles(articles)
      setArticlesCount(articlesCount)
    } else {
      const { articles = [], articlesCount = 0 } = await getArticles(page)
      setArticles(articles)
      setArticlesCount(articlesCount)
    }
  }

  const setArticle = (articleIndex: number , article: Article) => {
    const articlesCopy = [...articles]
    articlesCopy[articleIndex] = article
    setArticles(articlesCopy)
  }

  useEffect(() => {
    // TODO: page query parameter change
    fetchFeeds()
  }, [ page ])

  return (
    <div className="home-page">

      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">

          <div className="col-md-9">
            <NavBar currentActive={props.tag ? 'tag' : 'global'} {...{ tag: props.tag }} />

            {articles.map((article, index) => (
              <ArticlePreview key={article.slug} article={article} setArticle={article => setArticle(index, article)} />
            ))}

            <Pagination count={articlesCount} page={page} setPage={setPage} />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>

        </div>
      </div>
    </div>
  )
}

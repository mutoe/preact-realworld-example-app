import preact, { FunctionalComponent } from 'preact'
import { useLocation } from 'preact-iso/router'
import { useEffect, useState } from 'preact/hooks'
import ArticlePreview from 'public/components/ArticlePreview'
import NavBar from 'public/components/NavBar'
import Pagination from 'public/components/Pagination'
import PopularTags from 'public/components/PopularTags'
import { getArticles, getArticlesByTag, getFeeds } from 'public/services'

interface HomeProps {
  tag?: string;
}

const Home: FunctionalComponent<HomeProps> = (props) => {
  const [articles, setArticles] = useState<Article[]>([])
  const {url} = useLocation()
  const [articlesCount, setArticlesCount] = useState(0)
  const [page, setPage] = useState(1)

  const currentActive = url === '/my-feeds' ? 'personal' : props.tag ? 'tag' : 'global'

  const fetchFeeds = async () => {
    setArticles([])
    setArticlesCount(0)

    switch (currentActive) {
      case 'global': {
        const { articles = [], articlesCount = 0 } = await getArticles(page)
        setArticles(articles)
        setArticlesCount(articlesCount)
        break
      }
      case 'tag': {
        const { articles = [], articlesCount = 0 } = await getArticlesByTag(props.tag!, page)
        setArticles(articles)
        setArticlesCount(articlesCount)
        break
      }
      case 'personal': {
        const { articles = [], articlesCount = 0 } = await getFeeds(page)
        setArticles(articles)
        setArticlesCount(articlesCount)
      }
    }
  }

  const setArticle = (articleIndex: number, article: Article) => {
    const articlesCopy = [...articles]
    articlesCopy[articleIndex] = article
    setArticles(articlesCopy)
  }

  useEffect(() => {
    void fetchFeeds()
  }, [page, currentActive])

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
            <NavBar currentActive={currentActive} {...{ tag: props.tag }} />

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
export default Home

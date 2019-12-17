import { h } from 'preact'
import NavBar from '../components/NavBar'
import PopularTags from '../components/PopularTags'
import { getArticles, getArticlesByTag } from '../services'
import ArticlePreview from '../components/ArticlePreview'
import { useEffect, useState } from 'preact/hooks'

interface HomeProps {
  tag?: string;
}

export default function Home(props: HomeProps) {
  const [ articles, setArticles ] = useState<Article[]>([])
  const [ articlesCount, setArticlesCount ] = useState(0)

  const fetchFeeds = async () => {
    if (props.tag) {
      const { articles = [], articlesCount = 0 } = await getArticlesByTag(props.tag)
      setArticles(articles)
      setArticlesCount(articlesCount)
    } else {
      const { articles = [], articlesCount = 0 } = await getArticles()
      setArticles(articles)
      setArticlesCount(articlesCount)
    }
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

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

            {articles.map(article => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>

        </div>
      </div>
    </div>
  )
}

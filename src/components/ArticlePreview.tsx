import { FunctionalComponent, h } from 'preact'
import { deleteFavoriteArticle, postFavoriteArticle } from '../services'
import { useEffect, useState } from 'preact/hooks'
import { DEFAULT_AVATAR } from '../store/constants'

interface ArticlePreviewProps {
  article: Article;
  setArticle: (article: Article) => void;
}

const ArticlePreview: FunctionalComponent<ArticlePreviewProps> = (props) => {
  const { article, setArticle } = props
  const [isFavorited, setIsFavorited] = useState(false)

  async function onFavorite () {
    if (article.favorited) {
      const newArticle = await deleteFavoriteArticle(article.slug)
      setArticle(newArticle)
    } else {
      const newArticle = await postFavoriteArticle(article.slug)
      setArticle(newArticle)
    }
  }

  useEffect(() => {
    setIsFavorited(article.favorited)
  }, [article])

  const favoriteButtonClass = isFavorited
    ? 'btn-primary'
    : 'btn-outline-primary'

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/@${article.author.username}`}><img src={article.author.image || DEFAULT_AVATAR} /></a>
        <div className="info">
          <a href={`/@${article.author.username}`}
            className="author">{article.author.username}</a>
          <span className="date">{new Date(article.createdAt).toDateString()}</span>
        </div>
        <button className={`btn btn-sm pull-xs-right ${favoriteButtonClass}`} onClick={onFavorite}>
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <a href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  )
}

export default ArticlePreview

import { h } from 'preact'
import { deleteFavoriteArticle, postFavoriteArticle } from '../services'
import { useEffect, useState } from 'preact/hooks'

interface ArticlePreviewProps {
  article: Article;
}

export default function ArticlePreview(props: ArticlePreviewProps) {
  const { article } = props
  const [ isFavorited, setIsFavorited ] = useState(false)

  async function onFavorite() {
    if (article.favorited) {
      await deleteFavoriteArticle(article.slug)
      setIsFavorited(false)
    } else {
      await postFavoriteArticle(article.slug)
      setIsFavorited(true)
    }
  }

  useEffect(() => {
    setIsFavorited(article.favorited)
  }, [ article ])

  const favoriteButtonClass = isFavorited
    ? 'btn-primary'
    : 'btn-outline-primary'

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/@${article.author.username}`}><img src={article.author.image} /></a>
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

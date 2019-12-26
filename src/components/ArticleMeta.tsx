import { h } from 'preact'
import { dateFilter } from '../utils/filters'
import { DEFAULT_AVATAR } from '../store/constants'

interface ArticleMetaProps {
  article: Article;
}

export default function ArticleMeta(props: ArticleMetaProps) {
  const { article } = props

  return (
    <div className="article-meta">
      <a href={`/@${article.author.username}`}><img src={article.author.image || DEFAULT_AVATAR} /></a>
      <div className="info">
        <a href={`/@${article.author.username}`} className="author">{article.author.username}</a>
        <span className="date">{dateFilter(article.createdAt)}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" /> Follow {article.author.username}
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart" />
        &nbsp;
        Favorite Post <span className="counter">({article.favoritesCount})</span>
      </button>
    </div>
  )
}

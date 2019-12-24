import { h } from 'preact'

interface ArticleMetaProps {
  article: Article;
}

export default function ArticleMeta(props: ArticleMetaProps) {
  const { article } = props

  const dateFilter = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="article-meta">
      <a href=""><img src={article.author.image} /></a>
      <div className="info">
        <a href="" className="author">{article.author.username}</a>
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

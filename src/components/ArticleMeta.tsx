import { h } from 'preact'
import { dateFilter } from '../utils/filters'
import { DEFAULT_AVATAR } from '../store/constants'
import { deleteFollowProfile, postFollowProfile } from '../services'

interface ArticleMetaProps {
  article: Article;
  setArticle?: (article: Article) => void;
}

export default function ArticleMeta(props: ArticleMetaProps) {
  const { article, setArticle = () => void {} } = props

  const onFollowProfile = async () => {
    if (article.author.following) {
      const profile = await deleteFollowProfile(article.author.username)
      setArticle({ ...article, author: profile })
    } else {
      const profile = await postFollowProfile(article.author.username)
      setArticle({ ...article, author: profile })
    }
  }

  const followButtonClass = article.author.following ? 'btn-secondary' : 'btn-outline-secondary'

  return (
    <div className="article-meta">
      <a href={`/@${article.author.username}`}><img src={article.author.image || DEFAULT_AVATAR} /></a>
      <div className="info">
        <a href={`/@${article.author.username}`} className="author">{article.author.username}</a>
        <span className="date">{dateFilter(article.createdAt)}</span>
      </div>
      <button className={`btn btn-sm ${followButtonClass}`} onClick={onFollowProfile}>
        <i className="ion-plus-round" /> {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
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

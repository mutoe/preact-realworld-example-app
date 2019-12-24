import { h } from 'preact'
import { dateFilter } from '../utils/filters'

interface ArticleCommentCardProps {
  comment: ArticleComment;
  onDelete?: (commentId: number) => void;
}

export default function ArticleCommentCard(props: ArticleCommentCardProps) {
  const { comment, onDelete = () => void {} } = props

  if (!comment.author) return null

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a href="" className="comment-author">
          <img src={comment.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a href="" className="comment-author">{comment.author.username}</a>
        <span className="date-posted">{dateFilter(comment.createdAt)}</span>
        <span className="mod-options">
          {/*<i className="ion-edit" />*/}
          <i className="ion-trash-a" onClick={() => onDelete(comment.id)} />
        </span>
      </div>
    </div>
  )
}

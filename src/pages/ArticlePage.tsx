import { h } from 'preact'
import { deleteComment, getArticle, getCommentsByArticle } from '../services'
import { useEffect, useState } from 'preact/hooks'
import ArticleMeta from '../components/ArticleMeta'
import ArticleCommentCard from '../components/ArticleCommentCard'

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage(props: ArticlePageProps) {
  const [ article, setArticle ] = useState({ author: {} } as Article)
  const [ comments, setComments ] = useState<ArticleComment[]>([])

  const fetchArticle = async () => {
    const article = await getArticle(props.slug)
    setArticle(article)
  }

  const fetchComments = async () => {
    const comments = await getCommentsByArticle(props.slug)
    setComments(comments)
  }

  const onDeleteComment = async (commentId: number) => {
    await deleteComment(props.slug, commentId)
    setComments(prevState => prevState.filter(c => c.id !== commentId))
  }

  useEffect(() => {
    fetchArticle()
    fetchComments()
  }, [ props.slug ])

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">
            {article.body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>

            {comments.map((comment) => (
              <ArticleCommentCard key={comment.id}
                comment={comment}
                onDelete={onDeleteComment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

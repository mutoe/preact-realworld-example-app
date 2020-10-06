import { FunctionalComponent, h } from 'preact'
import { deleteComment, getArticle, getCommentsByArticle, postComment } from '../services'
import { useEffect, useState } from 'preact/hooks'
import ArticleMeta from '../components/ArticleMeta'
import ArticleCommentCard from '../components/ArticleCommentCard'
import { useRootState } from '../store'
import { DEFAULT_AVATAR } from '../store/constants'

interface ArticlePageProps {
  slug: string;
}

const ArticlePage: FunctionalComponent<ArticlePageProps> = (props) => {
  const { slug } = props
  const [article, setArticle] = useState({ author: {} } as Article)
  const [comments, setComments] = useState<ArticleComment[]>([])
  const [commentBody, setCommentBody] = useState('')
  const [{ user }] = useRootState()

  const fetchArticle = async () => {
    const article = await getArticle(slug)
    setArticle(article)
  }

  const fetchComments = async () => {
    const comments = await getCommentsByArticle(slug)
    setComments(comments)
  }

  const onDeleteComment = async (commentId: number) => {
    await deleteComment(slug, commentId)
    setComments(prevState => prevState.filter(c => c.id !== commentId))
  }

  const onPostComment = async () => {
    const comment = await postComment(slug, commentBody)
    setCommentBody('')
    setComments(prevComments => [comment, ...prevComments])
  }

  useEffect(() => {
    (async function () {
      await fetchArticle()
      await fetchComments()
    })()
  }, [slug])

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} setArticle={setArticle} />
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
          <ArticleMeta article={article} setArticle={setArticle} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea value={commentBody}
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                  onInput={e => setCommentBody(e.currentTarget.value)} />
              </div>
              <div className="card-footer">
                <img src={user?.image || DEFAULT_AVATAR}
                  className="comment-author-img" />
                <button className="btn btn-sm btn-primary" onClick={onPostComment}>
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
export default ArticlePage

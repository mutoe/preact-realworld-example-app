import { h } from 'preact'
import { getArticle } from '../services'
import { useEffect, useState } from 'preact/hooks'
import ArticleMeta from '../components/ArticleMeta'

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage(props: ArticlePageProps) {
  const [ article, setArticle ] = useState({ author: {} } as Article)

  const fetchArticle = async () => {
    const article = await getArticle(props.slug || '')
    setArticle(article)
  }

  useEffect(() => {
    fetchArticle()
  }, [])

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

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

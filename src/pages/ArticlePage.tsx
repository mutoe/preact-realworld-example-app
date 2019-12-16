import { Component, h } from 'preact'
import { getArticle } from '../services'

interface ArticlePageProps {
  slug?: string;
}

interface States {
  article: Article;
}

export default class ArticlePage extends Component<ArticlePageProps, States> {
  constructor() {
    super()

    this.state = {
      article: {} as Article,
    }
  }

  async fetchArticle() {
    const article = await getArticle(this.props.slug || '')
    this.setState({ article })
  }

  componentDidMount(): void {
    this.fetchArticle()
  }

  render() {

    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.state.article.title}</h1>

            <div className="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div className="info">
                <a href="" className="author">Eric Simons</a>
                <span className="date">January 20th</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp;
                Follow Eric Simons <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp;
                Favorite Post <span className="counter">(29)</span>
              </button>
            </div>

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-md-12">
              {this.state.article.body}
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div className="info">
                <a href="" className="author">Eric Simons</a>
                <span className="date">January 20th</span>
              </div>

              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp;
                Follow Eric Simons <span className="counter">(10)</span>
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp;
                Favorite Post <span className="counter">(29)</span>
              </button>
            </div>
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
}

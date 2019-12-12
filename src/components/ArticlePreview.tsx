import { Component, h } from 'preact'

interface ArticlePreviewProps {
  article: Article;
}

export default class ArticlePreview extends Component<ArticlePreviewProps> {
  render() {
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
          <div className="info">
            <a href="" className="author">Albert Pai</a>
            <span className="date">January 20th</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> 32
          </button>
        </div>
        <a href={`/article/${this.props.article.slug}`} className="preview-link">
          <h1>{this.props.article.title}</h1>
          <p>{this.props.article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    )
  }
}

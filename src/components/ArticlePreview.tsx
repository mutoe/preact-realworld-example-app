import { Component, h } from 'preact'
import { deleteFavoriteArticle, postFavoriteArticle } from '../services'

interface ArticlePreviewProps {
  article: Article;
}

export default class ArticlePreview extends Component<ArticlePreviewProps> {

  async onFavorite() {
    if (this.props.article.favorited) {
      await deleteFavoriteArticle(this.props.article.slug)
    } else {
      await postFavoriteArticle(this.props.article.slug)
    }
  }

  render() {
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href={`/@${this.props.article.author.username}`}><img src={this.props.article.author.image} /></a>
          <div className="info">
            <a href={`/@${this.props.article.author.username}`}
              className="author">{this.props.article.author.username}</a>
            <span className="date">{new Date(this.props.article.createdAt).toDateString()}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={this.onFavorite.bind(this)}>
            <i className="ion-heart" /> {this.props.article.favoritesCount}
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

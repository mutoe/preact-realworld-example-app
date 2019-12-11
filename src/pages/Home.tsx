import { Component, h } from 'preact'

import NavBar from '../components/NavBar'
import PopularTags from '../components/PopularTags'
import { getArticlesByTag } from '../services'
import ArticlePreview from '../components/ArticlePreview'

interface HomeProps {
  tag?: string;
}

interface HomeStates {
  articles: Article[];
  articlesCount: number;
}

export default class Home extends Component<HomeProps, HomeStates> {
  constructor() {
    super();

    this.state = {
      articles: [],
      articlesCount: 0,
    }
  }

  componentDidMount(): void {
    this.fetchFeeds()
  }

  async fetchFeeds() {
    if (!this.props.tag) return
    const { articles = [], articlesCount = 0 } = await getArticlesByTag(this.props.tag)
    this.setState({ articles, articlesCount })
  }

  render() {
    return (
      <div className="home-page">

        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <NavBar currentActive={this.props.tag ? 'tag' : 'global'} {...{ tag: this.props.tag }} />

              {
                this.state.articles.map(article => (
                  <ArticlePreview key={article.slug} article={article} />
                ))
              }
            </div>

            <div className="col-md-3">
              <PopularTags />
            </div>

          </div>
        </div>

      </div>
    )
  }
}

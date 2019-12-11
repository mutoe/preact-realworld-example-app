import { Component, h } from 'preact'
import { getAllTags } from '../services'

interface PopularTagsStates {
  tags: string[];
}

export default class PopularTags extends Component<{}, PopularTagsStates> {
  constructor() {
    super()

    this.state = {
      tags: [],
    }
  }

  async fetchPopularTags() {
    const tags = await getAllTags()
    this.setState({ tags })
  }

  componentWillMount(): void {
    this.fetchPopularTags()
  }

  render() {
    return (
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {
            this.state.tags.map(tag => (
              <a key={tag} href={`/tag/${tag}`} className="tag-pill tag-default">{tag}</a>
            ))
          }
        </div>
      </div>
    )
  }
}

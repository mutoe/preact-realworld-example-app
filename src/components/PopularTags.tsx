import { Component, h } from 'preact'

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

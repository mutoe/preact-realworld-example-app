import { h } from 'preact'
import useAllTags from '../hooks/useAllTags'

export default function PopularTags () {
  const { tags } = useAllTags()

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map(tag => (
          <a key={tag} href={`/tag/${tag}`} className="tag-pill tag-default">{tag}</a>
        ))}
      </div>
    </div>
  )
}

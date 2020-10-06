import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import useAllTags from '../hooks/useAllTags'

const PopularTags: FunctionalComponent = () => {
  const { tags } = useAllTags()

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map(tag => (
          <Link key={tag} href={`/tag/${tag}`} className="tag-pill tag-default">{tag}</Link>
        ))}
      </div>
    </div>
  )
}

export default PopularTags

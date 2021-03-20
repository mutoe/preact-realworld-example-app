import preact, { FunctionalComponent } from 'preact'
import useAllTags from 'public/hooks/useAllTags'

const PopularTags: FunctionalComponent = () => {
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

export default PopularTags

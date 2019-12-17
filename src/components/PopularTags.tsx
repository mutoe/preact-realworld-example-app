import { h } from 'preact'
import { getAllTags } from '../services'
import { useEffect, useState } from 'preact/hooks'

export default function PopularTags() {
  const [ tags, setTags ] = useState<string[]>([])

  const fetchPopularTags = async () => {
    const tags = await getAllTags()
    setTags(tags)
  }

  useEffect(() => {
    fetchPopularTags()
  }, [])

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

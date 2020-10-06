import { useEffect, useState } from 'preact/hooks'
import { getAllTags } from '../services'

export default function useAllTags () {
  const [tags, setTags] = useState<string[]>([])

  const fetchPopularTags = async () => {
    const tags = await getAllTags()
    setTags(tags)
  }

  useEffect(() => {
    fetchPopularTags()
  }, [])

  return { tags }
}

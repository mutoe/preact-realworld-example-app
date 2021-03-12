import useAllTags from '../hooks/useAllTags';

export default function PopularTags() {
    const { tags } = useAllTags();

    return (
        <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
                {tags.map((tag) => (
                    <a key={tag} href={`/tag/${tag}`} class="tag-pill tag-default">
                        {tag}
                    </a>
                ))}
            </div>
        </div>
    );
}

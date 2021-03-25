import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router';

import { apiGetAllTags } from '../services/api/tags';

export default function PopularTags() {
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		(async function getAllTags() {
			setTags(await apiGetAllTags());
		})();
	}, []);

	return (
		<div class="sidebar">
			<p>Popular Tags</p>
			<div class="tag-list">
				{tags.map(tag => (
					<Link key={tag} href={`/tag/${tag}`} class="tag-pill tag-default">
						{tag}
					</Link>
				))}
			</div>
		</div>
	);
}

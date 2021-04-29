import { useEffect, useState } from 'preact/hooks';

import { apiGetAllTags } from '../services/api/tags';

interface PopularTagsProps {
	onClick: (tag: string) => void;
}

export function PopularTags(props: PopularTagsProps) {
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
					<a key={tag} href="#" class="tag-pill tag-default" onClick={() => props.onClick(tag)}>
						{tag}
					</a>
				))}
			</div>
		</div>
	);
}

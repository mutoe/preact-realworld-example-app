import { useEffect, useState } from 'preact/hooks';

import { LoadingIndicator } from './LoadingIndicator';
import { apiGetAllTags } from '../services/api/tags';

interface PopularTagsProps {
	onClick: (tag: string) => void;
}

export function PopularTags(props: PopularTagsProps) {
	const [tags, setTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async function getAllTags() {
			setLoading(true);
			setTags(await apiGetAllTags());
			setLoading(false);
		})();
	}, []);

	return (
		<div class="sidebar">
			<p>Popular Tags</p>
			<div class="tag-list">
				<LoadingIndicator show={loading} width="1em" />
				{tags.map(tag => (
					<a key={tag} href="#" class="tag-pill tag-default" onClick={() => props.onClick(tag)}>
						{tag}
					</a>
				))}
			</div>
		</div>
	);
}

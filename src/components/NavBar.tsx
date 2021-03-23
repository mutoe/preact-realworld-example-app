import { h } from 'preact';

import useStore from '../store';

interface NavBarProps {
	currentActive?: 'global' | 'personal' | 'tag';
	tag?: string;
}

export default function NavBar(props: NavBarProps) {
	const isAuthenticated = useStore(state => state.isAuthenticated);

	return (
		<div class="feed-toggle">
			<ul class="nav nav-pills outline-active">
				{isAuthenticated && (
					<li class="nav-item">
						<a class={`nav-link ${props.currentActive === 'personal' ? 'active' : ''}`} href="/my-feeds">
							Your Feed
						</a>
					</li>
				)}
				<li class="nav-item">
					<a class={`nav-link ${props.currentActive === 'global' ? 'active' : ''}`} href="/">
						Global Feed
					</a>
				</li>
				{props.currentActive === 'tag' && (
					<li class="nav-item">
						<a class="nav-link active" href={`/tag/${props.tag}`}>
							# {props.tag}
						</a>
					</li>
				)}
			</ul>
		</div>
	);
}

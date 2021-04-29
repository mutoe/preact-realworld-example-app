import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso/router';

import { apiDeleteArticle, apiFavoriteArticle, apiUnfavoriteArticle } from '../services/api/article';
import { apiFollowProfile, apiUnfollowProfile } from '../services/api/profile';
import { useStore } from '../store';
import { dateFormatter } from '../utils/dateFormatter';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ArticleMetaProps {
	article: Article;
}

export function ArticleMeta(props: ArticleMetaProps) {
	const [article, setArticle] = useState(props.article);
	const user = useStore(state => state.user);
	const location = useLocation();

	const onDelete = async () => {
		await apiDeleteArticle(article.slug);
		location.route('/');
	};

	const onFollow = async () => {
		const author = article.author.following
			? await apiUnfollowProfile(article.author.username)
			: await apiFollowProfile(article.author.username);
		setArticle({ ...article, author });
	};

	const onFavorite = async () =>
		setArticle(article.favorited ? await apiUnfavoriteArticle(article.slug) : await apiFavoriteArticle(article.slug));

	return (
		<div class="article-meta">
			<a href={`/@${article.author.username}`}>
				<img src={article.author.image || DEFAULT_AVATAR} alt="User's profile picture" />
			</a>
			<div class="info">
				<a href={`/@${article.author.username}`} class="author">
					{article.author.username}
				</a>
				<span class="date">{dateFormatter(article.createdAt)}</span>
			</div>
			{user?.username === article.author.username ? (
				<>
					<a class="btn btn-sm btn-outline-secondary" href={`/editor/${article.slug}`}>
						<i class="ion-edit" /> Edit Article
					</a>
					&nbsp;&nbsp;
					<button class="btn btn-sm btn-outline-danger" onClick={onDelete}>
						<i class="ion-trash-a" /> Delete Article
					</button>
				</>
			) : (
				<>
					<button
						class={`btn btn-sm ${article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}`}
						onClick={onFollow}
					>
						<i class="ion-plus-round" /> {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
					</button>
					&nbsp;&nbsp;
					<button
						class={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={onFavorite}
					>
						<i class="ion-heart" />
						&nbsp; Favorite Article <span class="counter">({article.favoritesCount})</span>
					</button>
				</>
			)}
		</div>
	);
}

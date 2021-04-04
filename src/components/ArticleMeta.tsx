import { Fragment, h } from 'preact';
import { route } from 'preact-router';

import { apiDeleteArticle, apiFavoriteArticle, apiUnfavoriteArticle } from '../services/api/article';
import { apiFollowProfile, apiUnfollowProfile } from '../services/api/profile';
import { dateFormatter } from '../utils/dateFormatter';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ArticleMetaProps {
	article: Article;
	setArticle: (article: Article) => void;
	isAuthor: boolean;
}

export default function ArticleMeta(props: ArticleMetaProps) {
	const { article, setArticle } = props;

	const onDelete = async () => {
		await apiDeleteArticle(article.slug);
		route('/');
	};

	const onFollow = async () => {
		const profile = article.author.following
			? await apiFollowProfile(article.author.username)
			: await apiUnfollowProfile(article.author.username);
		setArticle({ ...article, author: profile });
	};

	const onFavorite = async () => {
		setArticle(article.favorited ? await apiUnfavoriteArticle(article.slug) : await apiFavoriteArticle(article.slug));
	};

	return (
		<div class="article-meta">
			<a href={`/@${article.author.username}`}>
				<img src={article.author.image || DEFAULT_AVATAR} />
			</a>
			<div class="info">
				<a href={`/@${article.author.username}`} class="author">
					{article.author.username}
				</a>
				<span class="date">{dateFormatter(article.createdAt)}</span>
			</div>
			{props.isAuthor ? (
				<Fragment>
					<a class="btn btn-sm btn-outline-secondary" href={`/editor/${article.slug}`}>
						<i class="ion-edit" /> Edit Article
					</a>
					&nbsp;&nbsp;
					{/* TODO: Implement delete */}
					<button class="btn btn-sm btn-outline-danger" onClick={onDelete}>
						<i class="ion-trash-a" /> Delete Article
					</button>
				</Fragment>
			) : (
				<Fragment>
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
						&nbsp; Favorite Post <span class="counter">({article.favoritesCount})</span>
					</button>
				</Fragment>
			)}
		</div>
	);
}

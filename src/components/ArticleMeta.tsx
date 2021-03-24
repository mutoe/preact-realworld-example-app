import { Fragment, h } from 'preact';
import { dateFilter } from '../utils/filters';
import { DEFAULT_AVATAR } from '../store/constants';
import { deleteFavoriteArticle, deleteFollowProfile, postFavoriteArticle, postFollowProfile } from '../services';

interface ArticleMetaProps {
	article: Article;
	setArticle: (article: Article) => void;
	isAuthor: boolean;
}

export default function ArticleMeta(props: ArticleMetaProps) {
	const { article, setArticle } = props;

	const onFollow = async () => {
		const profile = article.author.following
			? await deleteFollowProfile(article.author.username)
			: await postFollowProfile(article.author.username);
		setArticle({ ...article, author: profile });
	};

	const onFavorite = async () => {
		setArticle(
			article.favorited ? await deleteFavoriteArticle(article.slug) : await postFavoriteArticle(article.slug)
		);
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
				<span class="date">{dateFilter(article.createdAt)}</span>
			</div>
			{props.isAuthor ? (
				<Fragment>
					<a class="btn btn-sm btn-outline-secondary" href={`/editor/${article.slug}`}>
						<i class="ion-edit" /> Edit Article
					</a>
					&nbsp;&nbsp;
					{/* TODO: Implement delete */}
					<button class="btn btn-sm btn-outline-danger" onClick={onFavorite}>
						<i class="ion-trash-a" /> Delete Article
					</button>
				</Fragment>
			) : (
				<Fragment>
					<button
						class={`btn btn-sm ${article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}`}
						onClick={onFollow}
					>
						<i class="ion-plus-round" /> {article.author.following ? 'Unfollow' : 'Follow'}{' '}
						{article.author.username}
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

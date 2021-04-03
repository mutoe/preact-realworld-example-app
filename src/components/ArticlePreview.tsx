import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { apiFavoriteArticle, apiUnfavoriteArticle } from '../services/api/article';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ArticlePreviewProps {
	article: Article;
}

export default function ArticlePreview(props: ArticlePreviewProps) {
	const [article, setArticle] = useState(props.article);
	const [isFavorited, setIsFavorited] = useState(false);

	async function onFavorite() {
		article.favorited
			? setArticle(await apiUnfavoriteArticle(article.slug))
			: setArticle(await apiFavoriteArticle(article.slug));
	}

	useEffect(() => {
		setIsFavorited(article.favorited);
	}, [article]);

	const favoriteButtonClass = isFavorited ? 'btn-primary' : 'btn-outline-primary';

	return (
		<div class="article-preview">
			<div class="article-meta">
				<a href={`/@${article.author.username}`}>
					<img src={article.author.image || DEFAULT_AVATAR} />
				</a>
				<div class="info">
					<a href={`/@${article.author.username}`} class="author">
						{article.author.username}
					</a>
					<span class="date">{new Date(article.createdAt).toDateString()}</span>
				</div>
				<button class={`btn btn-sm pull-xs-right ${favoriteButtonClass}`} onClick={onFavorite}>
					<i class="ion-heart" /> {article.favoritesCount}
				</button>
			</div>
			<a href={`/article/${article.slug}`} class="preview-link">
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<span>Read more...</span>
			</a>
		</div>
	);
}

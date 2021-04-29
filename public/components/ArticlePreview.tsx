import { useState } from 'preact/hooks';

import { apiFavoriteArticle, apiUnfavoriteArticle } from '../services/api/article';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ArticlePreviewProps {
	article: Article;
}

export default function ArticlePreview(props: ArticlePreviewProps) {
	const [article, setArticle] = useState(props.article);

	async function onFavorite() {
		setArticle(article.favorited ? await apiUnfavoriteArticle(article.slug) : await apiFavoriteArticle(article.slug));
	}

	return (
		<div class="article-preview">
			<div class="article-meta">
				<a href={`/@${article.author.username}`}>
					<img src={article.author.image || DEFAULT_AVATAR} alt="User's profile picture" />
				</a>
				<div class="info">
					<a href={`/@${article.author.username}`} class="author">
						{article.author.username}
					</a>
					<span class="date">{new Date(article.createdAt).toDateString()}</span>
				</div>
				<button
					class={`btn btn-sm pull-xs-right ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
					onClick={onFavorite}
					aria-label="Favorite article"
				>
					<i class="ion-heart" /> {article.favoritesCount}
				</button>
			</div>
			<a class="preview-link" href={`/article/${article.slug}`} aria-labelledby="readMore">
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<span id="readMore">Read more...</span>
			</a>
		</div>
	);
}

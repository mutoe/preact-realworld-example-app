import { useEffect, useState } from 'preact/hooks';
import snarkdown from 'snarkdown';

import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleCommentCard } from '../components/ArticleCommentCard';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { apiGetArticle } from '../services/api/article';
import { apiCreateComment, apiGetComments } from '../services/api/comments';
import { useStore } from '../store';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

export default function ArticlePage(props: ArticlePageProps) {
	const [article, setArticle] = useState<Article | undefined>(undefined);
	const [comments, setComments] = useState<ArticleComment[]>([]);
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const user = useStore(state => state.user);

	const postComment = async (e: Event) => {
		e.preventDefault();
		const comment: ArticleComment = await apiCreateComment(props.params.slug, commentBody);
		setCommentBody('');
		setComments(prevComments => [comment, ...prevComments]);
	};

	useEffect(() => {
		(async function () {
			setIsLoading(true);
			setArticle(await apiGetArticle(props.params.slug));
			setComments(await apiGetComments(props.params.slug));
			setIsLoading(false);
		})();
	}, [props.params.slug]);

	return !article ? (
		<LoadingIndicator show={isLoading} style={{ margin: '1rem auto', display: 'flex' }} width="2em" />
	) : (
		<div class="article-page">
			<div class="banner">
				<div class="container">
					<h1>{article.title}</h1>
					<ArticleMeta article={article} />
				</div>
			</div>

			<div class="container page">
				<div class="row article-content">
					<div class="col-xs-12" dangerouslySetInnerHTML={{ __html: snarkdown(article.body) }} />
				</div>

				<hr />

				<div class="article-actions">
					<ArticleMeta article={article} />
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-8 offset-md-2">
						<form class="card comment-form" onSubmit={postComment}>
							<div class="card-block">
								<textarea
									value={commentBody}
									class="form-control"
									placeholder="Write a comment..."
									rows={3}
									onInput={e => setCommentBody(e.currentTarget.value)}
								/>
							</div>
							<div class="card-footer">
								<img src={user?.image || DEFAULT_AVATAR} class="comment-author-img" />
								<button class="btn btn-sm btn-primary">Post Comment</button>
							</div>
						</form>

						{comments.map(comment => (
							<ArticleCommentCard
								key={comment.id}
								articleSlug={props.params.slug}
								comment={comment}
								onDelete={() => setComments(prevState => prevState.filter(c => c.id !== comment.id))}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

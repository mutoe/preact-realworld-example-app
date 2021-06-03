import { apiDeleteComment } from '../services/api/comments';
import { useStore } from '../store';
import { DEFAULT_AVATAR } from '../utils/constants';
import { dateFormatter } from '../utils/dateFormatter';

interface ArticleCommentCardProps {
	articleSlug: string;
	comment: ArticleComment;
	onDelete: () => void;
}

export function ArticleCommentCard(props: ArticleCommentCardProps) {
	const { comment } = props;
	const user = useStore(state => state.user);

	const onDelete = async () => {
		await apiDeleteComment(props.articleSlug, comment.id);
		props.onDelete();
	};

	return (
		<div class="card">
			<div class="card-block">
				<p class="card-text">{comment.body}</p>
			</div>
			<div class="card-footer">
				<a href={`/@${comment.author.username}`} class="comment-author">
					<img src={comment.author.image || DEFAULT_AVATAR} class="comment-author-img" alt="User's profile picture" />
				</a>{' '}
				<a href={`/@${comment.author.username}`} class="comment-author">
					{comment.author.username}
				</a>
				<span class="date-posted">{dateFormatter(comment.createdAt)}</span>
				<span class="mod-options">
					{user?.username === comment.author.username && (
						<i class="ion-trash-a" onClick={onDelete} aria-label="Delete comment" />
					)}
				</span>
			</div>
		</div>
	);
}

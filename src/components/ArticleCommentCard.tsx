import { h } from 'preact';
import { dateFilter } from '../utils/filters';
import { useRootState } from '../store';
import { DEFAULT_AVATAR } from '../store/constants';

interface ArticleCommentCardProps {
	comment: ArticleComment;
	onDelete?: (commentId: number) => void;
}

export default function ArticleCommentCard(props: ArticleCommentCardProps) {
	const { comment, onDelete } = props;
	const [{ user }] = useRootState();

	const isMineComment = user?.username === comment.author.username;

	if (!comment.author) return null;

	return (
		<div class="card">
			<div class="card-block">
				<p class="card-text">{comment.body}</p>
			</div>
			<div class="card-footer">
				<a href={`/@${comment.author.username}`} class="comment-author">
					<img src={comment.author.image || DEFAULT_AVATAR} class="comment-author-img" />
				</a>
				&nbsp;
				<a href={`/@${comment.author.username}`} class="comment-author">
					{comment.author.username}
				</a>
				<span class="date-posted">{dateFilter(comment.createdAt)}</span>
				<span class="mod-options">
					{/* <i class="ion-edit" /> */}
					{isMineComment && <i class="ion-trash-a" onClick={() => onDelete?.(comment.id)} />}
				</span>
			</div>
		</div>
	);
}

import { h } from 'preact';

import useStore from '../store';
import { DEFAULT_AVATAR } from '../utils/constants';
import { dateFormatter } from '../utils/dateFormatter';

interface ArticleCommentCardProps {
	comment: ArticleComment;
	onDelete?: (commentId: number) => void;
}

export default function ArticleCommentCard(props: ArticleCommentCardProps) {
	const { comment, onDelete } = props;
	const user = useStore(state => state.user);

	const isOwnComment = user?.username === comment.author.username;

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
				<span class="date-posted">{dateFormatter(comment.createdAt)}</span>
				<span class="mod-options">
					{/* <i class="ion-edit" /> */}
					{isOwnComment && <i class="ion-trash-a" onClick={() => onDelete?.(comment.id)} />}
				</span>
			</div>
		</div>
	);
}

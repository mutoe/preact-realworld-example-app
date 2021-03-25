import FetchRequest from './utils/request';

export const limit = 10;

export const request = new FetchRequest({
	prefix: `${process.env.API_HOST}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
});

export async function getArticlesByTag(tagName: string, page = 1) {
	const params = { tag: tagName, limit, offset: (page - 1) * limit };
	return request.get<ArticlesResponse>('/articles', { params });
}

export async function getCommentsByArticle(slug: string) {
	return request.get<CommentsResponse>(`/articles/${slug}/comments`).then(res => res.comments);
}

export async function deleteComment(slug: string, commentId: number) {
	return request.delete(`/articles/${slug}/comments/${commentId}`);
}

export async function postComment(slug: string, body: string) {
	return request
		.post<CommentResponse>(`/articles/${slug}/comments`, { comment: { body } })
		.then(res => res.comment);
}

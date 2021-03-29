import { apiService, errorHandler } from './index';

export async function apiGetComments(articleSlug: string): Promise<ArticleComment[]> {
	try {
		const { data } = await apiService.get(`articles/${articleSlug}/comments`);
		return data.comments;
	} catch (error) {
		throw errorHandler(error, 'error while fetching comments');
	}
}

export async function apiCreateComment(articleSlug: string, body: string): Promise<ArticleComment> {
	try {
		const { data } = await apiService.post(`articles/${articleSlug}/comments`, { comment: { body } });
		return data.comment;
	} catch (error) {
		throw errorHandler(error, 'error while creating comment');
	}
}

export async function apiDeleteComment(articleSlug: string, commendId: number): Promise<void> {
	try {
		await apiService.delete(`articles/${articleSlug}/comments/${commendId}`);
	} catch (error) {
		throw errorHandler(error, 'error while deleting comment');
	}
}

import { apiService } from './index';

export async function apiGetComments(articleSlug: string): Promise<ArticleComment[]> {
	try {
		const { data } = await apiService.get(`articles/${articleSlug}/comments`);
		return data.comments;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while fetching comments';
	}
}

export async function apiCreateComment(articleSlug: string, body: string): Promise<ArticleComment> {
	try {
		const { data } = await apiService.post(`articles/${articleSlug}/comments`, { comment: { body } });
		return data.comment;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while creating comment';
	}
}

export async function apiDeleteComment(articleSlug: string, commendId: number): Promise<void> {
	try {
		await apiService.delete(`articles/${articleSlug}/comments/${commendId}`);
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while deleting comment';
	}
}

import { apiService } from './index';

const articleLimit = 10;

export async function apiGetArticle(slug: string): Promise<Article> {
	try {
		const { data } = await apiService.get(`articles/${slug}`);
		return data.article;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while fetching article';
	}
}

export async function apiGetArticles(
	searchParam?: Partial<Record<'author' | 'favorited' | 'tag', string>>,
	page = 1
): Promise<ArticlesResponse> {
	try {
		let params = { limit: articleLimit, offset: (page - 1) * articleLimit };
		if (searchParam) params = { ...params, ...searchParam };
		const { data } = await apiService.get('articles', params);
		return data;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while fetching articles';
	}
}

export async function apiCreateArticle(article: ArticleCore): Promise<Article> {
	try {
		const { data } = await apiService.post('articles', { article });
		return data.article;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while creating article';
	}
}

export async function apiUpdateArticle(slug: string, article: ArticleCore): Promise<Article> {
	try {
		const { data } = await apiService.put(`articles/${slug}`, { article });
		return data.article;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while updating article';
	}
}

export async function apiDeleteArticle(slug: string): Promise<void> {
	try {
		await apiService.delete(`articles/${slug}`);
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while deleting article';
	}
}

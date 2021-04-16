import { apiService, errorHandler } from './index';

export const articlePageLimit = 10;

export async function apiGetArticle(slug: string): Promise<Article> {
	try {
		const { data } = await apiService.get(`articles/${slug}`);
		return data.article;
	} catch (error) {
		throw errorHandler(error, 'error while fetching article');
	}
}

export async function apiGetFeed(page = 1): Promise<ArticlesResponse> {
	try {
		const params = { limit: articlePageLimit, offset: (page - 1) * articlePageLimit };
		const { data } = await apiService.get('articles/feed', params);
		return data;
	} catch (error) {
		throw errorHandler(error, 'error while fetching feed');
	}
}

export async function apiGetArticles(
	page = 1,
	searchParam?: Partial<Record<'author' | 'favorited' | 'tag', string>>
): Promise<ArticlesResponse> {
	try {
		let params = { limit: articlePageLimit, offset: (page - 1) * articlePageLimit };
		if (searchParam) params = { ...params, ...searchParam };
		const { data } = await apiService.get('articles', params);
		return data;
	} catch (error) {
		throw errorHandler(error, 'error while fetching articles');
	}
}

export async function apiCreateArticle(article: ArticleCore): Promise<Article> {
	try {
		const { data } = await apiService.post('articles', { article });
		return data.article;
	} catch (error) {
		throw errorHandler(error, 'error while creating article');
	}
}

export async function apiUpdateArticle(slug: string, article: ArticleCore): Promise<Article> {
	try {
		const { data } = await apiService.put(`articles/${slug}`, { article });
		return data.article;
	} catch (error) {
		throw errorHandler(error, 'error while updating article');
	}
}

export async function apiFavoriteArticle(slug: string): Promise<Article> {
	try {
		const { data } = await apiService.post(`articles/${slug}/favorite`);
		return data.article;
	} catch (error) {
		throw errorHandler(error, 'error while favoriting article');
	}
}

export async function apiUnfavoriteArticle(slug: string): Promise<Article> {
	try {
		const { data } = await apiService.delete(`articles/${slug}/favorite`);
		return data.article;
	} catch (error) {
		throw errorHandler(error, 'error while unfavoriting article');
	}
}

export async function apiDeleteArticle(slug: string): Promise<void> {
	try {
		await apiService.delete(`articles/${slug}`);
	} catch (error) {
		throw errorHandler(error, 'error while deleting article');
	}
}

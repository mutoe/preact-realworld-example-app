import { apiService } from './index';

const articleLimit = 10;

export const apiGetArticles = async (
	searchParam?: Partial<Record<'author' | 'favorited' | 'tag', string>>,
	page = 1
): Promise<ArticlesResponse> => {
	try {
		let params = { limit: articleLimit, offset: (page - 1) * articleLimit };
		if (searchParam) params = { ...params, ...searchParam };
		const { data } = await apiService.get('articles', params);
		return data;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while fetching articles for profile';
	}
};

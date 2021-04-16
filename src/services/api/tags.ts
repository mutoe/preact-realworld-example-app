import { apiService, errorHandler } from './index';

export async function apiGetAllTags(): Promise<string[]> {
	try {
		const { data } = await apiService.get('tags');
		return data.tags;
	} catch (error) {
		throw errorHandler(error, 'error while fetching tags');
	}
}

import { apiService } from './index';

export async function apiGetAllTags(): Promise<string[]> {
	try {
		const { data } = await apiService.get('tags');
		return data.tags;
	} catch (error) {
		throw error?.data?.errors[0] ? error.data.errors[0] : 'Unknown error while fetching tags';
	}
}

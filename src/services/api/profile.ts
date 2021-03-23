import { apiService } from './index';

export const apiGetProfile = async (username: string): Promise<Profile> => {
    try {
        const { data } = await apiService.get(`profiles/${username}`);
        return data.profile;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while fetching profile data';
    }
};

export const apiFollowProfile = async (username: string): Promise<Profile> => {
    try {
        const { data } = await apiService.post(`profiles/${username}/follow`);
		return data.profile;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while following profile';
    }
};

export const apiUnfollowProfile = async (username: string): Promise<Profile> => {
    try {
        const { data } = await apiService.delete(`profiles/${username}/follow`);
		return data.profile;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while following profile';
    }
};

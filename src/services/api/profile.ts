import { apiService } from './index';

export const apiUpdateProfile = async (form: Partial<Profile>): Promise<Profile> => {
    try {
        const { data } = await apiService.put('user', form);
        return data.profile;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while logging in';
    }
};


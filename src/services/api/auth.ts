import { apiService } from './index';

export const apiLogin = async (credentials: LoginUser): Promise<User> => {
    try {
        const { data } = await apiService.post('users/login', { user: credentials });
        return data.user;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while logging in';
    }
};

export const apiRegister = async (credentials: RegistrationUser): Promise<User> => {
    try {
        const { data } = await apiService.post('users', { user: credentials });
        return data.user;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while registering';
    }
};

export const apiUpdateProfile = async (profileDetails: Partial<Profile>): Promise<User> => {
    try {
        const { data } = await apiService.put('user', { user: profileDetails });
        return data.user;
    } catch (error) {
        throw error?.data?.errors[0]
            ? error.data.errors[0]
            : 'Unknown error while logging in';
    }
};

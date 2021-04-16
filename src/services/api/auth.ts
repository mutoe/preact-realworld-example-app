import { apiService, errorHandler } from './index';

export async function apiLogin(credentials: LoginUser): Promise<User> {
	try {
		const { data } = await apiService.post('users/login', { user: credentials });
		return data.user;
	} catch (error) {
		throw errorHandler(error, 'error while logging in');
	}
}

export async function apiRegister(credentials: RegistrationUser): Promise<User> {
	try {
		const { data } = await apiService.post('users', { user: credentials });
		return data.user;
	} catch (error) {
		throw errorHandler(error, 'error while registering');
	}
}

export async function apiUpdateProfile(profileDetails: Partial<Profile>): Promise<User> {
	try {
		const { data } = await apiService.put('user', { user: profileDetails });
		return data.user;
	} catch (error) {
		throw errorHandler(error, 'error while updating user details');
	}
}

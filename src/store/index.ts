import create from 'zustand';
import { persist } from 'zustand/middleware';
import { authStorageService } from 'ts-api-toolkit';
import { route } from 'preact-router';

import { apiRegister, apiLogin, apiUpdateProfile } from '../services/api/auth';

type State = {
	isAuthenticated: boolean;
	user?: User;
	error: string;
	login: (user: LoginUser) => Promise<void>;
	logout: () => void;
	register: (user: RegistrationUser) => Promise<void>;
	resetErrors: () => void;
	updateUserDetails: (user: Partial<Profile>) => Promise<void>;
};

const useStore = create<State>(
	persist(
		set => ({
			isAuthenticated: false,
			error: '',
			login: async user => {
				set({ error: '' });
				try {
					const userData = await apiLogin(user);
					authStorageService.saveToken(userData.token);
					set({ isAuthenticated: true, user: userData });
					route('/');
				} catch (error) {
					set({ error });
				}
			},
			logout: () => {
				set({ error: '' });
				authStorageService.destroyToken();
				set({ isAuthenticated: false, user: undefined });
				route('/');
			},
			register: async user => {
				set({ error: '' });
				try {
					const userData = await apiRegister(user);
					authStorageService.saveToken(userData.token);
					set({ isAuthenticated: true, user: userData });
					route('/');
				} catch (error) {
					set({ error });
				}
			},
			resetErrors: () => set({ error: '' }),
			updateUserDetails: async updatedUser => {
				const userData = await apiUpdateProfile(updatedUser);
				authStorageService.saveToken(userData.token);
				set({ user: userData });
				route(`/@${userData.username}`);
			}
		}),
		{
			name: 'user-storage'
		}
	)
);

export default useStore;

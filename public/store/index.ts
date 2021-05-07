import create from 'zustand';
import { authStorageService } from 'ts-api-toolkit';

import { apiRegister, apiLogin, apiUpdateProfile } from '../services/api/auth';

type State = {
	user?: User;
	error: { [key: string]: string[] };
	login: (user: LoginUser) => Promise<void>;
	logout: () => void;
	register: (user: RegistrationUser) => Promise<void>;
	resetErrors: () => void;
	updateUserDetails: (user: Partial<Profile>) => Promise<void>;
};

const isBrowser = typeof window !== 'undefined';

const writeUserToStorage = (user: User) => localStorage.setItem('user', JSON.stringify(user));
const removeUserFromStorage = () => localStorage.removeItem('user');

export const useStore = create<State>(set => ({
	// Properly handling this takes way more effort than it's ever worth.
	// Passing `null` to `JSON.parse()` is ultimately fine, even if it
	// expects a string with strict TS.
	//
	// eslint-disable-next-line
	// @ts-ignore
	user: JSON.parse(isBrowser && localStorage.getItem('user')) || undefined,
	error: {},
	login: async user => {
		set({ error: {} });
		try {
			const userData = await apiLogin(user);
			writeUserToStorage(userData);
			authStorageService.saveToken(userData.token);
			set({ user: userData });
		} catch (error) {
			set({ error });
		}
	},
	logout: () => {
		set({ error: {} });
		authStorageService.destroyToken();
		removeUserFromStorage();
		set({ user: undefined });
	},
	register: async user => {
		set({ error: {} });
		try {
			const userData = await apiRegister(user);
			writeUserToStorage(userData);
			authStorageService.saveToken(userData.token);
			set({ user: userData });
		} catch (error) {
			set({ error });
		}
	},
	resetErrors: () => set({ error: {} }),
	updateUserDetails: async updatedUser => {
		set({ error: {} });
		try {
			const userData = await apiUpdateProfile(updatedUser);
			writeUserToStorage(userData);
			set({ user: userData });
		} catch (error) {
			set({ error });
		}
	}
}));

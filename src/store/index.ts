import create from 'zustand';
import { authStorageService } from 'ts-api-toolkit';
import { route } from 'preact-router';

import { apiRegister, apiLogin } from '../services/api/auth';

type State = {
    isAuthenticated: boolean;
    user?: User;
    error: string;
    register: (user: RegistrationUser) => Promise<void>;
    login: (user: LoginUser) => Promise<void>;
    logout: () => void;
    resetErrors: () => void;
}

const useStore = create<State>((set) => ({
    isAuthenticated: false,
    error: '',
    register: async (user) => {
        set({ error: '' });
        try {
            const userData = await apiRegister(user);
			console.log(userData);
            authStorageService.saveToken(userData.token);
            set({ isAuthenticated: true, user: userData });
			route('/');
        } catch (error) {
            set({ error });
        }
    },
    login: async (user) => {
		set({ error: '' });
		try {
			const userData = await apiLogin(user);
			console.log(userData);
            authStorageService.saveToken(userData.token);
            set({ isAuthenticated: true, user: userData });
			route('/');
		} catch(error) {
			set({ error });
		}
    },
    logout: () => {
        set({ error: '' });
		authStorageService.destroyToken();
        set({ isAuthenticated: false, user: undefined });
		route('/');
    },
    resetErrors: () => set({ error: '' }),
}))

export default useStore;


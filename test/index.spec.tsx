import { h, render } from 'preact';
import { route } from 'preact-router';
import { unmountComponentAtNode } from 'preact/compat';

import App from '../src/App';
import { request } from '../src/services';

jest.mock('preact-router');
jest.mock('preact-router/match');

describe('# Root Component', () => {
	it('renders without crashing', () => {
		expect(() => {
			const div = document.createElement('div');
			render(<App />, div);
			unmountComponentAtNode(div);
		}).not.toThrow();
	});

	it('should be jump Login page when request 401 code got', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 401,
			statusText: 'Unauthorized',
			async json() {
				return {};
			}
		});
		await expect(request.get('/')).rejects.toThrow('Unauthorized');

		expect(route).toBeCalledTimes(1);
		expect(route).toBeCalledWith('/login');
	});
});

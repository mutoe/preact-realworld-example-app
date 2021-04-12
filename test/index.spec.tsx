import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import App from '../public';

describe('App Renders', () => {
	it('renders the App', () => {
		render(<App />);
		expect(screen.getByRole('navigation')).toBeInTheDocument(); // Header
		expect(screen.getByRole('heading', { name: 'conduit' })).toBeInTheDocument(); // Home Page Content
		expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
	});
});

import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import Header from '../../public/components/Header';
import useStore from '../../public/store';

jest.mock('../../public/store', () => jest.fn());

test('should display "Sign in" and "Sign up" links when not logged in', () => {
	((useStore as unknown) as jest.Mock).mockReturnValue({ isAuthenticated: false });

	render(<Header />);

	expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
});

test('should display "New Article", "Settings", and "Profile" buttons when logged in', () => {
	((useStore as unknown) as jest.Mock).mockReturnValue({
		isAuthenticated: true,
		user: {
			username: 'Foo'
		}
	});
	render(<Header />);

	expect(screen.getByRole('link', { name: 'New Article' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: 'Foo' })).toBeInTheDocument();
});

// TODO: need a test like this, but preact-router + preact-router/match
// makes this rather hairy. The WMR rewrite should make this easier as we
// own the <Link> component there.
//
//test('should correctly determine "active" link', () => {
//	(getCurrentUrl as jest.Mock).mockReturnValue('/settings');
//	render(<Header />);
//
//	expect(screen.getByRole('link', { name: 'Settings' })).toHaveClass('active');
//});

import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import AuthErrorHandler from '../../public/components/AuthErrorHandler';
import useStore from '../../public/store';

jest.mock('../../public/store', () => jest.fn());

test('should return null when there are no errors', () => {
	((useStore as unknown) as jest.Mock).mockReturnValue({ error: {} });

	const { asFragment } = render(<AuthErrorHandler />);

	expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});

test('should display auth errors when they exist', () => {
	((useStore as unknown) as jest.Mock).mockReturnValue({
		error: {
			username: ['has already been taken'],
			email: ['has already been taken'],
			password: ['is too short (minimum 8 characters)']
		}
	});
	const { asFragment } = render(<AuthErrorHandler />);

	expect(screen.getByRole('listitem', { name: 'username error' })).toHaveTextContent('username has already been taken');
	expect(screen.getByRole('listitem', { name: 'email error' })).toHaveTextContent('email has already been taken');
	expect(screen.getByRole('listitem', { name: 'password error' })).toHaveTextContent(
		'password is too short (minimum 8 characters)'
	);

	expect(asFragment()).toMatchSnapshot();
});

import { h } from 'preact';
import { fireEvent, render, screen, waitFor } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Login from '../../src/pages/Login';

describe('Login Page Renders', () => {
	it('renders the Login page', () => {
		render(<Login />);
		expect(
			screen.getByRole('heading', { name: 'Sign in' })
		).toBeInTheDocument();
	});

	it('renders 3 input fields', () => {
		render(<Login />);
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
		// input[type="password"] doesn't actually have an implicit role,
		// so the test has to be a bit different. See:
		// https://github.com/testing-library/dom-testing-library/issues/567
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
	});

	it('renders a (disabled) submit button', () => {
		render(<Login />);
		const submitButton = screen.getByRole('button', { name: 'Sign in' });
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});
});

describe('Login Form Behavior', () => {
	it('validates email input', () => {
		render(<Login />);
		const email = screen.getByRole('textbox', { name: 'Email' });

		fireEvent.input(email, { target: { value: 'smoketest' } });
		expect(email).toBeInvalid();

		fireEvent.input(email, { target: { value: 'smoketest@example.com' } });
		expect(email).toBeValid();
	});

	it('validates password input', () => {
		render(<Login />);
		const password = screen.getByPlaceholderText('Password');

		fireEvent.input(password, { target: { value: 'foobar' } });
		expect(password).toBeInvalid();

		fireEvent.input(password, { target: { value: 'foobarbaz' } });
		expect(password).toBeValid();
	});

	it('ensures all fields are required to submit', () => {
		render(<Login />);
		const submitButton = screen.getByRole('button', { name: 'Sign in' });
		expect(submitButton).toBeDisabled();

		fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), {
			target: { value: 'smoketest@example.com' }
		});
		expect(submitButton).toBeDisabled();

		fireEvent.input(screen.getByPlaceholderText('Password'), {
			target: { value: 'foobarbaz' }
		});
		expect(submitButton).toBeEnabled();
	});
});

describe('Login Form Submission', () => {
	const server = setupServer(
		rest.post(
			'https://conduit.productionready.io/api/users/login',
			(_req, res, ctx) => {
				return res(
					ctx.status(422),
					ctx.json({
						errors: {
							email: ['has already been taken'],
							password: ['is too short (minimum 8 characters)']
						}
					})
				);
			}
		)
	);

	it('displays validation errors from api', async () => {
		server.listen();

		render(<Login />);

		fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), {
			target: { value: 'smoketest@example.com' }
		});
		fireEvent.input(screen.getByPlaceholderText('Password'), {
			target: { value: 'foobarbaz' }
		});

		fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
		await waitFor(() =>
			screen.getByRole('listitem', { name: 'password error' })
		);

		expect(
			screen.getByRole('listitem', { name: 'email error' })
		).toHaveTextContent('email has already been taken');
		expect(
			screen.getByRole('listitem', { name: 'password error' })
		).toHaveTextContent('password is too short (minimum 8 characters)');

		server.close();
	});
});

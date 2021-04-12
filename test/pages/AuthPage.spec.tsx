import { h } from 'preact';
import { fireEvent, render, screen } from '@testing-library/preact';

import AuthPage from '../../src/pages/AuthPage';

describe('AuthPage renders', () => {
	it('the Login page correctly', () => {
		const { asFragment } = render(<AuthPage />);
		expect(
			screen.getByRole('heading', { name: 'Sign in' })
		).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	it('the Register page correctly', () => {
		const { asFragment } = render(<AuthPage isRegister />);
		expect(
			screen.getByRole('heading', { name: 'Sign up' })
		).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	it('the Login input fields', () => {
		render(<AuthPage />);
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
		// input[type="password"] doesn't actually have an implicit role,
		// so the test has to be a bit different. See:
		// https://github.com/testing-library/dom-testing-library/issues/567
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
	});

	it('the Register input fields', () => {
		render(<AuthPage isRegister />);
		expect(
			screen.getByRole('textbox', { name: 'Username' })
		).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
		// input[type="password"] doesn't actually have an implicit role,
		// so the test has to be a bit different. See:
		// https://github.com/testing-library/dom-testing-library/issues/567
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
	});

	it('a (disabled) Login button', () => {
		render(<AuthPage />);
		const submitButton = screen.getByRole('button', { name: 'Sign in' });
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	it('a (disabled) Register button', () => {
		render(<AuthPage isRegister />);
		const submitButton = screen.getByRole('button', { name: 'Sign up' });
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});
});

describe('AuthPage form validates', () => {
	it('username input', () => {
		render(<AuthPage isRegister />);
		const username = screen.getByRole('textbox', { name: 'Username' });

		fireEvent.input(username, { target: { value: '' } });
		expect(username).toBeInvalid();

		fireEvent.input(username, { target: { value: 'Foo' } });
		expect(username).toBeValid();
	});

	it('email input', () => {
		render(<AuthPage />);
		const email = screen.getByRole('textbox', { name: 'Email' });

		fireEvent.input(email, { target: { value: 'smoketest' } });
		expect(email).toBeInvalid();

		fireEvent.input(email, { target: { value: 'smoketest@example.com' } });
		expect(email).toBeValid();
	});

	it('password input', () => {
		render(<AuthPage />);
		const password = screen.getByPlaceholderText('Password');

		fireEvent.input(password, { target: { value: 'foobar' } });
		expect(password).toBeInvalid();

		fireEvent.input(password, { target: { value: 'foobarbaz' } });
		expect(password).toBeValid();
	});

	it('login submission requirements', () => {
		render(<AuthPage />);
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

	it('registration submission requirements', () => {
		render(<AuthPage isRegister />);
		const submitButton = screen.getByRole('button', { name: 'Sign up' });
		expect(submitButton).toBeDisabled();

		fireEvent.input(screen.getByRole('textbox', { name: 'Username' }), {
			target: { value: 'SmokeTest' }
		});
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

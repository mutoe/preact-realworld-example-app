import { useEffect, useReducer, useRef, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import { AuthErrorHandler } from '../components/AuthErrorHandler';
import { Link } from '../components/Link';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useStore } from '../store';

const UPDATE_INPUT = (_state: string, e: Event) => (e.target as HTMLInputElement).value;

export default function AuthPage({ isRegister }: { isRegister?: boolean }) {
	const location = useLocation();
	const { login, register, resetErrors } = useStore(state => ({
		login: state.login,
		register: state.register,
		resetErrors: state.resetErrors
	}));

	const formRef = useRef<HTMLFormElement>();
	const [username, setUsername] = useReducer(UPDATE_INPUT, '');
	const [email, setEmail] = useReducer(UPDATE_INPUT, '');
	const [password, setPassword] = useReducer(UPDATE_INPUT, '');
	const [inProgress, setInProgress] = useState(false);

	const submit = async (e: Event) => {
		e.preventDefault();
		if (!formRef.current?.checkValidity()) return;
		setInProgress(true);
		isRegister ? await register({ username, email, password }) : await login({ email, password });
		location.route('/');
	};

	useEffect(() => {
		resetErrors();
	}, [resetErrors]);

	return (
		<div class="auth-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">{isRegister ? 'Sign up' : 'Sign in'}</h1>
						<p class="text-xs-center">
							{isRegister ? (
								<Link href="/login">Have an account?</Link>
							) : (
								<Link href="/register">Need an account?</Link>
							)}
						</p>

						<AuthErrorHandler />

						<form ref={formRef} onSubmit={submit}>
							{isRegister && (
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="text"
										placeholder="Username"
										aria-label="Username"
										required
										value={username}
										onInput={setUsername}
									/>
								</fieldset>
							)}
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="email"
									placeholder="Email"
									aria-label="Email"
									required
									value={email}
									onInput={setEmail}
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									aria-label="Password"
									required
									pattern=".{8,}"
									minLength={8}
									value={password}
									onInput={setPassword}
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								disabled={(isRegister && !username) || !email || !password}
							>
								{isRegister ? 'Sign up' : 'Sign in'}
								<LoadingIndicator show={inProgress} style={{ marginLeft: '0.5rem' }} strokeColor="#fff" width="1em" />
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

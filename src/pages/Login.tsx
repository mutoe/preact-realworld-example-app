import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Link } from 'preact-router';

import useStore from '../store';

export default function Register() {
	const { error, login, resetErrors } = useStore(state => ({
		error: state.error,
		login: state.login,
		resetErrors: state.resetErrors
	}));

	const formRef = useRef<HTMLFormElement>();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	const onLogin = async (e: Event) => {
		e.preventDefault();
		if (!formRef.current?.checkValidity()) return;
		await login(form);
	};

	return (
		<div class="auth-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Sign in</h1>
						<p class="text-xs-center">
							<Link href="/register">Need an account?</Link>
						</p>

						{error && (
							<ul class="error-messages">
								<li>{error.charAt(0).toUpperCase() + error.slice(1)}</li>
							</ul>
						)}

						<form ref={formRef} onSubmit={onLogin}>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="email"
									placeholder="Email"
									required
									value={form.email}
									onInput={e => {
										resetErrors();
										setForm(prev => ({ ...prev, email: e.currentTarget.value }));
									}}
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									required
									value={form.password}
									onInput={e => {
										resetErrors();
										setForm(prev => ({ ...prev, password: e.currentTarget.value }));
									}}
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								disabled={!form.email || !form.password}
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

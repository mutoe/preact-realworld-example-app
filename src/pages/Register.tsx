import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Link } from 'preact-router';

import useStore from '../store';

export default function Register() {
	const { error, register, resetErrors } = useStore(state => ({
		error: state.error,
		register: state.register,
		resetErrors: state.resetErrors
	}));

	const formRef = useRef<HTMLFormElement>();
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: ''
	});

	const onRegister = async (e: Event) => {
		e.preventDefault();
		if (!formRef.current?.checkValidity()) return;
		await register(form);
	};

	useEffect(() => {
		resetErrors();
	}, [resetErrors]);

	return (
		<div class="auth-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Sign up</h1>
						<p class="text-xs-center">
							<Link href="/login">Have an account?</Link>
						</p>

						{error && (
							<ul class="error-messages">
								{Object.keys(error).map(key =>
									<li key={key}>
										{key} {error[key]}
									</li>
								)}
							</ul>
						)}

						<form ref={formRef} onSubmit={onRegister}>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Username"
									required
									value={form.username}
									onInput={e => {
										resetErrors();
										setForm(prev => ({ ...prev, username: e.currentTarget.value }));
									}}
								/>
							</fieldset>
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
									minLength={8}
									value={form.password}
									onInput={e => {
										resetErrors();
										setForm(prev => ({ ...prev, password: e.currentTarget.value }));
									}}
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								disabled={!(form.email && form.username && form.password)}
							>
								Sign up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

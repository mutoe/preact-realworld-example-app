import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { useRootState } from '../store';
import { login } from '../store/actions';

export default function Register() {
	const formRef = useRef<HTMLFormElement>();
	const [{ user, errors }, dispatch] = useRootState();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	const onLogin = async (event: Event) => {
		event.preventDefault();
		if (!formRef.current?.checkValidity()) return;

		dispatch(await login(form));
	};

	// route to home page after user logged
	useEffect(() => {
		if (user) route('/');
	}, [user]);

	return (
		<div class="auth-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Sign in</h1>
						<p class="text-xs-center">
							<Link href="/register">Need an account?</Link>
						</p>

						<ul class="error-messages">
							{Object.entries(errors || {}).map(([field, errors]) => (
								<li key={field}>
									{field} {errors[0]}
								</li>
							))}
						</ul>

						<form ref={formRef} onSubmit={onLogin}>
							<fieldset class="form-group" aria-required>
								<input
									value={form.email}
									class="form-control form-control-lg"
									type="email"
									required
									placeholder="Email"
									onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))}
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									value={form.password}
									class="form-control form-control-lg"
									type="password"
									required
									placeholder="Password"
									onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))}
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								disabled={!form.email || !form.password}
								type="submit"
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

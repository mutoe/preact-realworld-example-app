import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import AuthErrorHandler from '../components/AuthErrorHandler'
import useStore from '../store';

export default function Settings() {
	const { logout, resetErrors, user, updateUserDetails } = useStore(state => ({
		logout: state.logout,
		resetErrors: state.resetErrors,
		updateUserDetails: state.updateUserDetails,
		// We do the `as User` here as this route is protected by a route guard.
		// There's no way `user` could be undefined
		user: state.user as User
	}));

	const formRef = useRef<HTMLFormElement>();
	const [form, setForm] = useState({
		image: '',
		username: '',
		bio: '',
		email: '',
		password: ''
	});

	const onSubmit = async (e: Event) => {
		e.preventDefault();
		if (!formRef.current?.checkValidity()) return;
		// filter empty fields from form
		const filteredForm = Object.entries(form).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {});
		updateUserDetails(filteredForm);
	}

	useEffect(() => {
		setForm({
			image: user.image,
			username: user.username,
			bio: user.bio,
			email: user.email,
			password: '',
		});
	}, [user]);

	useEffect(() => {
		resetErrors();
	}, [resetErrors]);

	const buttonDisabled =
		form.image === user.image &&
		form.username === user.username &&
		form.email === user.email &&
		form.bio === user.bio &&
		!form.password;

	return (
		<div class="settings-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Your Settings</h1>

						<AuthErrorHandler />

						<form ref={formRef} onSubmit={onSubmit}>
							<fieldset>
								<fieldset class="form-group">
									<input
										class="form-control"
										type="text"
										placeholder="URL of profile picture"
										aria-label="URL of profile picture"
										value={form.image}
										onInput={e => setForm(prev => ({ ...prev, image: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="text"
										placeholder="Username"
										aria-label="Username"
										value={form.username}
										onInput={e => setForm(prev => ({ ...prev, username: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<textarea
										class="form-control form-control-lg"
										placeholder="Short bio about you"
										aria-label="Short bio about you"
										rows={8}
										value={form.bio}
										onInput={e => setForm(prev => ({ ...prev, bio: e.currentTarget.value }))}
									/>
								</fieldset>
								{/*
									These fields are absurdly broken in the spec and have been for years. For some
									reason they're absolutely required by backends which means users have to just
									overwrite their emails and passwords when they want to say change their username.
									These fields shouldn't be required, it makes no sense to be required, but the API
									will throw errors if they're not provided, so I guess we need to require them here.
								*/}
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="email"
										placeholder="Email"
										aria-label="Email"
										required
										value={form.email}
										onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="password"
										placeholder="New Password"
										aria-label="New Password"
										required
										pattern=".{8,}"
										autocomplete="new-password"
										value={form.password}
										onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))}
									/>
								</fieldset>
								<button class="btn btn-lg btn-primary pull-xs-right" disabled={buttonDisabled}>
									Update Settings
								</button>
							</fieldset>
						</form>

						<hr />

						<button class="btn btn-outline-danger" onClick={logout}>
							Or click here to logout.
						</button>
					</div>
			</div>
			</div>
		</div>
	);
}

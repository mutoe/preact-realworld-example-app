import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';

import { apiUpdateProfile } from '../services/api/profile';
import useStore from '../store';

interface FormState {
	username?: string;
	bio?: string;
	image?: string;
	email?: string;
	password?: string;
}

export default function Settings() {
	const { isAuthenticated, logout, user } = useStore(state => ({
		isAuthenticated: state.isAuthenticated,
		logout: state.logout,
		user: state.user
	}));
	const [form, setForm] = useState<FormState>({});

	async function onSubmit() {
		// filter empty fields from form
		const filteredForm = Object.entries(form).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {});
		const profile = await apiUpdateProfile(filteredForm);
		dispatch({ type: UPDATE_USER, user: profile });
	}

	useEffect(() => {
		if (!user) {
			route('/login');
		} else {
			setForm({
				image: user.image || undefined,
				username: user.username || undefined,
				bio: user.bio || undefined,
				email: user.email || undefined
			});
		}
	}, [user]);

	const buttonDisabled =
		form.image === user.image &&
		form.username === user.username &&
		form.email === user.email &&
		form.bio === user.bio &&
		!form.password;

	return !isAuthenticated ? null : (
		<div class="settings-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Your Settings</h1>

						<form>
							<fieldset>
								<fieldset class="form-group">
									<input
										value={form.image}
										class="form-control"
										type="text"
										placeholder="URL of profile picture"
										onInput={e => setForm(prev => ({ ...prev, image: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										value={form.username}
										class="form-control form-control-lg"
										type="text"
										placeholder="Your Name"
										onInput={e => setForm(prev => ({ ...prev, username: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<textarea
										value={form.bio}
										class="form-control form-control-lg"
										rows={8}
										placeholder="Short bio about you"
										onInput={e => setForm(prev => ({ ...prev, bio: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										value={form.email}
										class="form-control form-control-lg"
										type="email"
										placeholder="Email"
										onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										value={form.password}
										class="form-control form-control-lg"
										type="password"
										placeholder="Password"
										onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))}
									/>
								</fieldset>
								<button class="btn btn-lg btn-primary pull-xs-right" disabled={buttonDisabled} onClick={onSubmit}>
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

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import useStore from '../store';

interface FormState {
	username?: string;
	bio?: string;
	image?: string;
	email?: string;
	password?: string;
}

export default function Settings() {
	const { logout, user, updateUserDetails } = useStore(state => ({
		logout: state.logout,
		updateUserDetails: state.updateUserDetails,
		// We do the `as User` here as this route is protected by a route guard.
		// There's no way `user` could be undefined
		user: state.user as User
	}));
	const [form, setForm] = useState<FormState>({});

	async function onSubmit(event: Event) {
		event.preventDefault();
		// filter empty fields from form
		const filteredForm = Object.entries(form).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {});
		updateUserDetails(filteredForm);
	}

	useEffect(() => {
		setForm({
			username: user.username,
			email: user.email,
			bio: user.bio,
			image: user.image
		});
	}, [user]);

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

						<form onSubmit={onSubmit}>
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

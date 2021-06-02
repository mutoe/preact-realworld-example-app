import { useCallback, useEffect, useReducer, useRef, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import { AuthErrorHandler } from '../components/AuthErrorHandler';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useStore } from '../store';

const UPDATE_INPUT = (state: SettingsUser, e: Event) => {
	const { name, value } = e.target as HTMLInputElement;
	return { ...state, [name]: value };
};

export default function SettingsPage() {
	const location = useLocation();
	const { logout, resetErrors, user, updateUserDetails } = useStore(state => ({
		logout: state.logout,
		resetErrors: state.resetErrors,
		updateUserDetails: state.updateUserDetails,
		user: state.user as User
	}));

	const formRef = useRef<HTMLFormElement>();
	const [profile, updateProfile] = useReducer(UPDATE_INPUT, {
		image: user.image,
		username: user.username,
		bio: user.bio,
		email: user.email,
		password: ''
	});
	const [inProgress, setInProgress] = useState(false);

	const onSubmit = useCallback(async () => {
		if (!formRef.current?.checkValidity()) return;
		setInProgress(true);
		await updateUserDetails(profile);
		location.route(`/@${profile.username}`);
	}, [location, profile, updateUserDetails]);

	useEffect(() => {
		resetErrors();
	}, [resetErrors]);

	return (
		<div class="settings-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Your Settings</h1>

						<AuthErrorHandler />

						<form ref={formRef} onSubmit={onSubmit} action="javascript:">
							<fieldset>
								<fieldset class="form-group">
									<input
										class="form-control"
										type="url"
										name="image"
										placeholder="URL of profile picture"
										value={profile.image}
										onInput={updateProfile}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="text"
										name="username"
										placeholder="Username"
										value={profile.username}
										onInput={updateProfile}
									/>
								</fieldset>
								<fieldset class="form-group">
									<textarea
										class="form-control form-control-lg"
										name="bio"
										placeholder="Short bio about you"
										rows={8}
										value={profile.bio}
										onInput={updateProfile}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="email"
										name="email"
										placeholder="Email"
										required
										value={profile.email}
										onInput={updateProfile}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="password"
										name="password"
										placeholder="Password"
										required
										pattern=".{8,}"
										autocomplete="new-password"
										value={profile.password}
										onInput={updateProfile}
									/>
								</fieldset>
								<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
									Update Settings
									<LoadingIndicator show={inProgress} style={{ marginLeft: '0.5rem' }} strokeColor="#fff" width="1em" />
								</button>
							</fieldset>
						</form>

						<hr />

						<button
							class="btn btn-outline-danger"
							onClick={() => {
								logout();
								location.route('/');
							}}
						>
							Or click here to logout.
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

import { useStore } from '../store';

export function AuthErrorHandler() {
	const { error } = useStore(state => ({
		error: state.error
	}));

	return Object.keys(error).length === 0 ? null : (
		<ul class="error-messages">
			{Object.keys(error).map(key => (
				<li key={key} aria-label={`${key} error`}>
					{key} {error[key]}
				</li>
			))}
		</ul>
	);
}

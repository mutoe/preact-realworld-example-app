import { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { ErrorBoundary, hydrate, lazy, LocationProvider, Route, Router, useLocation } from 'preact-iso';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useStore } from './store';
import HomePage from './pages/Home';

//const HomePage = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/Auth'));
const ArticlePage = lazy(() => import('./pages/Article'));
const EditorPage = lazy(() => import('./pages/Editor'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const SettingsPage = lazy(() => import('./pages/Settings'));

export default function App() {
	return (
		<LocationProvider>
			<div class="app">
				<Header />
				<ErrorBoundary>
					<Router>
						<Route path="/" component={HomePage} />
						<Route path="/article/:slug" component={ArticlePage} />
						<Route path="/login" component={AuthPage} />
						<Route path="/register" component={AuthPage} isRegister />
						<AuthenticatedRoute path="/editor/:slug?" component={EditorPage} />
						<AuthenticatedRoute path="/settings" component={SettingsPage} />
						<Route path="/:username" component={ProfilePage} />
						<Route path="/:username/favorites" component={ProfilePage} />
					</Router>
				</ErrorBoundary>
				<Footer />
			</div>
		</LocationProvider>
	);
}

hydrate(<App />);

export async function prerender() {
	const { default: prerender } = await import('preact-iso/prerender');
	return await prerender(<App />);
}

function AuthenticatedRoute(props: { path: string; component: (props: any) => JSX.Element | null }) {
	const isAuthenticated = useStore(state => !!state.user);
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated) location.route('/login');
	}, [isAuthenticated, location]);

	if (!isAuthenticated) return null;

	return <Route {...props} />;
}

import { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import hydrate from 'preact-iso/hydrate';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { LocationProvider, Route, Router, useLocation } from 'preact-iso/router';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { useStore } from './store';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const Editor = lazy(() => import('./pages/Editor'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
	return (
		<LocationProvider>
			<div class="app">
				<Header />
				<ErrorBoundary>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/login" component={AuthPage} />
						<Route path="/register" component={AuthPage} isRegister />
						<Route path="/editor/:slug?" component={Editor} />
						<Route path="/article/:slug" component={ArticlePage} />
						<AuthenticatedRoute path="/settings" component={Settings} />
						<Route path="/:username" component={Profile} />
						<Route path="/:username/favorites" component={Profile} />
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

function AuthenticatedRoute(props: { path: string; component: () => JSX.Element | null }) {
	const isAuthenticated = useStore(state => state.isAuthenticated);
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated) location.route('/login');
	}, [isAuthenticated, location]);

	if (!isAuthenticated) return null;

	return <Route {...props} />;
}

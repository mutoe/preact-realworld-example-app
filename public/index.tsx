import { AnyComponent, h, VNode } from 'preact';
import hydrate from 'preact-iso/hydrate';
import { LocationProvider, Router } from 'preact-iso/router';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import EditArticle from './pages/EditArticle';
import ArticlePage from './pages/ArticlePage';
import Profile from './pages/Profile';
import { RootProvider } from './store';

export default function App() {
    return (
        <LocationProvider>
            <RootProvider>
                <Header />
                <Router>
                    <Home path="/" />
                    <Home path="/my-feeds" />
                    <Home path="/tag/:tag" />
                    <Login path="/login" />
                    <Register path="/register" />
                    <Settings path="/settings" />
                    <EditArticle path="/article/create" />
                    <EditArticle path="/article/:slug/edit" />
                    <ArticlePage path="/article/:slug" />
                    <Profile path="/:username/favorites" />
                </Router>
                <Footer />
            </RootProvider>
        </LocationProvider>
    );
}

hydrate(<App />);

export async function prerender() {
    const { default: prerender } = await import('preact-iso/prerender');
    return await prerender(<App />);
}

import preact from 'preact'
import { hydrate, LocationProvider, Router } from 'preact-iso'
import Footer from 'public/components/Footer'
import Header from 'public/components/Header'
import ArticlePage from 'public/pages/ArticlePage'
import EditArticle from 'public/pages/EditArticle'
import Home from 'public/pages/Home'
import Login from 'public/pages/Login'
import Profile from 'public/pages/Profile'
import Register from 'public/pages/Register'
import Settings from 'public/pages/Settings'
import { RootProvider } from 'public/store'

const App = () => <RootProvider>
  <LocationProvider>
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
      <ArticlePage path="/article/:slug" slug="" />
      <Profile path="/:username/favorites" />
    </Router>
  </LocationProvider>
  <Footer />
</RootProvider>

hydrate(<App />)

export async function prerender(data: any) {
  const { default: prerender } = await import('preact-iso/prerender')
  return await prerender(<App {...data} />)
}

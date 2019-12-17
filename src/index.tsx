import { h, render } from 'preact'
import Router, { Route } from 'preact-router'
import { createHashHistory } from 'history'
import { initialRootState, RootContext } from './stores'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import ArticlePage from './pages/ArticlePage'
import Profile from './pages/Profile'
import EditArticle from './pages/EditArticle'

const Main = () => (
  <RootContext.Provider value={initialRootState}>
    <Header />
    <Router history={createHashHistory()}>
      <Route path="/" component={Home} />
      <Route path="/tag/:tag" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/settings" component={Settings} />
      <Route path="/article/:slug" component={ArticlePage} />
      <Route path="/article/:slug/edit" component={EditArticle} />
      <Route path="/:username" component={Profile} />
    </Router>
    <Footer />
  </RootContext.Provider>
)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<Main />, document.querySelector('#app')!)

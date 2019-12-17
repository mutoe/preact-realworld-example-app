import { h, render } from 'preact'
import Router from 'preact-router'
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
      <Home path="/" />
      <Home path="/tag/:tag" />
      <Login path="/login" />
      <Register path="/register" />
      <Settings path="/settings" />
      <ArticlePage path="/article/:slug" />
      <EditArticle path="/article/:slug/edit" />
      <Profile path="/:username" />
    </Router>
    <Footer />
  </RootContext.Provider>
)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<Main />, document.querySelector('#app')!)

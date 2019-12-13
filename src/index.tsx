import { h, render } from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'
import RootStateContext, { initialRootState } from './stores/globalContext'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Article from './pages/Article'
import Profile from './pages/Profile'
import EditArticle from './pages/EditArticle'

const Main = () => (
  <RootStateContext.Provider value={initialRootState}>
    <Header />
    <Router history={createHashHistory()}>
      <Home path="/" />
      <Home path="/tag/:tag" />
      <Login path="/login" />
      <Register path="/register" />
      <Settings path="/settings" />
      <Article path="/article" />
      <EditArticle path="/article/:id" />
      <Profile path="/:username" />
    </Router>
    <Footer />
  </RootStateContext.Provider>
)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<Main />, document.querySelector('#app')!)

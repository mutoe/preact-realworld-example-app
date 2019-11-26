import { h, render } from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'
import RootStateContext, { initialRootState } from './stores/globalContext'

import Header from './layout/Header'
import Footer from './layout/Footer'

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
      <Login path="/login" />
      <Register path="/register" />
      <Settings path="/settings" />
      <Article path="/article" />
      <Profile path="/profile" />
      <EditArticle path="/article/:id" />
    </Router>
    <Footer />
  </RootStateContext.Provider>
)

render(<Main />, document.querySelector('#app')!)

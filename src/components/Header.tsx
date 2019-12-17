import { Fragment, h } from 'preact'
import { Link } from 'preact-router'
import { useContext } from 'preact/hooks'
import { RootContext } from '../stores'

export default function Header() {
  const rootState = useContext(RootContext)

  return <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="/">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link className="nav-link" activeClassName="active" href="/">Home</Link>
        </li>
        {
          rootState.user ? (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/settings">
                  <i className="ion-compose" /> New Post
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" href="/settings">
                  <i className="ion-gear-a" /> Settings
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" href="/register">Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" href="/login">Sign in</Link>
              </li>
            </Fragment>
          )
        }
      </ul>
    </div>
  </nav>
}


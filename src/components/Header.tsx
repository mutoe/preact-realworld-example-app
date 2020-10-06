import { Fragment, h } from 'preact'
import { Link } from 'preact-router'
import { useRootState } from '../store'

export default function Header () {
  const [{ user }] = useRootState()

  return <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="/">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link className="nav-link" activeClassName="active" href="/">Home</Link>
        </li>
        {
          user ? (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/article/create">
                  <i className="ion-compose" /> New Post
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" href="/settings">
                  <i className="ion-gear-a" /> Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" href={`/@${user?.username}`}>
                  {user?.username}
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

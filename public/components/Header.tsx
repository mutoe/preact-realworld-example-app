import preact, { FunctionalComponent } from 'preact'
import { useLocation } from 'preact-iso'
import { useRootState } from 'public/store'

const Header: FunctionalComponent = () => {
  const [{ user }] = useRootState()
  const {path} = useLocation()

  return <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="/">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          {/*<a className="nav-link" activeClassName="active" href="/">Home</a>*/}
          <a className="nav-link" href="/">Home</a>
        </li>
        {
          user ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/article/create">
                  <i className="ion-compose" /> New Post
                </a>
              </li>
              <li className="nav-item">
                {/*<a className="nav-link" activeClassName="active" href="/settings">*/}
                <a className="nav-link" href="/settings">
                  <i className="ion-gear-a" /> Settings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/@${user?.username}`}>
                {/*<a className="nav-link" activeClassName="active" href={`/@${user?.username}`}>*/}
                  {user?.username}
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                {/*<a className="nav-link" activeClassName="active" href="/register">Sign up</a>*/}
                <a className="nav-link" href="/register">Sign up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Sign in</a>
                {/*<a className="nav-link" activeClassName="active" href="/login">Sign in</a>*/}
              </li>
            </>
          )
        }
      </ul>
    </div>
  </nav>
}

export default Header

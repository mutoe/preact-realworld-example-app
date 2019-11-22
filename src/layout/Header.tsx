import { h } from 'preact'
import { Link } from 'preact-router/match'
import { Component } from 'react'

export default class Header extends Component {
  render() {
    return <nav className="navbar navbar-light">
      <div className="container">
        <Link activeClassName="navbar-brand" href="/">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" href="/">Home</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-compose" /> New Post
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" href="/settings">
              <i className="ion-gear-a" /> Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" href="/register">Sign up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" href="/login">Sign in</Link>
          </li>
        </ul>
      </div>
    </nav>
  }
}


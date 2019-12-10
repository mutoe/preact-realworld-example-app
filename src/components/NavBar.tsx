import { Component, h } from 'preact'

interface NavBarProps {
  currentActive?: 'global' | 'personal';
}

export default class NavBar extends Component<NavBarProps> {
  render() {
    return (
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a className={`nav-link ${this.props.currentActive === 'global' ? 'active' : 'disabled'}`} href="">Your Feed</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${this.props.currentActive === 'global' ? 'active' : 'disabled'}`} href="/">Global Feed</a>
          </li>
        </ul>
      </div>
    )
  }
}

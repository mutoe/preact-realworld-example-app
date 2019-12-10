import { h } from 'preact'
import { useContext } from 'preact/hooks'
import RootStateContext from '../stores/globalContext'

interface NavBarProps {
  currentActive?: 'global' | 'personal';
}

export default function NavBar(props: NavBarProps = {}) {
  const rootState = useContext(RootStateContext)

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {
          rootState.user && (
            <li className="nav-item">
              <a className={`nav-link ${props.currentActive === 'global' ? 'active' : 'disabled'}`} href="/my-feed">
                Your
                Feed
              </a>
            </li>
          )
        }
        <li className="nav-item">
          <a className={`nav-link ${props.currentActive === 'global' ? 'active' : 'disabled'}`} href="/">
            Global Feed
          </a>
        </li>
      </ul>
    </div>
  )
}

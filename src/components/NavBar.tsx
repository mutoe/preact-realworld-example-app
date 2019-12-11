import { h } from 'preact'
import { useContext } from 'preact/hooks'
import RootStateContext from '../stores/globalContext'

interface NavBarProps {
  currentActive?: 'global' | 'personal' | 'tag';
  tag?: string;
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
        {
          props.currentActive === 'tag' && (
            <li className="nav-item">
              <a className="nav-link active" href={`/tag/${props.tag}`}>
                # {props.tag}
              </a>
            </li>
          )
        }

      </ul>
    </div>
  )
}

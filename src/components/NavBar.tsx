import { h } from 'preact'
import { useRootState } from '../store'

interface NavBarProps {
  currentActive?: 'global' | 'personal' | 'tag';
  tag?: string;
}

export default function NavBar(props: NavBarProps = {}) {
  const [ { user } ] = useRootState()

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {user && (
          <li className="nav-item">
            <a className={`nav-link ${props.currentActive === 'personal' ? 'active' : ''}`}
              href={`/@${user?.username}`}>
              Your Feed
            </a>
          </li>
        )}
        <li className="nav-item">
          <a className={`nav-link ${props.currentActive === 'global' ? 'active' : ''}`} href="/">
            Global Feed
          </a>
        </li>
        {props.currentActive === 'tag' && (
          <li className="nav-item">
            <a className="nav-link active" href={`/tag/${props.tag}`}>
              # {props.tag}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

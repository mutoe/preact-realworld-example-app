import { useRootState } from '../store';

interface NavBarProps {
    currentActive?: 'global' | 'personal' | 'tag';
    tag?: string;
}

export default function NavBar(props: NavBarProps) {
    const [{ user }] = useRootState();

    return (
        <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                {user && (
                    <li class="nav-item">
                        <a class={`nav-link ${props.currentActive === 'personal' ? 'active' : ''}`} href="/my-feeds">
                            Your Feed
                        </a>
                    </li>
                )}
                <li class="nav-item">
                    <a class={`nav-link ${props.currentActive === 'global' ? 'active' : ''}`} href="/">
                        Global Feed
                    </a>
                </li>
                {props.currentActive === 'tag' && (
                    <li class="nav-item">
                        <a class="nav-link active" href={`/tag/${props.tag}`}>
                            # {props.tag}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

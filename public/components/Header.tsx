import { Fragment } from 'preact';
import { useRootState } from '../store';

export default function Header() {
    const [{ user }] = useRootState();

    return (
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/">
                    conduit
                </a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <a class="nav-link" href="/">
                            Home
                        </a>
                    </li>
                    {user ? (
                        <Fragment>
                            <li class="nav-item">
                                <a class="nav-link" href="/article/create">
                                    <i class="ion-compose" /> New Post
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/settings">
                                    <i class="ion-gear-a" /> Settings
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href={`/@${user?.username}`}>
                                    {user?.username}
                                </a>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">
                                    Sign up
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    Sign in
                                </a>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );
}

import { Fragment, h } from 'preact';
import { Link } from 'preact-router';
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
						<Link class="nav-link" activeClassName="active" href="/">
							Home
						</Link>
					</li>
					{user ? (
						<Fragment>
							<li class="nav-item">
								<Link class="nav-link" href="/article/create">
									<i class="ion-compose" /> New Post
								</Link>
							</li>
							<li class="nav-item">
								<Link class="nav-link" activeClassName="active" href="/settings">
									<i class="ion-gear-a" /> Settings
								</Link>
							</li>
							<li class="nav-item">
								<Link class="nav-link" activeClassName="active" href={`/@${user?.username}`}>
									{user?.username}
								</Link>
							</li>
						</Fragment>
					) : (
						<Fragment>
							<li class="nav-item">
								<Link class="nav-link" activeClassName="active" href="/register">
									Sign up
								</Link>
							</li>
							<li class="nav-item">
								<Link class="nav-link" activeClassName="active" href="/login">
									Sign in
								</Link>
							</li>
						</Fragment>
					)}
				</ul>
			</div>
		</nav>
	);
}

import Link from './Link';
import useStore from '../store';

export default function Header() {
	const { isAuthenticated, user } = useStore(state => ({
		isAuthenticated: state.isAuthenticated,
		user: state.user
	}));

	return (
		<nav class="navbar navbar-light">
			<div class="container">
				<a class="navbar-brand" href="/">
					conduit
				</a>
				<ul class="nav navbar-nav pull-xs-right">
					<li class="nav-item">
						<Link href="/">
							Home
						</Link>
					</li>
					{isAuthenticated ? (
						<>
							<li class="nav-item">
								<Link href="/editor">
									<i class="ion-compose" /> New Article
								</Link>
							</li>
							<li class="nav-item">
								<Link href="/settings">
									<i class="ion-gear-a" /> Settings
								</Link>
							</li>
							<li class="nav-item">
								<Link
									matcher={(url) => /^\/@.*/g.test(url)}
									href={`/@${user?.username}`}
								>
									{user?.username}
								</Link>
							</li>
						</>
					) : (
						<>
							<li class="nav-item">
								<Link href="/login">
									Sign in
								</Link>
							</li>
							<li class="nav-item">
								<Link href="/register">
									Sign up
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

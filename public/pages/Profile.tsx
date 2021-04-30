import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso/router';

import { ArticlePreview } from '../components/ArticlePreview';
import { Link } from '../components/Link';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Pagination } from '../components/Pagination';
import { apiGetArticles } from '../services/api/article';
import { apiFollowProfile, apiUnfollowProfile, apiGetProfile } from '../services/api/profile';
import { useStore } from '../store';
import { DEFAULT_AVATAR } from '../utils/constants';

interface ProfileProps {
	username: string;
}

export default function ProfilePage(props: ProfileProps) {
	const username = props.username?.replace(/^@/, '') || '';
	const { url } = useLocation();
	const [user, setUser] = useState({} as Profile);
	const [articles, setArticles] = useState<Article[]>([]);
	const [articlesCount, setArticlesCount] = useState(0);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const onFollowUser = async () => {
		if (user.following) {
			setUser(prev => ({ ...prev, following: false }));
			await apiUnfollowProfile(username);
		} else {
			setUser(prev => ({ ...prev, following: true }));
			await apiFollowProfile(username);
		}
	};

	useEffect(() => {
		(async function fetchProfile() {
			setUser(await apiGetProfile(username));
		})();
	}, [username]);

	useEffect(() => {
		(async function fetchArticles() {
			setIsLoading(true);
			const { articles, articlesCount } = await apiGetArticles(page, {
				[/.*\/favorites/g.test(url) ? 'favorited' : 'author']: username
			});

			setArticles(articles);
			setArticlesCount(articlesCount);
			setIsLoading(false);
		})();
	}, [url, page, username]);

	return (
		<div class="profile-page">
			<div class="user-info">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-md-10 offset-md-1">
							<img src={user.image || DEFAULT_AVATAR} class="user-img" />
							<h4>{username}</h4>
							<p>{user.bio}</p>
							{username == useStore(state => state.user?.username) ? (
								<Link href="/settings" class="btn btn-sm btn-outline-secondary action-btn">
									<i class="ion-gear-a" />
									&nbsp; Edit Profile Settings
								</Link>
							) : (
								<button class="btn btn-sm btn-outline-secondary action-btn" onClick={onFollowUser}>
									<i class="ion-plus-round" />
									&nbsp;
									{user.following ? 'Unfollow' : 'Follow'} {username}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<div class="articles-toggle">
							<ul class="nav nav-pills outline-active">
								<li class="nav-item">
									<Link href={`/@${user.username}`}>My Articles</Link>
								</li>
								<li class="nav-item">
									<Link href={`/@${user.username}/favorites`}>Favorited Articles</Link>
								</li>
							</ul>
						</div>

						{isLoading ? (
							<LoadingIndicator show={isLoading} style={{ margin: '1rem auto', display: 'flex' }} width="2em" />
						) : articles.length > 0 ? (
							articles.map(article => <ArticlePreview key={article.slug} article={article} />)
						) : (
							<div class="article-preview">No articles are here... yet.</div>
						)}

						<Pagination count={articlesCount} page={page} setPage={setPage} />
					</div>
				</div>
			</div>
		</div>
	);
}

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';

import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';
import { deleteFollowProfile, getProfile, getProfileArticles, postFollowProfile } from '../services';
import { useRootState } from '../store';

interface ProfileProps {
	username?: string;
	favorites?: boolean;
}

export default function Profile(props: ProfileProps) {
	const username = props.username?.replace(/^@/, '') || '';
	const [user, setUser] = useState({} as Profile);
	const [articles, setArticles] = useState<Article[]>([]);
	const [articlesCount, setArticlesCount] = useState(0);
	const [page, setPage] = useState(1);
	const [{ user: loggedUser }] = useRootState();

	const fetchProfile = async () => {
		const user = await getProfile(username);
		setUser(user);
	};

	const fetchArticles = async () => {
		const { articles, articlesCount } = await getProfileArticles(username, page);
		setArticles(articles);
		setArticlesCount(articlesCount);
	};

	const setArticle = (articleIndex: number, article: Article) => {
		const articlesCopy = [...articles];
		articlesCopy[articleIndex] = article;
		setArticles(articlesCopy);
	};

	const onFollowUser = async () => {
		if (user.following) {
			setUser(prev => ({ ...prev, following: false }));
			await deleteFollowProfile(username);
		} else {
			setUser(prev => ({ ...prev, following: true }));
			await postFollowProfile(username);
		}
	};

	useEffect(() => {
		fetchProfile();
		fetchArticles();
	}, [username]);

	return (
		<div class="profile-page">
			<div class="user-info">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-md-10 offset-md-1">
							<img src={user.image} class="user-img" />
							<h4>{username}</h4>
							<p>{user.bio}</p>
							{loggedUser ? (
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
									<Link class="nav-link" activeClassName="active" href={`/@${user.username}`}>
										My Articles
									</Link>
								</li>
								<li class="nav-item">
									<Link class="nav-link" activeClassName="active" href={`/@${user.username}/favorites`}>
										Favorited Articles
									</Link>
								</li>
							</ul>
						</div>

						{articles.length > 0 ? (
							articles.map((article, index) => (
								<ArticlePreview
									key={article.slug}
									article={article}
									setArticle={article => setArticle(index, article)}
								/>
							))
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

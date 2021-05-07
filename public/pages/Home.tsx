import { useEffect, useState } from 'preact/hooks';

import { ArticlePreview } from '../components/ArticlePreview';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Pagination } from '../components/Pagination';
import { PopularTags } from '../components/PopularTags';
import { apiGetArticles, apiGetFeed } from '../services/api/article';
import { useStore } from '../store';

export default function HomePage() {
	const isAuthenticated = useStore(state => !!state.user);

	const [articles, setArticles] = useState<Article[]>([]);
	const [articlesCount, setArticlesCount] = useState(0);
	const [page, setPage] = useState(1);
	const [currentActiveTab, setCurrentActiveTab] = useState(isAuthenticated ? 'personal' : 'global');
	const [tag, setTag] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async function fetchFeeds() {
			setIsLoading(true);
			let articles: Article[] = [];
			let articlesCount = 0;
			switch (currentActiveTab) {
				case 'personal':
					({ articles, articlesCount } = await apiGetFeed(page));
					break;
				default:
					({ articles, articlesCount } = await apiGetArticles(page, currentActiveTab === 'tag' ? { tag } : undefined));
					break;
			}
			setArticles(articles);
			setArticlesCount(articlesCount);
			setIsLoading(false);
		})();
	}, [currentActiveTab, page, tag]);

	return (
		<div class="home-page">
			{!isAuthenticated && (
				<div class="banner">
					<div class="container">
						<h1 class="logo-font">conduit</h1>
						<p>A place to share your knowledge.</p>
					</div>
				</div>
			)}

			<div class="container page">
				<div class="row">
					<div class="col-md-9">
						<div class="feed-toggle">
							<ul class="nav nav-pills outline-active">
								{isAuthenticated && (
									<li class="nav-item">
										<a
											class={`nav-link ${currentActiveTab === 'personal' ? 'active' : ''}`}
											href="#"
											onClick={() => setCurrentActiveTab('personal')}
										>
											Your Feed
										</a>
									</li>
								)}
								<li class="nav-item">
									<a
										class={`nav-link ${currentActiveTab === 'global' ? 'active' : ''}`}
										href="#"
										onClick={() => setCurrentActiveTab('global')}
									>
										Global Feed
									</a>
								</li>
								{currentActiveTab === 'tag' && (
									<li class="nav-item">
										<a class="nav-link active" href="#">
											# {tag}
										</a>
									</li>
								)}
							</ul>
						</div>

						{isLoading ? (
							<LoadingIndicator show={isLoading} style={{ margin: '1rem auto', display: 'flex' }} width="2em" />
						) : articles.length > 0 ? (
							articles.map(article => <ArticlePreview key={article.slug} article={article} />)
						) : (
							<div class="article-preview">No articles are here... yet.</div>
						)}

						{!isLoading && <Pagination count={articlesCount} page={page} setPage={setPage} />}
					</div>

					<div class="col-md-3">
						<PopularTags
							onClick={(tag: string) => {
								setCurrentActiveTab('tag');
								setTag(tag);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

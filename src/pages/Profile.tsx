import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { deleteFollowProfile, getProfile, getProfileArticles, postFollowProfile } from '../services'
import { useEffect, useState } from 'preact/hooks'
import ArticlePreview from '../components/ArticlePreview'
import Pagination from '../components/Pagination'
import { useRootState } from '../store'

interface ProfileProps {
  username?: string;
  favorites?: boolean;
}

const Profile: FunctionalComponent<ProfileProps> = (props) => {
  const username = props.username?.replace(/^@/, '') || ''
  const [user, setUser] = useState({} as Profile)
  const [articles, setArticles] = useState<Article[]>([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [page, setPage] = useState(1)
  const [{ user: loggedUser }] = useRootState()

  const fetchProfile = async () => {
    const user = await getProfile(username)
    setUser(user)
  }

  const fetchArticles = async () => {
    const { articles, articlesCount } = await getProfileArticles(username, page)
    setArticles(articles)
    setArticlesCount(articlesCount)
  }

  const setArticle = (articleIndex: number, article: Article) => {
    const articlesCopy = [...articles]
    articlesCopy[articleIndex] = article
    setArticles(articlesCopy)
  }

  const onFollowUser = async () => {
    if (user.following) {
      setUser(prev => ({ ...prev, following: false }))
      await deleteFollowProfile(username)
    } else {
      setUser(prev => ({ ...prev, following: true }))
      await postFollowProfile(username)
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchArticles()
  }, [username])

  return (
    <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={user.image} className="user-img" />
              <h4>{username}</h4>
              <p>{user.bio}</p>
              {loggedUser ? (
                <Link href="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a" />
                  &nbsp;
                  Edit profile settings
                </Link>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onFollowUser}>
                  <i className="ion-plus-round" />
                  &nbsp;
                  {user.following ? 'Unfollow' : 'Follow'} {username}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                {/* TODO: add link */}
                <li className="nav-item">
                  <a className="nav-link active" href="">My Articles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Favorited Articles</a>
                </li>
              </ul>
            </div>

            {articles.map((article, index) => (
              <ArticlePreview key={article.slug} article={article} setArticle={article => setArticle(index, article)} />
            ))}

            <Pagination count={articlesCount} page={page} setPage={setPage} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

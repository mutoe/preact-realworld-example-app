import { Component, h } from 'preact'
import { getProfile, postFollowProfile } from '../services'

interface ProfileProps {
  username?: string;
}

interface ProfileStates {
  user: User;
}

export default class Profile extends Component<ProfileProps, ProfileStates> {

  username = ''

  constructor() {
    super()
    this.state = {
      user: {
        username: '',
        bio: '',
        image: '',
        following: false,
      },
    }
  }

  componentDidMount(): void {
    this.fetchProfile()
  }

  async fetchProfile() {
    const user = await getProfile(this.username)
    this.setState({ user })
  }

  async onFollowUser() {
    this.setState({ user: { ...this.state.user, following: true } })
    await postFollowProfile(this.username)
  }

  render() {
    this.username = this.props.username?.replace(/^@/, '') || ''

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">

              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={this.state.user.image} className="user-img" />
                <h4>{this.username}</h4>
                <p>
                  {this.state.user.bio}
                </p>
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={this.onFollowUser.bind(this)}>
                  <i className="ion-plus-round" />
                  &nbsp;
                  {this.state.user.following ? 'Unfollow' : 'Follow'} {this.username}
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">My Articles</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">Favorited Articles</a>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                  <div className="info">
                    <a href="" className="author">Eric Simons</a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> 29
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                  <div className="info">
                    <a href="" className="author">Albert Pai</a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> 32
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline">Music</li>
                    <li className="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </a>
              </div>


            </div>

          </div>
        </div>

      </div>
    )
  }

}

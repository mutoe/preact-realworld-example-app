import { Component, h } from 'preact'
import NavBar from '../components/NavBar'
import PopularTags from '../components/PopularTags'

export default class Home extends Component {
  render() {
    return (
      <div className="home-page">

        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <NavBar currentActive="global" />

              <div className="article-preview">
                <div className="article-meta">
                  <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
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
                  <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
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
                </a>
              </div>

            </div>

            <div className="col-md-3">
              <PopularTags />
            </div>

          </div>
        </div>

      </div>
    )
  }
}

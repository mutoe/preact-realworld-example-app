import { Component, h } from 'preact'
import { Link } from 'preact-router'

interface RegisterState {
  errors: ResponseError
}

export default class Register extends Component<{}, RegisterState> {
  constructor() {
    super()

    this.state = {
      errors: {},
    }
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/register">Need an account?</Link>
              </p>

              <ul className="error-messages">
                {Object.entries(this.state.errors).map(([ field, errors ]) => (
                  <li>{field} {errors[0]}</li>
                ))}
              </ul>

              <form>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

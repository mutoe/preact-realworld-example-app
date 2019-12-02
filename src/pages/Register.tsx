import { Component, h } from 'preact'

interface RegisterState {
  errors: Record<string, string[]>;
  username: string;
  email: string;
  password: string;
}

export default class Register extends Component<{}, RegisterState> {
  constructor() {
    super()
    this.state = {
      errors: {},
      username: '',
      email: '',
      password: '',
    }
  }

  onRegister() {
    return
  }

  onInputUsername(username: string) {
    this.setState({ username })
  }

  onInputEmail(email: string) {
    this.setState({ email })
  }

  onInputPassword(password: string) {
    this.setState({ password })
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/login">Have an account?</a>
              </p>

              <ul className="error-messages">
                {
                  Object.entries(this.state.errors).map(([ field, errors ]) => {
                    return <li key={field}>{field} {errors[0]}</li>
                  })
                }
              </ul>

              <form>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={this.state.username}
                    onInput={e => this.onInputUsername(e.currentTarget.value)} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    onInput={e => this.onInputEmail(e.currentTarget.value)}
                    value={this.state.email} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    onInput={e => this.onInputPassword(e.currentTarget.value)}
                    value={this.state.password} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right"
                  disabled={!(this.state.email && this.state.username && this.state.password)}
                  onClick={this.onRegister}>
                  Sign up
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

import { Component, createRef, h } from 'preact'
import { Link, route } from 'preact-router'
import { postLogin } from '../services'

interface RegisterState {
  errors: ResponseError;
  email: string;
  password: string;
}

export default class Register extends Component<{}, RegisterState> {
  formRef = createRef<HTMLFormElement>()

  constructor() {
    super()

    this.state = {
      errors: {},
      email: '',
      password: '',
    }
  }

  async onLogin() {
    if (!this.formRef.current?.checkValidity()) return

    try {
      const { token } = await postLogin({ email: this.state.email, password: this.state.password })
      window.localStorage.setItem('token', token)
      route('/')
    } catch (data) {
      this.setState({
        errors: data.errors,
      })
    }
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
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/register">Need an account?</Link>
              </p>

              <ul className="error-messages">
                {Object.entries(this.state.errors).map(([ field, errors ]) => (
                  <li key={field}>{field} {errors[0]}</li>
                ))}
              </ul>

              <form ref={this.formRef}>
                <fieldset className="form-group" aria-required>
                  <input value={this.state.email}
                    className="form-control form-control-lg"
                    type="email"
                    required
                    placeholder="Email"
                    onInput={e => this.onInputEmail(e.currentTarget.value)} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={this.state.password}
                    className="form-control form-control-lg"
                    type="password"
                    required
                    placeholder="Password"
                    onInput={e => this.onInputPassword(e.currentTarget.value)} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right"
                  disabled={!this.state.email || !this.state.password}
                  type="submit"
                  onClick={this.onLogin.bind(this)}>
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

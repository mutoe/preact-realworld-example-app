import { createRef, FunctionalComponent, h } from 'preact'
import { postRegister } from '../services'
import { route } from 'preact-router'
import { useState } from 'preact/hooks'

const Register: FunctionalComponent = () => {
  const formRef = createRef<HTMLFormElement>()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const onRegister = async () => {
    if (!formRef.current?.checkValidity()) return

    try {
      const user = await postRegister(form)
      global.localStorage.setItem('token', JSON.stringify(user))
      route('/')
    } catch (e) {
      setErrors(e.errors)
    }
  }

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
                Object.entries(errors || {}).map(([field, errors]) => {
                  return <li key={field}>{field} {errors[0]}</li>
                })
              }
            </ul>

            <form ref={formRef}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  value={form.username}
                  onInput={e => setForm(prev => ({ ...prev, username: e.currentTarget.value }))} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))}
                  value={form.email} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  type="password"
                  minLength={8}
                  placeholder="Password"
                  onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))}
                  value={form.password} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right"
                disabled={!(form.email && form.username && form.password)}
                onClick={onRegister}>
                Sign up
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register

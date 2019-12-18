import { createRef, h } from 'preact'
import { Link, route } from 'preact-router'
import { postLogin } from '../services'
import { useState } from 'preact/hooks'

export default function Register() {
  const formRef = createRef<HTMLFormElement>()
  const [ errors, setErrors ] = useState<ResponseError>({})
  const [ form, setForm ] = useState({
    email: '',
    password: '',
  })

  const onLogin = async (event: Event) => {
    event.preventDefault()
    if (!formRef.current?.checkValidity()) return

    try {
      const { token } = await postLogin(form)
      window.localStorage.setItem('token', token)
      route('/')
    } catch (data) {
      setErrors(data.errors)
    }
  }

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
              {Object.entries(errors || {}).map(([ field, errors ]) => (
                <li key={field}>{field} {errors[0]}</li>
              ))}
            </ul>

            <form ref={formRef} onSubmit={onLogin}>
              <fieldset className="form-group" aria-required>
                <input value={form.email}
                  className="form-control form-control-lg"
                  type="email"
                  required
                  placeholder="Email"
                  onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))} />
              </fieldset>
              <fieldset className="form-group">
                <input value={form.password}
                  className="form-control form-control-lg"
                  type="password"
                  required
                  placeholder="Password"
                  onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right"
                disabled={!form.email || !form.password}
                type="submit">
                Sign in
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )

}

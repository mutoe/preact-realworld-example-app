import { FunctionalComponent, h } from 'preact'
import { useRootState } from '../store'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { putProfile } from '../services'
import { UPDATE_USER } from '../store/constants'

interface FormState {
  username?: string;
  bio?: string;
  image?: string;
  email?: string;
  password?: string;
}

const Settings: FunctionalComponent = () => {
  const [{ user }, dispatch] = useRootState()
  const [form, setForm] = useState<FormState>({})

  function onLogout () {
    dispatch({ type: UPDATE_USER })
  }

  async function onSubmit () {
    // filter empty fields from form
    const filteredForm = Object.entries(form).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {})
    const profile = await putProfile(filteredForm)
    dispatch({ type: UPDATE_USER, user: profile })
  }

  useEffect(() => {
    if (!user) { route('/login') } else {
      setForm({
        image: user.image || undefined,
        username: user.username || undefined,
        bio: user.bio || undefined,
        email: user.email || undefined,
      })
    }
  }, [user])

  if (!user) return null

  const buttonDisabled = form.image === user.image &&
    form.username === user.username &&
    form.email === user.email &&
    form.bio === user.bio &&
    !form.password

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input value={form.image}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    onInput={e => setForm(prev => ({ ...prev, image: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={form.username}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    onInput={e => setForm(prev => ({ ...prev, username: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea value={form.bio}
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    onInput={e => setForm(prev => ({ ...prev, bio: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={form.email}
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    onInput={e => setForm(prev => ({ ...prev, email: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={form.password}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    onInput={e => setForm(prev => ({ ...prev, password: e.currentTarget.value }))} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" disabled={buttonDisabled} onClick={onSubmit}>
                  Update Settings
                </button>
              </fieldset>
            </form>

            <hr />

            <button className="btn btn-outline-danger" onClick={onLogout}>Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Settings

import { h } from 'preact'
import { useRootState } from '../store'
import { LOGOUT } from '../store/constants'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

export default function Settings() {
  const [ { user }, dispatch ] = useRootState()

  function onLogout() {
    dispatch({ type: LOGOUT })
  }

  useEffect(() => {
    if (!user) route('/login')
  }, [ user ])

  if (!user) return null

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input value={user.image || ''}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture" />
                </fieldset>
                <fieldset className="form-group">
                  <input value={user.username}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name" />
                </fieldset>
                <fieldset className="form-group">
                  <textarea value={user.bio || ''} className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you" />
                </fieldset>
                <fieldset className="form-group">
                  <input value={user.email} className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
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

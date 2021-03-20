import { createContext, h, VNode } from 'preact'
import { useLocation } from 'preact-iso/router'
import parseStorageGet from 'public/utils/parse-storage-get'
import { useContext, useEffect, useReducer } from 'preact/hooks'
import reducer from 'public/store/reducer'
import { UPDATE_USER } from 'public/store/constants'
import { request } from 'public/services'

const initialRootState: RootState = {
  user: parseStorageGet('user') || null,
  errors: {},
}

type RootContextProps = [
  RootState,
  (action: Action) => void
]

export const RootContext = createContext<RootContextProps>({} as RootContextProps)

export const RootProvider = (props: { children: VNode | VNode[] }) => {
  const {route} = useLocation()
  const [state, dispatch] = useReducer(reducer, initialRootState)

  request.options.responseInterceptor = (response) => {
    if (response.status === 401) {
      dispatch({ type: UPDATE_USER })
      route('/login')
    }
  }

  useEffect(() => {
    dispatch({ type: UPDATE_USER, user: state.user })
  }, [])

  return (
    <RootContext.Provider value={[state, dispatch]}>
      {props.children}
    </RootContext.Provider>
  )
}

export const useRootState = () => useContext(RootContext)

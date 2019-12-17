import { createContext } from 'preact'

export const initialRootState: RootState = {
  user: null,
}

export const RootContext = createContext<RootState>(initialRootState)

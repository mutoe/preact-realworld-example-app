import { createContext } from 'preact'
import parseStorageGet from '../utils/parse-storage-get'

export const initialRootState: RootState = {
  user: parseStorageGet('user') || null,
}

export const RootContext = createContext<RootState>(initialRootState)

import { render, h } from 'preact'
import { App } from './App'

console.log('Hello world')

render(<App name="cool working"/>, document.querySelector('#app')!)

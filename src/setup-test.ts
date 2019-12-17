// This `<reference ...>` directive is necessary to include the adapter's
// extensions to types in the "preact" and "enzyme" packages.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="enzyme-adapter-preact-pure"/>

import { JSDOM } from 'jsdom'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'

const dom = new JSDOM('', {
  pretendToBeVisual: true,
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      Event: typeof Event;
      Node: typeof Node;
      document: Document;
      window: Window;
      navigator: Navigator;
      requestAnimationFrame: AnimationFrameProvider['requestAnimationFrame'];
      cancelAnimationFrame: AnimationFrameProvider['cancelAnimationFrame'];
    }
  }
}

global.Event = dom.window.Event
global.Node = dom.window.Node
global.window = dom.window
global.document = dom.window.document
global.requestAnimationFrame = dom.window.requestAnimationFrame
global.cancelAnimationFrame = dom.window.cancelAnimationFrame

configure({ adapter: new Adapter() })

// mock localStorage
const localStorageMock = (function () {
  let store: Record<string, any> = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: any) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

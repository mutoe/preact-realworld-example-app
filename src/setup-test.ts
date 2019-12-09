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
    }
  }
}

global.Event = dom.window.Event
global.Node = dom.window.Node
global.window = dom.window
global.document = dom.window.document
global.requestAnimationFrame = dom.window.requestAnimationFrame

configure({ adapter: new Adapter() })

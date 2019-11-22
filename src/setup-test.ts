// This `<reference ...>` directive is necessary to include the adapter's
// extensions to types in the "preact" and "enzyme" packages.

/// <reference types="enzyme-adapter-preact-pure"/>

import { JSDOM } from 'jsdom'

import { configure } from "enzyme"
import Adapter from "enzyme-adapter-preact-pure"

const dom = new JSDOM('', {
  pretendToBeVisual: true
})

// @ts-ignore
global.Event = dom.window.Event;
// @ts-ignore
global.Node = dom.window.Node;
// @ts-ignore
global.window = dom.window;
// @ts-ignore
global.document = dom.window.document;
// @ts-ignore
global.requestAnimationFrame = dom.window.requestAnimationFrame;

configure({ adapter: new Adapter() })

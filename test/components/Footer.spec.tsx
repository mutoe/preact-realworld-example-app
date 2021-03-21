import { h } from 'preact'
import render from 'preact-render-to-string'

import Footer from '../../src/components/Footer'

describe('# Footer', () => {
  it('should be display normally', () => {
    const html = render(<Footer />);

    expect(html).toMatchSnapshot();
  });
});

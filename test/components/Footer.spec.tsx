<<<<<<< HEAD:test/components/Footer.spec.tsx
import { h } from 'preact'
import render from 'preact-render-to-string'

import Footer from '../../src/components/Footer'
=======
import render from 'preact-render-to-string';
import Footer from '../Footer';
import { h } from 'preact';
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/components/__test__/Footer.spec.tsx

describe('# Footer', () => {
  it('should be display normally', () => {
    const html = render(<Footer />);

    expect(html).toMatchSnapshot();
  });
});

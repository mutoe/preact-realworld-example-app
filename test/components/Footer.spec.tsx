import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import Footer from '../../src/components/Footer';

describe('Footer Renders', () => {
	it('renders the Footer component', () => {
		render(<Footer />);
		expect(
			screen.getByRole('link', { name: 'conduit' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'conduit' })
		).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<Footer />);
		expect(asFragment()).toMatchSnapshot();
	});
});

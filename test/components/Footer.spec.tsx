import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import Footer from '../../public/components/Footer';

test('renders the Footer component', () => {
	render(<Footer />);
	expect(
		screen.getByRole('link', { name: 'conduit' })
	).toBeInTheDocument();
	expect(
		screen.getByRole('link', { name: 'conduit' })
	).toBeInTheDocument();
});

test('matches snapshot', () => {
	const { asFragment } = render(<Footer />);
	expect(asFragment()).toMatchSnapshot();
});

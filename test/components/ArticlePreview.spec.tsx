import { h } from 'preact';
import { cleanup, fireEvent, render, screen } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ArticlePreview from '../../public/components/ArticlePreview';

const article: Article = {
	title: 'Foo',
	description: 'Bar',
	body: 'Baz',
	tagList: ['foo', 'bar', 'baz'],
	slug: 'foo-xxxxx',
	createdAt: '2021-04-03T04:10:59.616Z',
	updatedAt: '2021-04-03T04:10:59.616Z',
	author: {
		username: 'SmokeTest',
		following: false
	},
	favorited: false,
	favoritesCount: 23
};

test('should display article title and description correctly', () => {
	render(<ArticlePreview article={article} />);

	expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument();
	expect(screen.getByText(article.description)).toBeInTheDocument();
});

test('should display meta info correctly', () => {
	render(<ArticlePreview article={article} />);

	expect(screen.getByRole('img')).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
	expect(screen.getByRole('link', { name: article.author.username })).toBeInTheDocument();
	expect(screen.getByText(new Date(article.createdAt).toDateString())).toBeInTheDocument();
});

test('should link to the correct locations', () => {
	render(<ArticlePreview article={article} />);

	expect(screen.getByRole('link', { name: 'Read more...' })).toHaveAttribute('href', `/article/${article.slug}`);
	expect(screen.getByRole('link', { name: "User's profile picture" })).toHaveAttribute(
		'href',
		`/@${article.author.username}`
	);
	expect(screen.getByRole('link', { name: 'SmokeTest' })).toHaveAttribute('href', `/@${article.author.username}`);
});

test('should display favorites count correctly', () => {
	render(<ArticlePreview article={article} />);
	expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveTextContent(article.favoritesCount.toString());
});

test('should highlight favorite button correctly', () => {
	render(<ArticlePreview article={article} />);

	expect(screen.getByRole('button', { name: 'Favorite article' })).not.toHaveClass('btn-primary');

	// Without this cleanup, the component will only rerender, not reinitialize, and
	// we want reinitialization as the value we're testing come from state init'd via
	// props - aka, new props won't change this.
	cleanup();

	render(<ArticlePreview article={{ ...article, favorited: true }} />);
	expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveClass('btn-primary');
});

describe('Article Favorite / Unfavorite', () => {
	const server = setupServer(
		rest.post(`https://conduit.productionready.io/api/articles/${article.slug}/favorite`, (_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					article: { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
				})
			);
		}),
		rest.delete(`https://conduit.productionready.io/api/articles/${article.slug}/favorite`, (_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					article: { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
				})
			);
		})
	);

	beforeAll(() => server.listen());
	beforeEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('should update article details when favorited', async () => {
		render(<ArticlePreview article={article} />);
		fireEvent.click(screen.getByRole('button', { name: 'Favorite article' }));

		await screen.findByText('24'); // Wait for favorite count to update

		expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveClass('btn-primary');
		expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveTextContent(
			(article.favoritesCount + 1).toString()
		);
	});

	test('should update article details when unfavorited', async () => {
		render(<ArticlePreview article={{ ...article, favorited: true }} />);
		fireEvent.click(screen.getByRole('button', { name: 'Favorite article' }));

		await screen.findByText('22'); // Wait for favorite count to update

		expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveClass('btn-outline-primary');
		expect(screen.getByRole('button', { name: 'Favorite article' })).toHaveTextContent(
			(article.favoritesCount - 1).toString()
		);
	});
});

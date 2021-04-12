import { h } from 'preact';
import { cleanup, fireEvent, render, screen } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ArticleMeta from '../../public/components/ArticleMeta';
import { dateFormatter } from '../../public/utils/dateFormatter';

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

test('should display meta info correctly', () => {
	render(<ArticleMeta article={article} />);

	expect(screen.getByRole('img')).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
	expect(screen.getByRole('link', { name: article.author.username })).toBeInTheDocument();
	expect(screen.getByText(dateFormatter(article.createdAt))).toBeInTheDocument();
});

test('should link to the correct locations', () => {
	render(<ArticleMeta article={article} />);

	expect(screen.getByRole('link', { name: "User's profile picture" })).toHaveAttribute(
		'href',
		`/@${article.author.username}`
	);
	expect(screen.getByRole('link', { name: 'SmokeTest' })).toHaveAttribute('href', `/@${article.author.username}`);
});

test('should display favorites count correctly', () => {
	render(<ArticleMeta article={article} />);
	expect(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount})` })).toBeInTheDocument();
});

test('should highlight favorite button correctly', () => {
	render(<ArticleMeta article={article} />);

	expect(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount})` })).not.toHaveClass(
		'btn-primary'
	);

	// Without this cleanup, the component will only rerender, not reinitialize, and
	// we want reinitialization as the value we're testing come from state init'd via
	// props - aka, new props won't change this.
	cleanup();

	render(<ArticleMeta article={{ ...article, favorited: true }} />);
	expect(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount})` })).toHaveClass(
		'btn-primary'
	);
});

describe('Author Follow / Unfollow + Article Favorite / Unfavorite', () => {
	const server = setupServer(
		rest.post(`https://conduit.productionready.io/api/profiles/${article.author.username}/follow`, (_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					profile: { ...article.author, following: true }
				})
			);
		}),
		rest.delete(`https://conduit.productionready.io/api/profiles/${article.author.username}/follow`, (_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					profile: { ...article.author, following: false }
				})
			);
		}),
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

	test('should follow user correctly', async () => {
		render(<ArticleMeta article={article} />);
		fireEvent.click(screen.getByRole('button', { name: `Follow ${article.author.username}` }));

		await screen.findByRole('button', { name: `Unfollow ${article.author.username}` });

		expect(screen.getByRole('button', { name: `Unfollow ${article.author.username}` })).toHaveClass('btn-secondary');
	});

	test('should unfollow user correctly', async () => {
		render(<ArticleMeta article={{ ...article, author: { ...article.author, following: true }}} />);
		fireEvent.click(screen.getByRole('button', { name: `Unfollow ${article.author.username}` }));

		await screen.findByRole('button', { name: `Follow ${article.author.username}` });

		expect(screen.getByRole('button', { name: `Follow ${article.author.username}` })).toHaveClass('btn-outline-secondary');
	});

	test('should update article details when favorited', async () => {
		render(<ArticleMeta article={article} />);
		fireEvent.click(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount})` }));

		await screen.findByRole('button', { name: `Favorite Article (${article.favoritesCount + 1})` });

		expect(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount + 1})` })).toHaveClass(
			'btn-primary'
		);
	});

	test('should update article details when unfavorited', async () => {
		render(<ArticleMeta article={{ ...article, favorited: true }} />);
		fireEvent.click(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount})` }));

		await screen.findByRole('button', { name: `Favorite Article (${article.favoritesCount - 1})` });

		expect(screen.getByRole('button', { name: `Favorite Article (${article.favoritesCount - 1})` })).toHaveClass(
			'btn-outline-primary'
		);
	});
});

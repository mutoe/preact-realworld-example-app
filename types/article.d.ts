interface ArticleCore {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}

interface Article extends ArticleCore {
	slug: string;
	createdAt: string;
	updatedAt: string;
	author: Profile;
	favorited: boolean;
	favoritesCount: number;
}

interface ResponseError {
	[field: string]: string[];
}

interface Response {
	errors: ResponseError;
}

interface UserResponse {
	user: User;
}

interface TagsResponse {
	tags: string[];
}

interface ProfileResponse {
	profile: Profile;
}

interface ArticleResponse {
	article: Article;
}

interface ArticlesResponse {
	articles: Article[];
	articlesCount: number;
}

interface CommentResponse {
	comment: ArticleComment;
}

interface CommentsResponse {
	comments: ArticleComment[];
}

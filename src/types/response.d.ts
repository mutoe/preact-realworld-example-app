interface ResponseError {
  [field: string]: string[];
}

interface Response {
  errors: ResponseError;
}

interface AuthResponse {
  user: UserWithToken;
}

interface TagsResponse {
  tags: string[];
}

interface ProfileResponse {
  profile: User;
}

interface ArticleResponse {
  article: Article;
}

interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

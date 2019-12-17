interface ResponseError {
  [field: string]: string[];
}

interface Response {
  errors: ResponseError;
}

interface AuthResponse {
  user: UserWithToken;
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

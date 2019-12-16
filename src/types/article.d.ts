interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tagList: string[];
  description: string;
  author: User;
  favorited: boolean;
  favoritesCount: number;
}

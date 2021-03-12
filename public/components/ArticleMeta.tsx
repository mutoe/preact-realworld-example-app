import { dateFilter } from '../utils/filters';
import { DEFAULT_AVATAR } from '../store/constants';
import { deleteFavoriteArticle, deleteFollowProfile, postFavoriteArticle, postFollowProfile } from '../services';

interface ArticleMetaProps {
    article: Article;
    setArticle: (article: Article) => void;
}

export default function ArticleMeta(props: ArticleMetaProps) {
    const { article, setArticle } = props;

    const onFollowProfile = async () => {
        if (article.author.following) {
            setArticle({ ...article, author: await deleteFollowProfile(article.author.username) });
        } else {
            setArticle({ ...article, author: await postFollowProfile(article.author.username) });
        }
    };

    const onFavoriteArticle = async () => {
        if (article.favorited) {
            setArticle(await deleteFavoriteArticle(article.slug));
        } else {
            setArticle(await postFavoriteArticle(article.slug));
        }
    };

    return (
        <div class="article-meta">
            <a href={`/@${article.author.username}`}>
                <img src={article.author.image || DEFAULT_AVATAR} />
            </a>
            <div class="info">
                <a href={`/@${article.author.username}`} class="author">
                    {article.author.username}
                </a>
                <span class="date">{dateFilter(article.createdAt)}</span>
            </div>
            <button class={`btn btn-sm ${article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={onFollowProfile}>
                <i class="ion-plus-round" /> {article.author.following ? 'Unfollow' : 'Follow'}{' '}
                {article.author.username}
            </button>
            &nbsp;&nbsp;
            <button class={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`} onClick={onFavoriteArticle}>
                <i class="ion-heart" />
                &nbsp; Favorite Post <span class="counter">({article.favoritesCount})</span>
            </button>
        </div>
    );
}

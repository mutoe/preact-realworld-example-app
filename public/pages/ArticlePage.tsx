import { useEffect, useState } from 'preact/hooks';

import { deleteComment, getArticle, getCommentsByArticle, postComment } from '../services';
import ArticleMeta from '../components/ArticleMeta';
import ArticleCommentCard from '../components/ArticleCommentCard';
import { useRootState } from '../store';
import { DEFAULT_AVATAR } from '../store/constants';

interface ArticlePageProps {
    slug: string;
}

export default function ArticlePage(props: ArticlePageProps) {
    const { slug } = props;
    const [article, setArticle] = useState({ author: {} } as Article);
    const [comments, setComments] = useState<ArticleComment[]>([]);
    const [commentBody, setCommentBody] = useState('');
    const [{ user }] = useRootState(); 

    const onDeleteComment = async (commentId: number) => {
        await deleteComment(slug, commentId);
        setComments((prevState) => prevState.filter((c) => c.id !== commentId));
    };

    const onPostComment = async () => {
        const comment = await postComment(slug, commentBody);
        setCommentBody('');
        setComments((prevComments) => [comment, ...prevComments]);
    };

    useEffect(() => {
        (async function () {
            setArticle(await getArticle(slug));
            setComments(await getCommentsByArticle(slug));
        })();
    }, [slug]);

    return (
        <div class="article-page">
            <div class="banner">
                <div class="container">
                    <h1>{article.title}</h1>
                    <ArticleMeta article={article} setArticle={setArticle} />
                </div>
            </div>

            <div class="container page">
                <div class="row article-content">
                    <div class="col-md-12">{article.body}</div>
                </div>

                <hr />

                <div class="article-actions">
                    <ArticleMeta article={article} setArticle={setArticle} />
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-8 offset-md-2">
                        <form class="card comment-form">
                            <div class="card-block">
                                <textarea
                                    value={commentBody}
                                    class="form-control"
                                    placeholder="Write a comment..."
                                    rows={3}
                                    onInput={(e) => setCommentBody(e.currentTarget.value)}
                                />
                            </div>
                            <div class="card-footer">
                                <img src={user?.image || DEFAULT_AVATAR} class="comment-author-img" />
                                <button className="btn btn-sm btn-primary" onClick={onPostComment}>
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        {comments.map((comment) => (
                            <ArticleCommentCard key={comment.id} comment={comment} onDelete={onDeleteComment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


import render from 'preact-render-to-string'
import ArticleCommentCard from '../ArticleCommentCard'
import { h } from 'preact'

describe('# Article comment card', function () {
  it('should render correctly', function () {
    const comment: ArticleComment = {
      id: 1,
      body: 'body.',
      createdAt: '2009-02-19T00:00:00.000Z',
      updatedAt: '2008-05-19T00:00:00.000Z',
      author: {
        username: 'Shirley Davis',
        bio: 'bio.',
        image: 'http://dummyimage.com/336x280',
        following: true,
      },
    }
    const output = render(<ArticleCommentCard comment={comment} />)

    expect(output).toMatchSnapshot()
  })
})

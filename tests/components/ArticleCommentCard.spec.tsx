import { h } from 'preact'
import render from 'preact-render-to-string'
import { shallow } from 'enzyme'

import ArticleCommentCard from '../../src/components/ArticleCommentCard'
import { generateProfile, generateComments } from '../utils/test-utils'
import { useRootState } from '../../src/store'

jest.mock('../../src/store')

const useRootStateMock = useRootState as jest.Mock

const loggedUser = generateProfile()

beforeEach(() => {
  useRootStateMock.mockReturnValue([{ user: loggedUser }, jest.fn()])
})

afterEach(jest.clearAllMocks)

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

  it('should not display trash icon in other\'s comment', async function () {
    const comment = generateComments()
    const wrapper = shallow(<ArticleCommentCard comment={comment} />)

    expect(wrapper.find('i.ion-trash-a')).toHaveLength(0)
  })

  it('should trigger onDelete when trash icon clicked', function () {
    const onDelete = jest.fn()
    const comment = generateComments()
    comment.author = loggedUser
    const wrapper = shallow(<ArticleCommentCard onDelete={onDelete} comment={comment} />)

    wrapper.find('i.ion-trash-a').simulate('click')

    expect(onDelete).toBeCalledWith(comment.id)
  })
})

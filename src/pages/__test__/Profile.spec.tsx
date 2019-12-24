import { generateAuthor } from '../../utils/test-utils'
import { shallow } from 'enzyme'
import Profile from '../Profile'
import { h } from 'preact'
import { deleteFollowProfile, getProfile, postFollowProfile } from '../../services'

jest.mock('../../services')

const getProfileMock = getProfile as jest.Mock<Promise<Profile>>

beforeEach(() => {
  getProfileMock.mockResolvedValue({} as Profile)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Profile Page', function () {
  it('should display correct username', function () {
    const author = generateAuthor()
    const wrapper = shallow(<Profile username={`@${author.username}`} />)

    expect(wrapper.find('.user-info h4').text()).toBe(author.username)
    expect(wrapper.find('.user-info button').text()).toContain(`Follow ${author.username}`)
  })

  it('should be request profile when page loaded', async function () {
    const author = generateAuthor()
    shallow(<Profile username={`@${author.username}`} />)
    await new Promise(r => setImmediate(r))

    expect(getProfile).toBeCalledTimes(1)
    expect(getProfile).toBeCalledWith(author.username)
  })

  it('should display user profile correctly', async function () {
    const author = generateAuthor()
    getProfileMock.mockResolvedValue(author)

    const wrapper = shallow(<Profile username={`@${author.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info p').text()).toBe(author.bio)
    expect(wrapper.find('.user-info .user-img').prop('src')).toBe(author.image)
  })

})

describe('# Follow user', () => {
  it('should display Follow when user is not following', async function () {
    const user = generateAuthor()
    user.following = false
    getProfileMock.mockResolvedValue(user)
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info button').text()).toContain('Follow')
  })

  it('should display Unfollow when user is following', async function () {
    const user = generateAuthor()
    user.following = true
    getProfileMock.mockResolvedValue(user)
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info button').text()).toContain('Unfollow')
  })

  it('should send follow request when Follow button clicked', async function () {
    const user = generateAuthor()
    getProfileMock.mockResolvedValue({ ...user, following: false })
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))

    const postFollowProfileMock = postFollowProfile as jest.Mock<Promise<Profile>>
    postFollowProfileMock.mockImplementation()
    wrapper.find('.user-info button').simulate('click')

    expect(postFollowProfileMock).toBeCalledTimes(1)
  })

  it('should send unfollow request when Unfollow button clicked', async function () {
    const user = generateAuthor()
    getProfileMock.mockResolvedValue({ ...user, following: true })
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))

    const deleteFollowProfileMock = deleteFollowProfile as jest.Mock<Promise<Profile>>
    deleteFollowProfileMock.mockImplementation()
    wrapper.find('.user-info button').simulate('click')

    expect(deleteFollowProfileMock).toBeCalledTimes(1)
  })
})

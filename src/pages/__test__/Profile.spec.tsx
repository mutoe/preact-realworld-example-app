import { generateAuthor } from '../../utils/test-utils'
import { shallow } from 'enzyme'
import Profile from '../Profile'
import { h } from 'preact'
import { getProfile } from '../../services'

jest.mock('../../services')

const getProfileMock = getProfile as jest.Mock<Promise<User>>

beforeEach(() => {
  (getProfile as jest.Mock).mockResolvedValue({})
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

  it('should trigger fetch method when component did mount', function () {
    jest.spyOn(Profile.prototype, 'fetchProfile')
    const author = generateAuthor()
    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)

    expect(wrapper.instance().fetchProfile).toBeCalledTimes(1)
  })

  it('should be request profile when fetchProfile called', async function () {
    const author = generateAuthor()
    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)
    await wrapper.instance().fetchProfile()

    expect(getProfile).toBeCalledWith(author.username)
  })

  it('should display user profile correctly', async function () {
    const author = generateAuthor();
    getProfileMock.mockResolvedValue(author)

    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info p').text()).toBe(author.bio)
    expect(wrapper.find('.user-info .user-img').prop('src')).toBe(author.image)
  })

})

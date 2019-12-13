import { generateAuthor } from '../../utils/test-utils'
import { shallow } from 'enzyme'
import Profile from '../Profile'
import { h } from 'preact'

describe('# Profile Page', function () {
  it('should display correct username', function () {
    const author = generateAuthor()
    const wrapper = shallow(<Profile username={`@${author.username}`} />)

    expect(wrapper.find('.user-info h4').text()).toBe(author.username)
    expect(wrapper.find('.user-info button').text()).toContain(`Follow ${author.username}`)
  })
})

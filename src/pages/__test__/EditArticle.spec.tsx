import { mount, ReactWrapper, shallow } from 'enzyme'
import EditArticle from '../EditArticle'
import { h } from 'preact'
import FetchRequest from '../../utils/request'
import { postArticle } from '../../services'

jest.mock('../../services')

const postArticleMock = postArticle as jest.Mock<Promise<Article>>

const titleInputSelector = '[placeholder="Article Title"]'
const descriptionInputSelector = '[placeholder^="What\'s this article"]'
const bodyInputSelector = '[placeholder^="Write your article"]'

const setInputValue = (wrapper: ReactWrapper<any>, selector: string, value: string) => {
  wrapper.find(selector).getDOMNode<HTMLInputElement>().value = value
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Form validate', function () {
  it('should set button disabled when title, description or body is empty', function () {
    jest.spyOn(FetchRequest.prototype, 'post').mockImplementation()
    const wrapper = shallow(<EditArticle />)

    const submitButton = wrapper.find('form button')
    expect(submitButton.prop('disabled')).toBe(true)
  })

  it('should send request when title, description and body are filled', function () {
    const wrapper = mount(<EditArticle />)
    setInputValue(wrapper, titleInputSelector, 'title')
    setInputValue(wrapper, descriptionInputSelector, 'description')
    setInputValue(wrapper, bodyInputSelector, 'body')

    wrapper.find('form').simulate('submit')

    expect(postArticle).toBeCalled()
  })
})

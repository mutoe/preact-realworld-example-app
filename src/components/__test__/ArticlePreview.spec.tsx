import { generateArticles } from '../../utils/test-utils'
import ArticlePreview from '../ArticlePreview'
import { shallow } from 'enzyme'
import { h } from 'preact'

describe('# Article Preview Component', () => {
  it('should display article title and description correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)

    expect(wrapper.text()).toContain(article.title)
    expect(wrapper.text()).toContain(article.description)
  })

  it('can jump to article detail page when article info clicked', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)

    expect(wrapper.find(`.preview-link`).prop(`href`)).toBe(`/article/${article.slug}`)
  })

  it('should display article meta info correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)
    const userWrapper = wrapper.find('.article-meta')

    expect(userWrapper.find("img").prop('src')).toBe(article.author.image)
    expect(userWrapper.find(".author").text()).toBe(article.author.username)
    expect(userWrapper.find(".date").text()).toBe(new Date(article.createdAt).toDateString())
  })
})

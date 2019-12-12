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
})

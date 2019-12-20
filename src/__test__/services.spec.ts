import FetchRequest from '../utils/request'
import { postArticle } from '../services'

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Service', function () {
  test('## create article', async function () {
    const form = {
      title: 'title',
      description: 'description',
      body: 'body',
      tagList: [ 'dragons', 'training' ],
    }
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ article: form })
    const article = await postArticle(form)

    expect(article).toMatchObject(form)
  })
})

import mockjs, { Random } from 'mockjs'
import { ReactWrapper } from 'enzyme'

export function generateAuthor(): User {
  return mockjs.mock({
    username: Random.name(),
    bio: Random.sentence(),
    image: Random.image(),
    following: Random.boolean(),
  })
}

export function generateArticles(): Article
export function generateArticles(count: number): Article[]
export function generateArticles(count = 1): Article | Article[] {
  const title = Random.title()
  const slug = `${title.replace(/[ -]/g, '-')}-${Number(new Date()).toString(36)}`
  return mockjs.mock({
    [`articles|${count}`]: [
      {
        title,
        slug,
        body: Random.paragraph(),
        createdAt: new Date(Random.date()).toISOString(),
        updatedAt: new Date(Random.date()).toISOString(),
        'tagList|3': [ () => Random.word() ],
        description: Random.sentence(),
        author: () => generateAuthor(),
        favorited: Random.boolean(),
        'favoritesCount|0-200': 0,
      },
    ],
  }).articles
}

export const setInputValue = (wrapper: ReactWrapper<any>, selector: string, value: string) => {
  wrapper.find(selector).getDOMNode<HTMLInputElement>().value = value
  wrapper.find(selector).simulate('input')
}

export const getInputValue = (wrapper: ReactWrapper<any>, selector: string): string => {
  return wrapper.find(selector).getDOMNode<HTMLInputElement>().value
}

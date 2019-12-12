import mockjs, { Random } from 'mockjs'

export function generateAuthor() {
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
        createdAt: new Date(Random.date()),
        updatedAt: new Date(Random.date()),
        'tagList|3': [ () => Random.word() ],
        description: Random.sentence(),
        author: () => generateAuthor(),
        favorited: Random.boolean(),
        'favoritesCount|0-200': 0,
      },
    ],
  }).articles
}


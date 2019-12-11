import mockjs, { Random } from 'mockjs'

export function generateAuthor() {
  return mockjs.mock({
    username: Random.name(),
    bio: Random.sentence(),
    image: Random.image(),
    following: Random.boolean(),
  })
}

export function generateArticles(count: number) {
  return mockjs.mock({
    [`articles|${count}`]: [
      {
        title: Random.title(),
        slug: '@/title',
        body: Random.paragraph(),
        createdAt: Random.date(),
        updatedAt: Random.date(),
        'tagList|3': [ Random.word() ],
        description: Random.sentence(),
        author: () => generateAuthor(),
        favorited: Random.boolean(),
        'favoritesCount|0-200': 0,
      },
    ],
  }).articles
}


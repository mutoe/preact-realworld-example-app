import mockjs, { Random } from 'mockjs'

export function generateAuthor() {
  return mockjs.mock({
    username: Random.name(),
    bio: 'man',
    image: Random.image(),
    following: Random.boolean(),
  })
}

export function generateArticles(count: number) {
  return mockjs.mock({
    [`feeds|${count}`]: [
      {
        title: Random.title(),
        slug: '123',
        body: Random.paragraph(),
        createdAt: Random.date(),
        updatedAt: Random.date(),
        'tagList | 3': [ Random.word() ],
        description: Random.sentence(),
        author: () => generateAuthor(),
        favorited: Random.boolean(),
        favoritesCount: Random.range(0, 200),
      },
    ],
  }).feeds
}


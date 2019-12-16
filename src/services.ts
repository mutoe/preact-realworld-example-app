import Axios from 'axios'

const limit = 10

const axios = Axios.create({
  baseURL: `${process.env.API_HOST}/api`,
})

axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  return Promise.reject(err.response.data)
})

export interface PostLoginForm {
  email: string;
  password: string;
}

export async function postLogin(form: PostLoginForm) {
  return axios.post('/users/login', { user: form })
}

interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export async function postRegister(form: PostRegisterForm) {
  return axios.post('/users', { user: form })
}

export async function getAllTags() {
  return axios.get<{ tags: string[] }>('/tags').then(res => res.data.tags)
}

export async function getArticles(page = 1) {
  const params = { limit, offset: (page - 1) * limit }
  return axios.get<ArticleResponse>('/articles', { params })
    .then(res => res.data)
}

export async function getArticlesByTag(tagName: string, page = 1) {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return axios.get<ArticleResponse>('/articles', { params })
    .then(res => res.data)
}

export async function getProfile(username: string) {
  return axios.get<ProfileResponse>(`/profiles/${username}`).then(res => res.data.profile)
}

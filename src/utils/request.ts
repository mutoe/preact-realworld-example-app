import { route } from 'preact-router'

interface FetchRequestOptions {
  prefix: string;
  headers: Record<string, string>;
  params: Record<string, any>;
}

export class FetchResponseError extends Error {
  response: Response

  constructor(message: string, response: Response) {
    super()
    this.message = message
    this.response = response
  }
}

export default class FetchRequest {
  defaultOptions: FetchRequestOptions = {
    prefix: '',
    headers: {},
    params: {},
  }
  options: FetchRequestOptions

  constructor(options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  private checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    if (response.status === 401) {
      route('/login')
    }
    throw new FetchResponseError(response.statusText, response)
  }

  private generateFinalUrl = (url: string, options: Partial<FetchRequestOptions> = {}) => {
    const prefix = options.prefix || this.options.prefix || ''
    const params = options.params || {}

    let finalUrl = `${prefix}${url}`
    if (Object.keys(params).length) {
      const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
      finalUrl += `?${queryString}`
    }

    return finalUrl
  }

  get<T = any>(url: string, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)
    return fetch(finalUrl, {
      method: 'GET',
      headers: this.options.headers,
    })
      .then(this.checkStatus)
      .then(res => res.json())
  }

  post<T = any>(url: string, data: Record<string, any> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.options.headers,
    })
      .then(this.checkStatus)
      .then(res => res.json())
  }

  delete<T = any>(url: string, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const finalUrl = this.generateFinalUrl(url, options)

    return fetch(finalUrl, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this.checkStatus)
      .then(res => res.json())
  }
}

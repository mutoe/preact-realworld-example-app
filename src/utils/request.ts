interface FetchRequestOptions {
  prefix: string;
  headers: Record<string, string>;
}

interface FetchRequestPostOptions extends FetchRequestOptions {
  querys: Record<string, string>;
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
  }
  options: FetchRequestOptions

  constructor(options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  private checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      throw new FetchResponseError(response.statusText, response)
    }
  }

  get<T = any>(url: string, querys: Record<string, string | number> = {}, options: Partial<FetchRequestOptions> = {}): Promise<T> {
    const prefix = options.prefix || this.options.prefix || ''
    let finalUrl = `${prefix}${url}`
    if (Object.keys(querys).length) {
      const queryString = Object.keys(querys).map(key => `${key}=${querys[key]}`).join('&')
      finalUrl += `?${queryString}`
    }
    return fetch(finalUrl, {
      method: 'GET',
      headers: this.defaultOptions.headers,
    })
      .then(this.checkStatus)
      .then(res => res.json())
  }

  post<T = any>(url: string, data: Record<string, string> = {}, options: Partial<FetchRequestPostOptions> = {}): Promise<T> {
    const prefix = options.prefix || this.options.prefix || ''
    const querys = options.querys || {}

    let finalUrl = `${prefix}${url}`
    if (Object.keys(querys).length) {
      const queryString = Object.keys(querys).map(key => `${key}=${querys[key]}`).join('&')
      finalUrl += `?${queryString}`
    }

    return fetch(finalUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(this.checkStatus)
      .then(res => res.json())
  }
}

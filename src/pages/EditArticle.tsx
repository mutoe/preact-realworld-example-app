import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getArticle, postArticle, putArticle } from '../services'
import { route } from 'preact-router'

interface EditArticleProps {
  slug?: string;
}

interface FormState {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const EditArticle: FunctionalComponent<EditArticleProps> = (props) => {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    body: '',
    tagList: [],
  })

  async function onSubmit (e: Event) {
    e.preventDefault()

    let article: Article
    if (props.slug) {
      article = await putArticle(props.slug, form)
    } else {
      article = await postArticle(form)
    }
    route(`/article/${article.slug}`)
  }

  async function fetchArticle (slug: string) {
    const article = await getArticle(slug)
    setForm({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    })
  }

  useEffect(() => {
    if (props.slug) fetchArticle(props.slug)
  }, [])

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input value={form.title}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onInput={e => setForm(prev => ({ ...prev, title: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={form.description}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onInput={e => setForm(prev => ({ ...prev, description: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea value={form.body} className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    onInput={e => setForm(prev => ({ ...prev, body: e.currentTarget.value }))} />
                </fieldset>
                <fieldset className="form-group">
                  <input value={form.tagList.join(' ')}
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onInput={e => setForm(prev => ({ ...prev, tagList: e.currentTarget.value.split(' ') }))} />
                  <div className="tag-list" />
                </fieldset>
                <button disabled={!(form.title && form.description && form.body)}
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
export default EditArticle

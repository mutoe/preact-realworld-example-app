import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { getArticle, postArticle, putArticle } from '../services';

interface EditorProps {
	slug?: string;
}

interface FormState {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}

export default function Editor(props: EditorProps) {
	const [form, setForm] = useState<FormState>({
		title: '',
		description: '',
		body: '',
		tagList: []
	});

	async function onSubmit(e: Event) {
		e.preventDefault();

		let article: Article;
		if (props.slug) {
			article = await putArticle(props.slug, form);
		} else {
			article = await postArticle(form);
		}
		route(`/article/${article.slug}`);
	}

	async function fetchArticle(slug: string) {
		const article = await getArticle(slug);
		setForm({
			title: article.title,
			description: article.description,
			body: article.body,
			tagList: article.tagList
		});
	}

	useEffect(() => {
		if (props.slug) fetchArticle(props.slug);
	}, [props.slug]);

	return (
		<div class="editor-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-10 offset-md-1 col-xs-12">
						<form onSubmit={onSubmit}>
							<fieldset>
								<fieldset class="form-group">
									<input
										value={form.title}
										type="text"
										class="form-control form-control-lg"
										placeholder="Article Title"
										onInput={e => setForm(prev => ({ ...prev, title: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										value={form.description}
										type="text"
										class="form-control"
										placeholder="What's this article about?"
										onInput={e => setForm(prev => ({ ...prev, description: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<textarea
										value={form.body}
										class="form-control"
										rows={8}
										placeholder="Write your article (in markdown)"
										onInput={e => setForm(prev => ({ ...prev, body: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										value={form.tagList.join(' ')}
										type="text"
										class="form-control"
										placeholder="Enter tags"
										onInput={e => setForm(prev => ({ ...prev, tagList: e.currentTarget.value.split(' ') }))}
									/>
									<div class="tag-list" />
								</fieldset>
								<button
									disabled={!(form.title && form.description && form.body)}
									class="btn btn-lg pull-xs-right btn-primary"
									type="submit"
								>
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import { LoadingIndicator } from '../components/LoadingIndicator';
import { apiCreateArticle, apiGetArticle, apiUpdateArticle } from '../services/api/article';

interface EditorProps {
	params: {
		slug?: string;
	};
}

interface FormState {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}

export default function EditorPage(props: EditorProps) {
	const location = useLocation();
	const [form, setForm] = useState<FormState>({
		title: '',
		description: '',
		body: '',
		tagList: []
	});
	const [inProgress, setInProgress] = useState(false);

	async function onSubmit(e: Event) {
		e.preventDefault();

		setInProgress(true);
		const article = props.params.slug ? await apiUpdateArticle(props.params.slug, form) : await apiCreateArticle(form);
		location.route(`/article/${article.slug}`);
	}

	useEffect(() => {
		if (props.params.slug) {
			(async function (slug: string) {
				const article = await apiGetArticle(slug);
				setForm({
					title: article.title,
					description: article.description,
					body: article.body,
					tagList: article.tagList
				});
			})(props.params.slug);
		} else {
			// Needed in case user switches from editing to creating a new
			// -- state initializer will not fire again as it's the same component
			setForm({ title: '', description: '', body: '', tagList: [] });
		}
	}, [props.params.slug]);

	return (
		<div class="editor-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-10 offset-md-1 col-xs-12">
						<form onSubmit={onSubmit}>
							<fieldset>
								<fieldset class="form-group">
									<input
										class="form-control form-control-lg"
										type="text"
										placeholder="Article Title"
										value={form.title}
										onInput={e => setForm(prev => ({ ...prev, title: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control"
										type="text"
										placeholder="What's this article about?"
										value={form.description}
										onInput={e => setForm(prev => ({ ...prev, description: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<textarea
										class="form-control"
										type="test"
										placeholder="Write your article (in markdown)"
										rows={8}
										value={form.body}
										onInput={e => setForm(prev => ({ ...prev, body: e.currentTarget.value }))}
									/>
								</fieldset>
								<fieldset class="form-group">
									<input
										class="form-control"
										type="text"
										placeholder="Enter tags"
										value={form.tagList.join(' ')}
										onInput={e => setForm(prev => ({ ...prev, tagList: e.currentTarget.value.split(' ') }))}
									/>
									<div class="tag-list" />
								</fieldset>
								<button
									class="btn btn-lg pull-xs-right btn-primary"
									disabled={!(form.title && form.description && form.body)}
								>
									Publish Article
									<LoadingIndicator show={inProgress} style={{ marginLeft: '0.5rem' }} strokeColor="#fff" width="1em" />
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

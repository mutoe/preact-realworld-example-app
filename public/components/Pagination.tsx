import { articlePageLimit } from '../services/api/article';

interface PaginationProps {
	/** total items count */
	count: number;
	page: number;
	setPage: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
	const pagesCount = Math.ceil(props.count / articlePageLimit);
	const countArray = new Array(pagesCount).fill('');
	const isActive = (index: number) => (props.page === index + 1 ? 'active' : '');

	return (
		<ul class="pagination">
			{countArray.map((_, index) => (
				<li key={index} class={`page-item ${isActive(index)}`}>
					<a onClick={() => props.setPage(index + 1)} class="page-link">
						{index + 1}
					</a>
				</li>
			))}
		</ul>
	);
}

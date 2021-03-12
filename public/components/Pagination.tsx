import { limit } from '../services';

interface PaginationProps {
    /** total items count */
    count: number;
    page: number;
    setPage: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
    return (
        <ul class="pagination">
            {new Array(Math.ceil(props.count / limit)).fill('').map((_, index) => (
                <li key={index} class={`page-item ${props.page === index + 1 ? 'active' : ''}`}>
                    <a onClick={() => props.setPage(index + 1)} class="page-link">
                        {index + 1}
                    </a>
                </li>
            ))}
        </ul>
    );
}

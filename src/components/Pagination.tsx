import { FunctionalComponent, h } from 'preact'
import { limit } from '../services'

interface PaginationProps {
  /** total items count */
  count: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: FunctionalComponent<PaginationProps> = (props) => {
  const pagesCount = Math.ceil(props.count / limit)
  const countArray = new Array(pagesCount).fill('')
  const isActive = (index: number) => props.page === index + 1 ? 'active' : ''

  return (
    <ul className="pagination">
      {countArray.map((_, index) => (
        <li key={index} className={`page-item ${isActive(index)}`}>
          <a onClick={() => props.setPage(index + 1)} className="page-link">{index + 1}</a>
        </li>
      ))}
    </ul>
  )
}

export default Pagination

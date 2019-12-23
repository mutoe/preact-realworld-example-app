import { h } from 'preact'
import { limit } from '../services'

interface PaginationProps {
  /** total items count */
  count: number;
  currentPage: number;
}

export default function Pagination(props: PaginationProps) {
  const pagesCount = Math.ceil(props.count / limit)
  const countArray = new Array(pagesCount).fill('')
  const isActive = (index: number) => props.currentPage === index + 1 ? 'active' : ''

  return (
    <ul className="pagination">
      {countArray.map((_, index) => (
        <li key={index} className={`page-item ${isActive(index)}`}>
          <a href="" className="page-link">{index + 1}</a>
        </li>
      ))}
    </ul>
  )
}

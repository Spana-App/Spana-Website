import { Link } from "react-router-dom"
import "./Breadcrumbs.css"

/**
 * @param {{ items: Array<{ label: string; path?: string | null }> }} props
 * - items: Array of { label, path }. If path is null/undefined, renders as current page (no link).
 */
const Breadcrumbs = ({ items }) => {
  if (!items?.length) return null

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isLink = Boolean(item.path) && !isLast

          return (
            <li key={index} className="breadcrumbs-item">
              {isLink ? (
                <Link to={item.path} className="breadcrumbs-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs-current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumbs-separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

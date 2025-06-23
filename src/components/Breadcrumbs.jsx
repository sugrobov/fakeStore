import { Link } from "react-router-dom"

function Breadcrumbs({ currentPage }) {
  return (
        <div className="mb-6 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
          Главная
        </Link>
        <span>/</span>
        <span className="text-gray-500">{currentPage}</span>
      </div>
    </div>
  )
}

export default Breadcrumbs
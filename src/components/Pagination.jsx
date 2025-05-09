export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded border hover:cursor-pointer ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            &gt;
          </button>
        </nav>
      </div>
    )
  }
export default function BurgerButton({ onClick, isOpen }) {
    return (
      <button
        onClick={onClick}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col items-end">
          <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'}`}></span>
          <span className={`block h-0.5 w-4 bg-current transition-all duration-300 ease-in-out mt-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'}`}></span>
        </div>
      </button>
    )
  }
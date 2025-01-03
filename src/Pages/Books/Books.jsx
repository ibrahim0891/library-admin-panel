import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"



const Books = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalBooks, setTotalBooks] = useState(0)
    const limit = 20 // Items per page

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/books?page=${currentPage}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.books)
                setTotalPages(data.totalPages)
                setTotalBooks(data.totalBooks)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo(0, 0)
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="container min-h-screen p-8 mx-auto relative">
            <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Book Shelf</h1>

            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error.message}</p>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {books && books.map(book => (
                    <div key={book.id} className="bg-white p-4 rounded shadow">
                        <img src={book.image || 'https://placehold.co/400x300'} alt={book.title} className="w-full h-40 object-cover rounded mb-3" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
                        <Link 
                            to={`/books/${book._id}/details`}
                            className="block text-sm text-blue-600 hover:underline"
                            onClick={() => setSidebarOpen(true)}
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}
            
            <p className="text-center text-gray-600 mt-4">
                Showing page {currentPage} of {totalPages} ({totalBooks} total books)
            </p>

            <div 
                className={`fixed inset-0 ${sidebarOpen ? 'visible bg-black bg-opacity-50' : 'invisible'}`} 
                onClick={() => setSidebarOpen(false)}
            >
                <div 
                    className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="p-6 overflow-y-auto h-full">
                        <Outlet />
                    </div>
                </div>
            </div>        
            </div>        
    )
}
export default Books; 
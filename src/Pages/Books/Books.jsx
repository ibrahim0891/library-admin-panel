import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const Books = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => {
                console.log();
                setBooks(data.books)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [])
    return (
        <div className="container p-8 mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-800">Books</h1>
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="p-4 text-red-500 bg-red-100 rounded">Error: {error.message}</p>}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {books && books.map(book => (
                    <div key={book.id} className="transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                        <div className="p-6">
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">{book.title}</h3>
                            <p className="mb-4 text-gray-600">Author: {book.author}</p>
                            <Link 
                                to={`/book/${book._id}/details`}
                                className="inline-block px-4 py-2 text-gray-900 border transition-colors duration-200   rounded  "
                            >
                                View details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Books; 
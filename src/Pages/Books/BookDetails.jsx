
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";



const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/book/details/?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
             
            {loading && <p className="p-6 text-lg text-gray-600">Loading...</p>}
            {error && <p className="p-6 text-lg text-red-600">Error: {error.message}</p>}
            
            {book && (
                <div className="max-w-7xl p-4 mx-auto md:p-0 lg:p-8">
                    <div className=" flex flex-col md:flex-row gap-4 md:gap-8"> 
                        {/* Book Cover Section */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <img 
                                src={book.coverImage || 'https://via.placeholder.com/400x600?text=No+Cover+Available'} 
                                alt={`Cover of ${book.title}`}
                                className="w-full max-w-md rounded-lg shadow-lg object-cover"
                            />
                            <div className="mt-6 w-full max-w-md">
                                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                                    <div className="text-center flex-1">
                                        <p className="text-sm text-gray-500">Rating</p>
                                        <p className="text-xl font-semibold text-gray-800">{book.rating.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center flex-1 border-l border-gray-200">
                                        <p className="text-sm text-gray-500">Available</p>
                                        <p className="text-xl font-semibold text-gray-800">{book.availableCopies}/{book.totalCopies}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Details Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 ">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{book.title}</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex border-b border-gray-100 py-3">
                                    <span className="w-1/3 text-gray-600">Author</span>
                                    <span className="w-2/3 font-medium text-gray-900">{book.author}</span>
                                </div>
                                <div className="flex border-b border-gray-100 py-3">
                                    <span className="w-1/3 text-gray-600">Genre</span>
                                    <span className="w-2/3 font-medium text-gray-900">{book.genre.join(', ')}</span>
                                </div>
                                <div className="flex border-b border-gray-100 py-3">
                                    <span className="w-1/3 text-gray-600">ISBN</span>
                                    <span className="w-2/3 font-medium text-gray-900">{book.ISBN}</span>
                                </div>
                                <div className="flex border-b border-gray-100 py-3">
                                    <span className="w-1/3 text-gray-600">Language</span>
                                    <span className="w-2/3 font-medium text-gray-900">{book.language}</span>
                                </div>
                                <div className="flex border-b border-gray-100 py-3">
                                    <span className="w-1/3 text-gray-600">Published</span>
                                    <span className="w-2/3 font-medium text-gray-900">{book.publicationYear}</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Status</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 mb-2">Borrowed By</span>
                                        <div className="flex flex-wrap gap-2">
                                            {book.borrowedBy?.map((member, index) => (
                                                <Link 
                                                    key={member.id} 
                                                    to={`/member/${member._id}/details`}
                                                    className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                                                >
                                                    {member.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 mb-2">Reserved By</span>
                                        <div className="flex flex-wrap gap-2">
                                            {book.reserverList?.map((member, index) => (
                                                <Link 
                                                    key={member.userID._id} 
                                                    to={`/member/${member.userID._id}/details`}
                                                    className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                                                >
                                                    {member.userID.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Summary</h3>
                                <p className="text-gray-700 leading-relaxed">{book.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookDetails; 

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
        <div>
            <h1 className="p-6 text-3xl font-bold">Book Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            
            {book && (
                <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-4xl font-bold text-gray-800">{book.title}</h2>

                    <div className="mb-8">
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700 w-1/4">Author</td>
                                    <td className="py-3 text-gray-600">{book.author}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Genre</td>
                                    <td className="py-3 text-gray-600">{book.genre.join(', ')}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">ISBN</td>
                                    <td className="py-3 text-gray-600">{book.ISBN}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Language</td>
                                    <td className="py-3 text-gray-600">{book.language}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Publication Year</td>
                                    <td className="py-3 text-gray-600">{book.publicationYear}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Rating</td>
                                    <td className="py-3 text-gray-600">{book.rating.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 text-2xl font-semibold text-gray-800">Availability</h3>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Total Copies</td>
                                    <td className="py-3 text-gray-600">{book.totalCopies}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Available Copies</td>
                                    <td className="py-3 text-gray-600">{book.availableCopies}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Borrowed By</td>
                                    <td className="py-3 text-gray-600">
                                        {book.borrowedBy?.map((member, index) => (
                                            <Link 
                                                key={member.id} 
                                                to={`/member/${member._id}/details`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {member.name}{index < book.borrowedBy.length - 1 ? ', ' : ''}
                                            </Link>
                                        ))}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-semibold text-gray-700">Reserved By</td>
                                    <td className="py-3 text-gray-600">
                                        {book.reserverList?.map((member, index) => (
                                            <Link 
                                                key={member._id} 
                                                to={`/member/${member._id}/details`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {member.name}{index < book.reserverList.length - 1 ? ', ' : ''}
                                            </Link>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 text-2xl font-semibold text-gray-800">Summary</h3>
                        <p className="text-gray-600 leading-relaxed">{book.summary}</p>
                    </div>

                     
                </div>
            )}
        </div>
    )
}

export default BookDetails; 
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Member = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [dummyState , setDummyState] = useState(null)

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/user/?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setMember(data);
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [dummyState]);
    
    const issueBook = (bookId) => {
        const uid = localStorage.getItem('uid');
        // if (!uid) {
        //     alert('Please login first');
        //     return;
        // }

        fetch(`http://localhost:3000/issueBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: member._id,
                bookID: bookId,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDummyState(data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const returnBook = (bookId) => {
        const uid = localStorage.getItem('uid');
         
        fetch(`http://localhost:3000/returnBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: member._id,
                bookID: bookId,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDummyState(data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div>
            <h1 className="p-6 text-4xl font-bold">Member Details </h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {member && (
                <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800">{member.name}</h2>
                    <p className="mb-2 text-lg text-gray-700"><span className="font-semibold">Email:</span> {member.email}</p>
                    <p className="mb-4 text-lg text-gray-700"><span className="font-semibold">Phone:</span> {member.phone}</p>
                    <div className="pt-4 mt-6 border-t">
                        <h3 className="mb-3 text-xl font-semibold text-gray-800">Reserved Books</h3>
                        {member.reservedBooks.map((reservedBook, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <Link to={`/book/${reservedBook.bookID._id}/details/`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                                            {reservedBook.bookID.title}
                                        </Link>
                                        <div className="mt-2 text-sm text-gray-600">
                                            <div>Book id: {reservedBook.bookID._id}</div>
                                            <span className="mr-4">Author: {reservedBook.bookID.author}</span>
                                            <span className="mr-4">ISBN: {reservedBook.bookID.ISBN}</span>
                                            <span>Language: {reservedBook.bookID.language}</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500">
                                            {reservedBook.bookID.genre.join(', ')}
                                        </div>
                                    </div>

                                    <button onClick={() => { issueBook(reservedBook.bookID._id) }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Issue Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 mt-6 border-t">
                        <h3 className="mb-3 text-xl font-semibold text-gray-800">Borrowed books:</h3>
                        {member.borrowedBooks.map((borrowedBook, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <Link to={`/book/${borrowedBook.bookId._id}/details/`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                                            {borrowedBook.bookId.title}
                                        </Link>
                                        <div className="mt-2 text-sm text-gray-600">
                                            <div>Book id: {borrowedBook.bookId._id}</div>
                                            <span className="mr-4">Author: {borrowedBook.bookId.author}</span>
                                            <span className="mr-4">ISBN: {borrowedBook.bookId.ISBN}</span>
                                            <span>Language: {borrowedBook.bookId.language}</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500">
                                            {borrowedBook.bookId.genre.join(', ')}
                                        </div>
                                    </div>

                                    <button onClick={() => { returnBook(borrowedBook.bookId._id) }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Return Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Member
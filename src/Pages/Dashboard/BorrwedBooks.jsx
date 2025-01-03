import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BorrowedBooks() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/getBorrowedBooks');
                const data = await response.json();
                console.log(data);
                setBorrowedBooks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
                setLoading(false);
            }
        };
        fetchBorrowedBooks();
    }, []);

    return (
        <div className="p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Borrowed Books</h1>

            {loading ? (
                <p className="text-gray-600">Loading borrowed books...</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {borrowedBooks.map((book) => (
                                <tr key={book._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {book.borrowedBy.map((user, index) => (
                                            <div key={user._id}>
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                                {index < book.borrowedBy.length - 1 && <hr className="my-2" />}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{book.title}</div>
                                        <div className="text-sm text-gray-500">ISBN: {book.isbn}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Borrowed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={'/book/' + book._id + '/details'} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                                        <button className="text-red-600 hover:text-red-900">Return</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6">
                <p className="text-gray-600 text-sm">
                    Total Borrowed Books: {borrowedBooks.length}
                </p>
            </div>
        </div>
    );
}

export default BorrowedBooks;
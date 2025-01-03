import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Dashboard() {

    const [statistics, setStatistics] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:3000/statistics`)
            .then(res => res.json())
            .then(data => {
                setStatistics(data)
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    return (
        <div className="p-4">
            <h1>Dashbaord</h1>
            {statistics && <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Link to={'/members'}>
                            <div className="flex items-center">
                                <i className="fas fa-users text-3xl text-blue-500"></i>
                                <div className="ml-4">
                                    <p className="text-gray-500 text-sm">Total Users</p>
                                    <h3 className="text-2xl font-bold">{statistics.totalUsers}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <i className="fas fa-book text-3xl text-green-500"></i>
                            <div className="ml-4">
                                <p className="text-gray-500 text-sm">Total Books</p>
                                <h3 className="text-2xl font-bold">{statistics.totalBooks}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Link to={'/borrowed'}>
                            <div className="flex items-center">
                                <i className="fas fa-book-reader text-3xl text-purple-500"></i>
                                <div className="ml-4">
                                    <p className="text-gray-500 text-sm">Borrowed Books</p>
                                    <h3 className="text-2xl font-bold">{statistics.totalBorrowedBooks}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Link to={'/reservations'}>
                            <div className="flex items-center">
                                <i className="fas fa-bookmark text-3xl text-yellow-500"></i>
                                <div className="ml-4">
                                    <p className="text-gray-500 text-sm">Reserved Books</p>
                                    <h3 className="text-2xl font-bold">{statistics.totalReservedBooks}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Most Borrowed Books</h2>
                    <div className="bg-white rounded-lg shadow-md">
                        {statistics.mostBorrowedBooks?.map((book, index) => (
                            <div key={book._id} className="p-4 border-b last:border-b-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-4">{index + 1}</span>
                                        <h3 className="font-medium">{book.title}</h3>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-book-reader text-purple-500 mr-2"></i>
                                        <span>{book.borrowCount} borrows</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Copies Overview</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Total Copies</span>
                                <span className="font-bold">{statistics.totalCopies}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Available Copies</span>
                                <span className="font-bold text-green-500">{statistics.totalAvailableCopies}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Borrowed Copies</span>
                                <span className="font-bold text-purple-500">{statistics.totalBorrowedCopies}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Reserved Copies</span>
                                <span className="font-bold text-yellow-500">{statistics.totalReservedCopies}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    );
}

export default Dashboard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




function Reservation(){
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:3000/reservations');
                const data = await response.json();
                console.log(data);
                setReservations(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div className="p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reservations</h1>
            
            {loading ? (
                <p className="text-gray-600">Loading reservations...</p>
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
                            {reservations.map((reservation) => (
                                <tr key={reservation._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reservation.userID.name}</div>
                                        <div className="text-sm text-gray-500">{reservation.userID.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{reservation.bookID.title}</div>
                                        <div className="text-sm text-gray-500">ISBN: {reservation.bookID.isbn}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={'/member/'+reservation.userID._id+'/details'} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <div className="mt-6">
                <p className="text-gray-600 text-sm">
                    Total Reservations: {reservations.length}
                </p>
            </div>
        </div>
    );
}

export default Reservation;
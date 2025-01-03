import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AllMember() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/user/all")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMembers(data.users);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Members</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {members && <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved Books</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed Books</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {members && members.map(member => (
                        <tr key={member._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{member.reservedBooks?.length || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{member.borrowedBooks?.length || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link className="border p-2 rounded-md hover:bg-gray-100" to={'/member/'+member._id+'/details'}>
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>    );
}

export default AllMember;
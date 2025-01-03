import { Link, Outlet } from "react-router-dom"



const Layout = () => {
    return (
        <div className=" flex flex-col h-screen">

            {/* header */}
            <div className="flex items-center justify-between shadow-md bg-white border-b">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                </div>
                <div className="px-6">
                    <nav className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
                        <Link to="/members" className="text-gray-600 hover:text-gray-800">Members</Link>
                        <Link to="/books" className="text-gray-600 hover:text-gray-800">Books</Link>
                    </nav>
                </div>
            </div>            {/* main */}
            <div className="p-6 flex-1 overflow-auto">

                <Outlet />
            </div>

            {/* footer */}
            <div className="w-full py-8 px-6 mt-auto bg-gray-100">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-sm">© 2024 Admin Dashboard. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 text-sm hover:text-gray-800">Privacy Policy</a>
                            <a href="#" className="text-gray-600 text-sm hover:text-gray-800">Terms of Service</a>
                            <a href="#" className="text-gray-600 text-sm hover:text-gray-800">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
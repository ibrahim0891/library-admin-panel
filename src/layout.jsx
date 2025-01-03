import { Link, Outlet } from "react-router-dom"



const Layout = () => {
    return (
        <div className="">

            {/* header */}
            <div className="flex flex-col md:flex-row items-center justify-between shadow-md bg-white border-b sticky top-0 z-50 p-4 md:p-6">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 hover:text-gray-700 transition-colors">
                        Admin Dashboard
                    </h1>
                </div>
                <div className="w-full md:w-auto">
                    <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-base font-medium">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                            Dashboard
                        </Link>
                        <Link to="/members" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                            Members
                        </Link>
                        <Link to="/books" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                            Books
                        </Link>
                        <Link to={'/book/search'} className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                            search Books
                        </Link>
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
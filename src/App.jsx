import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import Books from "./Pages/Books/Books"
import BookDetails from "./Pages/Books/BookDetails"
import Member from "./Pages/Member/member"
import AllMember from "./Pages/Member/allMember"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Reservations from "./Pages/Dashboard/Reservations"
import Login from "./Pages/login"
import SearchBook from "./Pages/Dashboard/searchBook"
import BorrowedBooks from "./Pages/Dashboard/BorrwedBooks"


function App() {

    return (
        <>
            {/* Route to <Layout/> on / usign router dom  */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* <Route path="/" element={localStorage.getItem('token') ? <Layout /> : <Navigate to={'/login'} />}>  */}
                        <Route index element={<Dashboard />}></Route>
                        <Route path="/reservations" element={<Reservations />}></Route>
                        <Route path="/books" element={<Books />}>
                            <Route path=":id/details" element={<BookDetails />}></Route>
                        </Route>
                        <Route path="/book/search" element={<SearchBook />}></Route>
                        <Route path="/book/:id/details/" element={<BookDetails />}></Route>
                        <Route path="/member/:id/details/" element={<Member />}></Route>
                        <Route path="/members" element={<AllMember />}></Route>
                        <Route path="/borrowed" element={<BorrowedBooks />}></Route>
                    </Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

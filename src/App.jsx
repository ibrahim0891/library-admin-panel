import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import Books from "./Pages/Books/Books"
import BookDetails from "./Pages/Books/BookDetails"
import Member from "./Pages/Member/member"
import AllMember from "./Pages/Member/allMember"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Reservations from "./Pages/Dashboard/Reservations"
import Login from "./Pages/login"


function App() {

    return (
        <>
            {/* Route to <Layout/> on / usign router dom  */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}> 
                    {/* <Route path="/" element={localStorage.getItem('token') ? <Layout /> : <Navigate to={'/login'} />}>  */}
                        <Route index element={<Dashboard />}></Route>
                        <Route path="/reservations" element={<Reservations/>}></Route>
                        <Route path="/books" element={<Books />}></Route>
                        <Route path="/book/:id/details/" element={<BookDetails />}></Route>
                        <Route path="/member/:id/details/" element={<Member />}></Route>
                        <Route path="/members" element={<AllMember />}></Route>
                    </Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App


import { Nav } from "./Nav"
import { Login } from "../COMPONENT/Login"
import { SendRequest } from "../COMPONENT/SendRequest"
import { ViewRequests } from "../COMPONENT/ViewRequests"
import { ViewStatus } from "../COMPONENT/ViewStatus"
import { NotFound } from "../COMPONENT/NotFound"
import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from "../COMPONENT/Home"
import { Regist } from "../COMPONENT/Regist"
import { ShowRequestDetails } from "../COMPONENT/ShowRequestDetails"

/**
 * Main Routing component that defines the application structure and navigation paths.
 */
export const Routing = () => {
    return <>
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {/* Public Routes */}
                <Route path="home" element={<Home></Home>}></Route>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="register" element={<Regist></Regist>}></Route>

                {/* Student Routes */}
                <Route path="sendRequest" element={<SendRequest></SendRequest>}></Route>
                <Route path="viewStatus" element={<ViewStatus></ViewStatus>}></Route>

                {/* Admin Routes */}
                <Route path="viewRequests" element={<ViewRequests></ViewRequests>}></Route>
                <Route path="admin/request/:id" element={<ShowRequestDetails></ShowRequestDetails>}></Route>

                {/* Fallback Routes */}
                <Route path="" element={<Home></Home>}></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    </>
}
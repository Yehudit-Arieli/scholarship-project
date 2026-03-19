
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent } from "../REDUX/UsersSlice";
import { FaSignOutAlt } from 'react-icons/fa';
import '../STYLE/nav.css';

export const Nav = () => {
    const current = useSelector(state => state.user.current)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Clears user session from global state and local storage,
     * then redirects to the home page.
     */
    const handleLogout = () => {
        dispatch(setCurrent({}));
        localStorage.removeItem('user');
        navigate('/home');
    };



    return <>

        <div className="nav-page">
            <div className="nav">
                {/* User Profile & Logout Section */}
                {current && current.tz && (
                    <div className="user-info-nav">
                        <span className="user-name">{current.firstName} {current.lastName}</span>
                        <button onClick={handleLogout} className="logout-btn" title="יציאה">
                            <FaSignOutAlt />
                        </button>
                    </div>
                )}

                <NavLink to="home" className="link">דף הבית</NavLink>

                {/* Guest Links */}
                {!current?.tz && (
                    <>
                        <NavLink to="login" className="link">כניסה</NavLink>
                        <NavLink to="register" className="link">הרשמה</NavLink>
                    </>
                )}

                {/* Admin-Only Links */}
                {current && current.role === "admin" && (
                    <NavLink to="viewRequests" className="link">הצגת הבקשות</NavLink>
                )}

                {/* Student-Only Links */}
                {current && current.role === "student" && (
                    <>
                        <NavLink to="sendRequest" className="link">הגשת בקשה</NavLink>
                        <NavLink to="viewStatus" className="link">צפיה בסטטוס</NavLink>
                    </>
                )}
            </div>
        </div>
    </>
}




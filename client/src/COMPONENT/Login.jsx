import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrent } from "../REDUX/UsersSlice";
import '../STYLE/login_regist.css'
import Swal from 'sweetalert2'

export const Login = () => {
    const [loginDetails, setLoginDetails] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    // Form validation logic: Ensures all fields are filled and error-free
    const isFormValid =
        loginDetails.tz &&
        loginDetails.passWord &&
        !errors.tz &&
        !errors.passWord;

    /**
     * Authenticates the user against the server.
     * On success: Updates global state and navigates to Home.
     * On failure: Displays an error message and redirects to registration.
     */
    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', loginDetails);
            console.log("Full Server Response:", response.data);
            Swal.fire({
                title: 'ברוך הבא!',
                text: `שלום ${response.data.user.firstName}`,
                icon: 'success'
            });

            // Persist session in Redux and LocalStorage
            dispatch(setCurrent(response.data.user));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/Home');

        } catch (error) {
            const errorMessage = error.response?.data?.message || "שגיאה בהתחברות";
            Swal.fire({
                title: 'שגיאה',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'אינך רשום במערכת עליך להרשם'
            });
            navigate('/Regist');
        }
    };
    /**
     * Validates Israeli ID (TZ) using the checksum algorithm.
     */
    const checkTz = (value) => {
        setLoginDetails({ ...loginDetails, tz: value });
        if (value.length < 9 || value.length > 9 || isNaN(value)) {
            setErrors({ ...errors, tz: 'ת.ז חייבת להכיל 9 ספרות' });
        }
        else {
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                let incNum = Number(value[i]) * ((i % 2) + 1);
                sum += (incNum > 9) ? incNum - 9 : incNum;
            }
            if (sum % 10 !== 0) {
                setErrors({ ...errors, tz: 'ת.ז לא חוקית' });
            }
            else {
                setErrors({ ...errors, tz: '' });
            }
        }
    }
    const checkPassWord = (value) => {
        setLoginDetails({ ...loginDetails, passWord: value });
        if (value.length < 6) {
            setErrors({ ...errors, passWord: 'סיסמה קצרה מדי' });
        }
        else {
            setErrors({ ...errors, passWord: '' });
        }
    }

    return <>
        <div className="login_regist-page">
            <div className="login_regist-container">
                <h1 className="form-title">login</h1>
                <label className="form-label">הכנס ת.ז:</label>
                <input className="form-input" placeholder="הכנס ת.ז" onChange={(e) => checkTz(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.tz}</p>
                <label className="form-label">הכנס סיסמה:</label>
                <input className="form-input" type="password" placeholder="הכנס סיסמה" onChange={(e) => checkPassWord(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.passWord}</p>
                <button className="form-btn" onClick={login} disabled={!isFormValid}> sign in </button>
            </div>
        </div>
    </>
}

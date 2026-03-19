import axios from 'axios';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setCurrent } from "../REDUX/UsersSlice"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import '../STYLE/login_regist.css'


export const Regist = () => {
    const [registDetails, setRegistDetails] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    // Validates that all fields are filled and contain no validation errors
    const isFormValid =
        registDetails.tz &&
        registDetails.firstName &&
        registDetails.lastName &&
        registDetails.passWord &&
        !errors.tz &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.passWord;

    /**
     * Handles user registration by sending data to the server.
     * On success: Persists user data and redirects to Home.
     */
    const regist = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', registDetails);

            Swal.fire({
                title: 'נרשמת בהצלחה',
                text: response.data.message || 'שמחים על הצטרפותך',
                icon: 'success',
                confirmButtonText: 'הבנתי'
            });
            const userFromServer = response.data.user;
            dispatch(setCurrent(userFromServer));
            localStorage.setItem('user', JSON.stringify(userFromServer));
            navigate('/Home');

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'קרתה שגיאה ברישום';
            Swal.fire({
                title: 'אופס...',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'נסה שוב'
            });
        }
    }

    /**
     * Validates Israeli ID (TZ) format and checksum.
     */
    const checkTz = (value) => {
        setRegistDetails({ ...registDetails, tz: value });
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
        setRegistDetails({ ...registDetails, passWord: value });
        if (value.length < 6) {
            setErrors({ ...errors, passWord: 'סיסמה קצרה מדי' });
        }
        else {
            setErrors({ ...errors, passWord: '' });
        }
    }
    const checkFirstName = (value) => {
        setRegistDetails({ ...registDetails, firstName: value });
        if (!/^[A-Za-zא-ת]{2,}$/.test(value)) {
            setErrors({ ...errors, firstName: 'שם פרטי חייב להכיל לפחות 2 אותיות וללא מספרים' });
        } else {
            setErrors({ ...errors, firstName: '' });
        }
    }
    const checkLastName = (value) => {
        setRegistDetails({ ...registDetails, lastName: value });
        if (!/^[A-Za-zא-ת]{2,}$/.test(value)) {
            setErrors({ ...errors, lastName: 'שם משפחה חייב להכיל לפחות 2 אותיות וללא מספרים' });
        } else {
            setErrors({ ...errors, lastName: '' });
        }
    }

    return <>
        <div className="login_regist-page">
            <div className="login_regist-container">
                <h1 className="form-title">regist</h1>

                <label className="form-label">הכנס שם ת.ז:</label>
                <input className="form-input" placeholder="הכנס ת.ז" onChange={(e) => checkTz(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.tz}</p>

                <label className="form-label">הכנס שם פרטי:</label>
                <input className="form-input" placeholder="הכנס שם פרטי" onChange={(e) => checkFirstName(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.firstName}</p>

                <label className="form-label">הכנס שם משפחה:</label>
                <input className="form-input" placeholder="הכנס שם משפחה" onChange={(e) => checkLastName(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.lastName}</p>

                <label className="form-label">הכנס סיסמה:</label>
                <input className="form-input" type="password" placeholder="הכנס סיסמה" onChange={(e) => checkPassWord(e.target.value)} ></input>
                <p style={{ color: 'red' }}>{errors.passWord}</p>
                
                <button className="form-btn" onClick={regist} disabled={!isFormValid}> sign up </button>
            </div>
        </div>
    </>
}

import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../REDUX/RequestSlice";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import '../../STYLE/details.css'
import axios from "axios";

export const Details = ({ documents }) => {
    const currentRequest = useSelector(state => state.request.current)
    const currentUser = useSelector(state => state.user.current)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    /**
     * Validates that all required fields and documents are present 
     * before enabling the submission button.
     */
    const isFormValid = () => {
        if (!currentRequest) return false;

        const hasPersonal = currentRequest.personal?.dateOfBirth &&
            currentRequest.personal?.city &&
            currentRequest.personal?.address &&
            currentRequest.personal?.mobilePhone;

        const hasFamily = currentRequest.family?.fatherName &&
            currentRequest.family?.fatherTz &&
            currentRequest.family?.motherName &&
            currentRequest.family?.motherTz;

        const hasStudies = currentRequest.course?.institutionName &&
            currentRequest.course?.trend &&
            currentRequest.course?.yearOfStudy &&
            currentRequest.course?.salaryPerYear;

        const hasBank = currentRequest.bank?.accountHolderName &&
            currentRequest.bank?.bankName &&
            currentRequest.bank?.branchNumber &&
            currentRequest.bank?.accountNumber;

        const hasFiles = documents?.studentIdCard &&
            documents?.fatherIdCard &&
            documents?.motherIdCard &&
            documents?.studyApproval &&
            documents?.bankApproval;

        return hasPersonal && hasFamily && hasStudies && hasBank && hasFiles;
    };

    /**
     * Submits the complete application using FormData to handle 
     * both JSON data and physical file uploads.
     */
    const Approval = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire('שגיאה', 'אינך מחוברת, אנא התחברי מחדש', 'error');
                return;
            }

            const formData = new FormData();

            const requestData = {
                personal: currentRequest?.personal,
                family: {
                    father: {
                        tz: currentRequest?.family?.fatherTz,
                        firstName: currentRequest?.family?.fatherName,
                        lastName: currentUser?.lastName
                    },
                    mother: {
                        tz: currentRequest?.family?.motherTz,
                        firstName: currentRequest?.family?.motherName,
                        lastName: currentUser?.lastName
                    },
                    countUnder18: currentRequest?.family?.countUnder18 || 0,
                    countOver21WithChildren: currentRequest?.family?.countOver21Married || 0,
                    siblings: currentRequest?.family?.siblings || []
                },

                studies: currentRequest.course,
                bank: currentRequest.bank,
            };

            // Append JSON data as a string and files as binary
            formData.append('requestDetails', JSON.stringify(requestData));

            if (documents.studentIdCard) formData.append('studentIdCard', documents.studentIdCard);
            if (documents.fatherIdCard) formData.append('fatherIdCard', documents.fatherIdCard);
            if (documents.motherIdCard) formData.append('motherIdCard', documents.motherIdCard);
            if (documents.studyApproval) formData.append('studyApproval', documents.studyApproval);
            if (documents.bankApproval) formData.append('bankApproval', documents.bankApproval);

            await axios.post('http://localhost:5000/api/requests', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire('הצלחה', 'הבקשה והמסמכים נשלחו בהצלחה', 'success');
            dispatch(setCurrent());
            navigate('/Home');

        } catch (error) {
            Swal.fire('שגיאה', error.response?.data?.message || 'משהו השתבש בשליחת הטופס', 'error');
        }
    };

    /**
     * Clears the current request progress and redirects home.
     */
    const Cancellation = () => {
        dispatch(setCurrent());
        navigate('/Home');
    }

    return (
        <div className="details-page">
            <div className="user-details-container">
                <h1 className="form-title">סיכום פרטי הבקשה</h1>
                {/* Validation Alert */}
                {!isFormValid() && (
                    <div className="missing-data-alert" style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>
                        ⚠️ שימי לב: חסרים פרטים או מסמכים בטופס. כפתור השליחה יפתח רק לאחר מילוי כל שדות החובה.
                    </div>
                )}

                <p className="subtitle">אנא בדקי את הפרטים לפני השליחה הסופית</p>

                {/* --- Summary Sections --- */}
                <div className="detail-section">
                    <h2 className="section-title">👤 פרטים אישיים</h2>
                    <div className="info-grid">
                        <p><strong>שם מלא:</strong> {currentUser?.firstName} {currentUser?.lastName}</p>
                        <p><strong>ת.ז:</strong> {currentUser?.tz}</p>
                        <p><strong>תאריך לידה:</strong> {currentRequest?.personal?.dateOfBirth}</p>
                        <p><strong>עיר:</strong> {currentRequest?.personal?.city}</p>
                        <p><strong>כתובת:</strong> {currentRequest?.personal?.address}</p>
                        <p><strong>טלפון נייד:</strong> {currentRequest?.personal?.mobilePhone}</p>
                        {currentRequest?.personal?.landlinePhone && <p><strong>טלפון נייח:</strong> {currentRequest?.personal?.landlinePhone}</p>}
                    </div>
                </div>

                <div className="detail-section">
                    <h2 className="section-title">🏠 פרטי משפחה</h2>
                    <div className="info-grid">
                        <p><strong>שם האב:</strong> {currentRequest?.family?.fatherName} ({currentRequest?.family?.fatherTz})</p>
                        <p><strong>שם האם:</strong> {currentRequest?.family?.motherName} ({currentRequest?.family?.motherTz})</p>
                        <p><strong>אחים מתחת ל-18:</strong> {currentRequest?.family?.countUnder18}</p>
                    </div>

                    {currentRequest?.family?.siblings?.length > 0 && (
                        <div className="siblings-summary">
                            <h4 className="inner-title">פירוט אחים:</h4>
                            <ul className="siblings-list">
                                {currentRequest?.family?.siblings?.map((s, i) => (
                                    <li key={i}>{s.firstName} {s.lastName} (ת.ז: {s.tz}, נולד ב: {s.dateOfBirth})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="detail-section">
                    <h2 className="section-title">📚 פרטי לימוד</h2>
                    <div className="info-grid">
                        <p><strong>מוסד:</strong> {currentRequest?.course?.institutionName}</p>
                        <p><strong>מגמה:</strong> {currentRequest?.course?.trend}</p>
                        <p><strong>שנה:</strong> שנה {currentRequest?.course?.yearOfStudy}</p>
                        <p><strong>שכר לימוד:</strong> ₪{currentRequest?.course?.salaryPerYear}</p>
                    </div>
                </div>

                <div className="detail-section">
                    <h2 className="section-title">💳 פרטי בנק </h2>
                    <div className="info-grid">
                        <p><strong>בעל החשבון:</strong> {currentRequest?.bank?.accountHolderName}</p>
                        <p><strong>בנק:</strong> {currentRequest?.bank?.bankName} ({currentRequest?.bank?.bankCode})</p>
                        <p><strong>סניף:</strong> {currentRequest?.bank?.branchNumber}</p>
                        <p><strong>מספר חשבון:</strong> {currentRequest?.bank?.accountNumber}</p>
                    </div>
                </div>

                {/* --- Form Actions --- */}
                <div className="buttons-container">
                    <button
                        className={`btn approve-btn ${!isFormValid() ? 'disabled-btn' : ''}`}
                        onClick={Approval}
                        disabled={!isFormValid()}
                        style={!isFormValid() ? { backgroundColor: '#cccccc', cursor: 'not-allowed' } : {}}
                    >
                        שלח בקשה סופית
                    </button>
                    <button className="btn cancel-btn" onClick={Cancellation}>ביטול ומחיקה</button>
                </div>
            </div>
        </div>
    )
}

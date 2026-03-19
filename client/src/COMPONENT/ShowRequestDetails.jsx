
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../STYLE/showRequestDetails.css'
import Swal from "sweetalert2";


export const ShowRequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    /**
     * Fetches full application details including nested objects and document paths.
     * Uses Admin authorization token for access.
     */
    useEffect(() => {
        const fetchFullDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/requests/admin/request/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setRequest(response.data);
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
            }
        };

        if (id && token) {
            fetchFullDetails();
        }
    }, [id, token]);

    if (loading) return <div>טוען פרטים מלאים...</div>;
    if (!request) return <div>הבקשה לא נמצאה.</div>;

    /**
     * Updates the status of the scholarship request (Approved/Rejected).
     * @param {string} newStatus - 'allow' or 'reject'
     */
    const handleStatusUpdate = async (newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/requests/admin/update-status/${id}`,
                { status: newStatus },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            setRequest({ ...request, status: newStatus });
            Swal.fire({
                icon: 'success',
                title: 'הסטטוס עודכן בהצלחה',
                text: response.data.message,
                confirmButtonText: 'אישור'
            });
            window.history.back();


        }
        catch (error) {
            alert("שגיאה בעדכון הסטטוס");
        }
    };

    return (
        <div className="show-page">
            <div className="show-details">
                <h2>פרטי בקשה מלאים</h2>

                {/* --- Application Data Sections --- */}
                <section>
                    <h3 className="section-title">פרטים אישיים</h3>
                    <p className="user-info">שם: {request.requestDetails?.personal?.firstName} {request.requestDetails?.personal?.lastName}</p>
                    <p className="user-info">ת.ז: {request.requestDetails?.personal?.tz}</p>
                    <p className="user-info">תאריך לידה: {request.requestDetails?.personal?.dateOfBirth}</p>
                    <p className="user-info">כתובת: {request.requestDetails?.personal?.address}</p>
                    <p className="user-info">טלפון: {request.requestDetails?.personal?.phone}</p>
                </section>

                <section>
                    <h3 className="section-title">פרטי משפחה</h3>
                    <p className="user-info">שם האב: {request.requestDetails?.family?.fatherName}</p>
                    <p className="user-info">שם האם: {request.requestDetails?.family?.motherName}</p>
                    <p className="user-info">כמות הילדים: {request.requestDetails?.family?.countChildren}</p>
                    <p className="user-info">כמות אחים מעל גיל 19: {request.requestDetails?.family?.countOver_19}</p>
                </section>

                <section>
                    <h3 className="section-title">פרטי לימוד</h3>
                    <p className="user-info">מגמה: {request.requestDetails?.studies?.trend}</p>
                    <p className="user-info">שכר שנתי: {request.requestDetails?.studies?.salaryPerYear}</p>
                    <p className="user-info">שנת לימוד: {request.requestDetails?.studies?.yearOfStudy}</p>
                </section>

                <section>
                    <h3 className="section-title">פרטי בנק</h3>
                    <p className="user-info">שם בעל החשבון: {request.requestDetails?.bank?.accountHolderName}</p>
                    <p className="user-info">ת.ז בעל החשבון: {request.requestDetails?.bank?.accountHolderTz}</p>
                    <p className="user-info">שם הבנק: {request.requestDetails?.bank?.bankName}</p>
                    <p className="user-info">מספר סניף: {request.requestDetails?.bank?.branchNumber}</p>
                    <p className="user-info">מספר חשבון: {request.requestDetails?.bank?.accountNumber}</p>
                </section>

                <section>
                    <h3 className="section-title">מסמכים מצורפים</h3>
                    {request.requestDetails?.documents ? (
                        <ul>
                            {Object.entries(request.requestDetails.documents).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}: </strong>
                                    <a href={`http://localhost:5000/${value}`} target="_blank" rel="noreferrer">
                                        צפה במסמך
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>אין מסמכים מצורפים</p>
                    )}
                </section>

                <div className="buttons-container">
                    <button className="btn cancel-btn" onClick={() => window.history.back()}>חזור</button>
                    <button className="btn approve-btn" onClick={() => handleStatusUpdate('allow')}>אשר בקשה✅ </button>
                    <button className="btn approve-btn" onClick={() => handleStatusUpdate('reject')}> דחה בקשה ❌</button>
                </div>
            </div>
        </div>

    );
};

import { useEffect, useState } from "react"
import axios from "axios"
import '../STYLE/viewStatus.css'

export const ViewStatus = () => {
    const token = localStorage.getItem('token');

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch the specific user's application status from the server.
     * Requires user authentication (Bearer Token).
     */
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/requests/my-status', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setRequest(response.data);
                setLoading(false);
            }
            catch (err) {
                setError(err.response?.data?.message || "שגיאה בטעינת הסטטוס");
                setLoading(false);
            }
        };

        if (token) {
            fetchStatus();
        } else {
            setError("אינך מחוברת");
            setLoading(false);
        }
    }, [token]);

    // UI Loading and Error states
    if (loading) return <div className="viewStatus-page">טוען סטטוס...</div>;

    if (error) return (
        <div className="viewStatus-page">
            <div className="status-box status-reject">❌ {error}</div>
        </div>
    );

    return (
        <div className="viewStatus-page">
            <h1>סטטוס הבקשה שלי</h1>

            {request ? (
                <>
                    {/* Display box according to the request status */}
                    {request.status === "waiting" && (
                        <div className="status-box status-waiting">
                            ⏳ הבקשה מיום {new Date(request.submissionDate).toLocaleDateString()} ממתינה לאישור
                        </div>
                    )}

                    {request.status === "allow" && (
                        <div className="status-box status-allow">
                            ✔️ הבקשה אושרה בהצלחה!
                        </div>
                    )}

                    {request.status === "reject" && (
                        <div className="status-box status-reject">
                            ❌ מצטערים, הבקשה נדחתה.
                        </div>
                    )}
                </>
            ) : (
                <div className="status-box">לא נמצאה בקשה במערכת</div>
            )}
        </div>
    );
}
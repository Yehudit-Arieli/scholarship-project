
import { useEffect, useState } from "react";
import axios from "axios";
import '../STYLE/viewRequests.css';
import { useNavigate } from "react-router-dom";


export const ViewRequests = () => {
    const [requests, setRequests] = useState([]); 
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();

    /**
     * Fetch all submitted scholarship requests from the server.
     * Accessible only by administrators with a valid token.
     */
    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/requests/admin/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRequests(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        if (token) {
            getAllRequests();

        }
        else {
            setLoading(false);
        }
    }, [token]);

    if (loading) return <div>טוען בקשות...</div>;

    return (
        <div className="viewRequests-page">

            <h1>רשימת בקשות להגשה</h1>
            <table>
                <thead>
                    <tr>
                        <th>ת.ז</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>מגמה</th>
                        <th>סטטוס</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.requestDetails?.personal?.tz}</td>
                            <td>{req.requestDetails?.personal?.firstName}</td>
                            <td>{req.requestDetails?.personal?.lastName}</td>
                            <td>{req.requestDetails?.studies?.trend}</td>
                            <td>{req.status}</td>
                            {/* Navigate to detailed view for a specific request */}
                            <td><button onClick={() => navigate(`/admin/request/${req._id}`)}>פרטים נוספים</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



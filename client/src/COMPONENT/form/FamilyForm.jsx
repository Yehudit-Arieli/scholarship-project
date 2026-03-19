
import { useDispatch } from "react-redux"
import { setFamily } from "../../REDUX/RequestSlice"
import '../../STYLE/form.css';
import { useEffect } from "react";

export const FamilyForm = ({ familyDetails, setFamilyDetails }) => {
    const dispatch = useDispatch()

    /**
     * Initial sync with Redux store on component mount.
     */
    useEffect(() => {
        dispatch(setFamily(familyDetails))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * General change handler to sync the local state with Redux.
     */
    const handleChange = () => {
        dispatch(setFamily(familyDetails))
    }

    /**
     * Adds a new empty sibling object to the list.
     */
    const addSibling = () => {
        const newSibling = { tz: '', firstName: '', lastName: '', dateOfBirth: '' };
        const updated = {
            ...familyDetails,
            siblings: [...(familyDetails.siblings || []), newSibling]
        };
        setFamilyDetails(updated);
        dispatch(setFamily(updated));
    }

    /**
     * Updates a specific field for a sibling at a given index.
     * Uses functional update pattern for the siblings array.
     */
    const updateSibling = (index, field, value) => {
        const updatedSiblings = [...(familyDetails.siblings || [])];
        updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };

        const updated = { ...familyDetails, siblings: updatedSiblings };
        setFamilyDetails(updated);
    };

    /**
     * Removes a sibling from the list by its index.
     */
    const removeSibling = (index) => {
        const updatedSiblings = familyDetails.siblings.filter((_, i) => i !== index);

        const updated = { ...familyDetails, siblings: updatedSiblings };
        setFamilyDetails(updated);
        dispatch(setFamily(updated));
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">פרטי משפחה</h1>

                {/* --- Parents Information --- */}
                <div className="form-section">
                    <label className="form-label">ת.ז אב: <span className="required">*</span></label>
                    <input className="form-input" required placeholder="9 ספרות"
                        onChange={(e) => setFamilyDetails({ ...familyDetails, fatherTz: e.target.value })}
                        onBlur={handleChange} value={familyDetails?.fatherTz || ''}
                    />

                    <label className="form-label">שם אב: <span className="required">*</span></label>
                    <input className="form-input" required placeholder="שם מלא"
                        onChange={(e) => setFamilyDetails({ ...familyDetails, fatherName: e.target.value })}
                        onBlur={handleChange} value={familyDetails?.fatherName || ''}
                    />

                    <label className="form-label">ת.ז אם: <span className="required">*</span></label>
                    <input className="form-input" required placeholder="9 ספרות"
                        onChange={(e) => setFamilyDetails({ ...familyDetails, motherTz: e.target.value })}
                        onBlur={handleChange} value={familyDetails?.motherTz || ''}
                    />

                    <label className="form-label">שם אם: <span className="required">*</span></label>
                    <input className="form-input" required placeholder="שם מלא"
                        onChange={(e) => setFamilyDetails({ ...familyDetails, motherName: e.target.value })}
                        onBlur={handleChange} value={familyDetails?.motherName || ''}
                    />
                </div>

                <hr />

                {/* --- Sibling Counts --- */}
                <label className="form-label">מספר אחים מתחת לגיל 18: <span className="required">*</span></label>
                <input type="number" required className="form-input"
                    onChange={(e) => setFamilyDetails({ ...familyDetails, countUnder18: e.target.value })}
                    onBlur={handleChange} value={familyDetails?.countUnder18 || ''}
                />

                <label className="form-label">מספר אחים מעל 21 נשואים (עם +1 ילדים):</label>
                <input type="number" className="form-input"
                    onChange={(e) => setFamilyDetails({ ...familyDetails, countOver21Married: e.target.value })}
                    onBlur={handleChange} value={familyDetails?.countOver21Married || ''}
                />

                <hr />

                {/* --- Dynamic Siblings List --- */}
                <h3 className="section-subtitle">פירוט אחים:</h3>
                {familyDetails.siblings?.map((sibling, index) => (
                    <div key={index} className="sibling-box shadow-sm" style={{ position: 'relative', marginBottom: '15px', padding: '15px', border: '1px solid #ddd' }}>
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeSibling(index)}
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '10px',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'none',
                                fontSize: '18px',
                                color: 'red'
                            }}
                        >
                            ✖
                        </button>

                        <label className="form-label">ת.ז אח:</label>
                        <input className="form-input" value={sibling.tz || ''}
                            onChange={(e) => updateSibling(index, 'tz', e.target.value)}
                            onBlur={handleChange} />

                        <label className="form-label">שם פרטי:</label>
                        <input className="form-input" value={sibling.firstName || ''}
                            onChange={(e) => updateSibling(index, 'firstName', e.target.value)}
                            onBlur={handleChange} />

                        <label className="form-label">שם משפחה:</label>
                        <input className="form-input" value={sibling.lastName || ''}
                            placeholder="הזיני שם משפחה"
                            onChange={(e) => updateSibling(index, 'lastName', e.target.value)}
                            onBlur={handleChange} />

                        <label className="form-label">תאריך לידה:</label>
                        <input type="date" className="form-input" value={sibling.dateOfBirth || ''}
                            onChange={(e) => updateSibling(index, 'dateOfBirth', e.target.value)}
                            onBlur={handleChange} />
                    </div>
                ))}

                <button type="button" className="add-btn" onClick={addSibling}>
                    + הוסף אח לרשימה
                </button>
            </div>
        </div>
    );
}
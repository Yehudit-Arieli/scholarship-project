
import { useDispatch } from "react-redux";
import { setCourse } from "../../REDUX/RequestSlice";
import { useEffect } from "react";
import '../../STYLE/form.css'

export const CourseForm = ({ courseDetails, setCourseDetails }) => {
    const dispatch = useDispatch()

    /**
     * Ensures the global Redux state is updated with initial 
     * course details upon component mounting.
     */
    useEffect(() => {
        dispatch(setCourse(courseDetails));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
         * Dispatches current course information to the Redux store.
         * Triggered on input blur or manual selection changes.
         */
    const handleChange = () => {
        dispatch(setCourse(courseDetails))
    }


    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">פרטי לימוד</h1>

                {/* --- Institution & Trend Selection --- */}
                <label className="form-label">שם מוסד הלימודים: <span className="required">*</span></label>
                <input
                    className="form-input"
                    placeholder="הכנס שם מוסד (למשל: סמינר/מכללה)"
                    onChange={(e) => setCourseDetails({ ...courseDetails, institutionName: e.target.value })}
                    onBlur={handleChange}
                    value={courseDetails?.institutionName || ''}
                />

                <label className="form-label">בחר מגמה: <span className="required">*</span></label>
                <select
                    className="form-input"
                    onChange={(e) => {
                        const updated = { ...courseDetails, trend: e.target.value };
                        setCourseDetails(updated);
                        dispatch(setCourse(updated));
                    }}
                    value={courseDetails?.trend || ''}
                >
                    <option value="" disabled>בחר מגמה מהרשימה</option>
                    <option value="הנדסת תוכנה">הנדסת תוכנה</option>
                    <option value="עיצוב גרפי">עיצוב גרפי</option>
                    <option value="ראיית חשבון">ראיית חשבון</option>
                    <option value="ייעוץ מס">ייעוץ מס</option>
                    <option value="אדריכלות">אדריכלות</option>
                    <option value="הוראה">הוראה</option>
                </select>

                {/* --- Financial & Academic Progress --- */}
                <label className="form-label">שכר לימוד שנתי: <span className="required">*</span></label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="₪ הכנס סכום בשקלים"
                    onChange={(e) => setCourseDetails({ ...courseDetails, salaryPerYear: e.target.value })}
                    onBlur={handleChange}
                    value={courseDetails?.salaryPerYear || ''}
                />

                <label className="form-label">שנה נוכחית בלימודים: <span className="required">*</span></label>
                <select
                    className="form-input"
                    onChange={(e) => {
                        const updated = { ...courseDetails, yearOfStudy: e.target.value };
                        setCourseDetails(updated);
                        dispatch(setCourse(updated));
                    }}
                    value={courseDetails?.yearOfStudy || ''}
                >
                    <option value="" disabled>בחר שנה</option>
                    <option value="1">שנה א'</option>
                    <option value="2">שנה ב'</option>
                    <option value="3">שנה ג'</option>
                    <option value="4">שנה ד'</option>
                </select>
            </div>
        </div>
    )
}
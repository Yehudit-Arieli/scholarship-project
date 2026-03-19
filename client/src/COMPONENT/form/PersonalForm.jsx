
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPersonal } from "../../REDUX/RequestSlice"
import '../../STYLE/form.css'

/**
 * PersonalForm Component
 * Collects personal contact details and synchronizes them with the global request state.
 * Some fields are pre-filled from the user's profile and set to read-only.
 */
export const PersonalForm = ({ PersonalDetails, setPersonalDetails }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.current)

  /**
   * Dispatches current personal details to the Redux store.
   * Triggered on input blur to ensure the global state stays updated.
   */
  const handleChange = () => {
    dispatch(setPersonal(PersonalDetails))
  }

  /**
   * Ensures the global Redux state is initialized with the current 
   * local state when the component mounts.
   */
  useEffect(() => {
    dispatch(setPersonal(PersonalDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="form-title">פרטים אישיים</h1>

        {/* --- Non-Editable Identity Info --- */}
        <label className="form-label">תעודת זהות:</label>
        <input className="form-input" readOnly value={currentUser?.tz || ''} />

        <label className="form-label">שם פרטי:</label>
        <input className="form-input" readOnly value={currentUser?.firstName || ''} />

        <label className="form-label">שם משפחה:</label>
        <input className="form-input" readOnly value={currentUser?.lastName || ''} />

        <hr />

        {/* --- Editable Contact & Location Info --- */}
        <label className="form-label">תאריך לידה: <span className="required">*</span></label>
        <input
          className="form-input"
          type="date"
          onChange={(e) => setPersonalDetails({ ...PersonalDetails, dateOfBirth: e.target.value })}
          onBlur={handleChange}
          value={PersonalDetails?.dateOfBirth || ''}
        />

        <label className="form-label">עיר מגורים: <span className="required">*</span></label>
        <input
          className="form-input"
          placeholder="הכנס עיר מגורים"
          onChange={(e) => setPersonalDetails({ ...PersonalDetails, city: e.target.value })}
          onBlur={handleChange}
          value={PersonalDetails?.city || ''}
        />

        <label className="form-label">כתובת (רחוב ומספר בית): <span className="required">*</span></label>
        <input
          className="form-input"
          placeholder="הכנס כתובת"
          onChange={(e) => setPersonalDetails({ ...PersonalDetails, address: e.target.value })}
          onBlur={handleChange}
          value={PersonalDetails?.address || ''}
        />

        <label className="form-label">טלפון נייד: <span className="required">*</span></label>
        <input
          className="form-input"
          placeholder="05X-XXXXXXX"
          onChange={(e) => setPersonalDetails({ ...PersonalDetails, mobilePhone: e.target.value })}
          onBlur={handleChange}
          value={PersonalDetails?.mobilePhone || ''}
        />

        <label className="form-label">טלפון נייח (אופציונלי):</label>
        <input
          className="form-input"
          placeholder="0X-XXXXXXX"
          onChange={(e) => setPersonalDetails({ ...PersonalDetails, landlinePhone: e.target.value })}
          onBlur={handleChange}
          value={PersonalDetails?.landlinePhone || ''}
        />
      </div>
    </div>
  )
}
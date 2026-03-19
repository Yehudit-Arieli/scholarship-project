
import { useDispatch, useSelector } from "react-redux"
import { setBank } from "../../REDUX/RequestSlice"
import '../../STYLE/form.css'
import { useEffect } from "react"

export const BankForm = ({ bankDetails, setBankDetails }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.current)

    /**
     * Autofill account holder details from currentUser profile 
     * if the fields are currently empty.
     */
    useEffect(() => {
        if (!bankDetails.accountHolderName || !bankDetails.accountHolderTz) {
            const updated = {
                ...bankDetails,
                accountHolderName: bankDetails.accountHolderName || `${currentUser?.firstName} ${currentUser?.lastName}`,
                accountHolderTz: bankDetails.accountHolderTz || currentUser?.tz
            };
            setBankDetails(updated);
            dispatch(setBank(updated));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /**
     * Updates the Redux store with current bank details 
     * when an input field loses focus (onBlur).
     */
    const handleChange = () => {
        dispatch(setBank(bankDetails))
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">פרטי בנק לקבלת המלגה</h1>

                {/* --- Account Holder Info --- */}
                <label className="form-label">שם בעל החשבון: <span className="required">*</span></label>
                <input className="form-input" required placeholder="שם מלא כפי שמופיע בבנק"
                    onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                    onBlur={handleChange} value={bankDetails?.accountHolderName || ''}
                />

                <label className="form-label">ת.ז בעל החשבון: <span className="required">*</span></label>
                <input className="form-input" required placeholder="9 ספרות"
                    onChange={(e) => setBankDetails({ ...bankDetails, accountHolderTz: e.target.value })}
                    onBlur={handleChange} value={bankDetails?.accountHolderTz || ''}
                />

                {/* --- Bank & Branch Info --- */}
                <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 2 }}>
                        <label className="form-label">שם הבנק: <span className="required">*</span></label>
                        <input className="form-input" required placeholder="למשל: לאומי"
                            onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                            onBlur={handleChange} value={bankDetails?.bankName || ''}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">קוד בנק: <span className="required">*</span></label>
                        <input className="form-input" required placeholder="למשל: 10"
                            onChange={(e) => setBankDetails({ ...bankDetails, bankCode: e.target.value })}
                            onBlur={handleChange} value={bankDetails?.bankCode || ''}
                        />
                    </div>
                </div>

                <label className="form-label">מספר סניף: <span className="required">*</span></label>
                <input className="form-input" required placeholder="3 ספרות"
                    onChange={(e) => setBankDetails({ ...bankDetails, branchNumber: e.target.value })}
                    onBlur={handleChange} value={bankDetails?.branchNumber || ''}
                />

                <label className="form-label">מספר חשבון: <span className="required">*</span></label>
                <input type="number" className="form-input" required placeholder="הכנס מספר חשבון"
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    onBlur={handleChange} value={bankDetails?.accountNumber || ''}
                />
            </div>
        </div>
    );
}
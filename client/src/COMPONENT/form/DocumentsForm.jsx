import '../../STYLE/form.css';

export const DocumentsForm = ({ documents, setDocuments }) => {

    /**
     * Handles file selection and updates the local state.
     * Takes the first file from the FileList object.
     */
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setDocuments({
                ...documents,
                [name]: files[0]
            });
        }
    };

    /**
     * Helper function to render a styled file input.
     * Displays a success indicator (✅) when a file is selected.
     */
    const renderFileInput = (name, labelText) => (
        <div className="file-input-group">
            <label className="form-label">{labelText}: <span className="required">*</span></label>

            <label htmlFor={name} className="custom-file-upload">
                {documents[name] ?
                    (<span className="file-name-display">✅ {documents[name].name}</span>)
                    :
                    (<span className="file-placeholder">לחצי לבחירת קובץ...</span>)}
            </label>

            <input
                id={name}
                type="file"
                name={name}
                className="hidden-file-input"
                onChange={handleFileChange}
                accept="image/*,.pdf"
            />
        </div>
    );

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">העלאת מסמכים</h1>
                <p className="form-subtitle">אנא העלי את הצילומים הנדרשים (פורמט PDF או תמונה)</p>

                {/* --- File Upload Sections --- */}
                <div className="form-section">
                    {renderFileInput("studentIdCard", "צילום ת.ז + ספח סטודנט")}
                    {renderFileInput("fatherIdCard", "צילום ת.ז + ספח אב")}
                    {renderFileInput("motherIdCard", "צילום ת.ז + ספח אם")}

                    <hr className="form-hr" />
                    {renderFileInput("studyApproval", "אישור לימודים בתוקף")}
                    {renderFileInput("bankApproval", "אישור ניהול חשבון בנק / צילום צ'ק")}
                </div>
            </div>
        </div>
    );
};
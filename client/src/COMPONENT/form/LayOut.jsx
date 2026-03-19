
import { useState } from "react"
import { MultiForm } from "./MultiForm"
import { PersonalForm } from "./PersonalForm"
import { CourseForm } from "./CourseForm"
import { BankForm } from "./BankForm"
import { FamilyForm } from "./FamilyForm"
import { Details } from "./Details"
import { useSelector } from "react-redux"
import { DocumentsForm } from "./DocumentsForm"

/**
 * LayOut Component
 * Acts as the main container for the multi-step scholarship application.
 * Manages the shared state across all form steps.
 */
export const LayOut = () => {
    const currentUser = useSelector(state => state.user.current)

    // --- State Definitions for each Step ---

    // 1. Personal Information
    const [PersonalDetails, setPersonalDetails] = useState({
        tz: currentUser?.tz || '',
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        dateOfBirth: '',
        address: '',
        city: '',
        mobilePhone: '',
        landlinePhone: ''
    })

    // 2. Family Background
    const [familyDetails, setFamilyDetails] = useState({
        fatherName: '',
        fatherTz: '',
        motherName: '',
        motherTz: '',
        countUnder18: 0,
        countOver21Married: 0,
        siblings: []
    })

    // 3. Academic Information
    const [courseDetails, setCourseDetails] = useState({
        institutionName: '',
        trend: '',
        salaryPerYear: '',
        yearOfStudy: ''
    })

    // 4. Bank Details for payment
    const [bankDetails, setBankDetails] = useState({
        accountHolderName: '',
        accountHolderTz: '',
        bankName: '',
        bankCode: '',
        branchNumber: '',
        accountNumber: ''
    })

    // 5. File Uploads (Stored as File objects, not strings)
    const [documents, setDocuments] = useState({
        studentIdCard: null,
        fatherIdCard: null,
        motherIdCard: null,
        studyApproval: null,
        bankApproval: null
    })

    return (
        <MultiForm>
            {/* Each child represents a step in the MultiForm stepper */}
            <PersonalForm PersonalDetails={PersonalDetails} setPersonalDetails={setPersonalDetails} />
            <FamilyForm familyDetails={familyDetails} setFamilyDetails={setFamilyDetails} />
            <CourseForm courseDetails={courseDetails} setCourseDetails={setCourseDetails} />
            <BankForm bankDetails={bankDetails} setBankDetails={setBankDetails} />
            <DocumentsForm documents={documents} setDocuments={setDocuments} />
            <Details documents={documents} />
        </MultiForm>
    )
}
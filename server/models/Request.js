
import mongoose from 'mongoose';

/**
 * Scholarship Request Schema
 * Stores comprehensive application data including personal, family, 
 * academic, and financial details.
 */
const ScholarshipRequestSchema = new mongoose.Schema({
    // Reference to the User who submitted the request
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Application status: waiting (default), approved, or rejected
    status: {
        type: String,
        enum: ['waiting', 'allow', 'reject'],
        default: 'waiting'
    },
    submissionDate: {
        type: Date, default: Date.now
    },

    requestDetails: {
        // Personal Information
        personal: {
            tz: String,
            firstName: String,
            lastName: String,
            dateOfBirth: Date,
            city: String,
            address: String,
            mobilePhone: String,
            landlinePhone: String
        },
        // Family Background and Siblings
        family: {
            father: { tz: String, firstName: String, lastName: String },
            mother: { tz: String, firstName: String, lastName: String },
            countUnder18: Number,
            countOver21WithChildren: Number,
            // Array of sibling objects
            siblings: [{
                tz: String,
                firstName: String,
                lastName: String,
                dateOfBirth: Date
            }]
        },
        // Academic Information
        studies: {
            trend: String,
            institution: String,
            yearsOfStudy: Number,
            annualTuition: Number
        },
        // Bank Account Details for Fund Transfer
        bank: {
            accountHolderTz: String,
            bankName: String,
            branchNumber: String,
            accountNumber: String
        },
        // Paths to uploaded documents stored on the server
        documents: {
            studentIdCard: { type: String },// ID Card + Student Annex
            fatherIdCard: { type: String }, // ID Card + Father's Annex
            motherIdCard: { type: String }, // ID Card + Mother's Annex
            studyApproval: { type: String }, // Official Study Approval
            bankApproval: { type: String } // Bank Account Confirmation
        }
    }

});

export default mongoose.model('ScholarshipRequest', ScholarshipRequestSchema);
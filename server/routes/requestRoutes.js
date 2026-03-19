import express from 'express';
import { createRequest, getMyStatus, getAllPendingRequests, getRequestById, updateRequestStatus } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

/**
 * File Upload Configuration using Multer
 * Sets the destination folder and generates a unique filename for each upload
 */
const uploadDir = 'uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/**
 * Define specific fields for scholarship documentation
 * Each field allows only 1 file
 */
const scholarshipUploads = upload.fields([
    { name: 'studentIdCard', maxCount: 1 },
    { name: 'fatherIdCard', maxCount: 1 },
    { name: 'motherIdCard', maxCount: 1 },
    { name: 'studyApproval', maxCount: 1 },
    { name: 'bankApproval', maxCount: 1 }
]);

const router = express.Router();

// --- Request Routes ---

// Create a new scholarship request with multiple file uploads
router.post('/', protect, scholarshipUploads, createRequest);

// Get the current logged-in user's request status
router.get('/my-status', protect, getMyStatus);

// --- Admin Routes ---

// Fetch all pending scholarship requests
router.get('/admin/all', protect, getAllPendingRequests);

// Fetch details of a specific request by ID
router.get('/admin/request/:id', protect, getRequestById);

// Update status of a specific request (Approve/Reject)
router.put('/admin/update-status/:id', protect, updateRequestStatus);

export default router;
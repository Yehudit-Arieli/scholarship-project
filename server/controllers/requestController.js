import ScholarshipRequest from '../models/Request.js';

/**
 * @desc    Submit a new scholarship request with documents
 * @route   POST /api/requests
 * @access  Private (Student)
 */
export const createRequest = async (req, res) => {
    try {
        // 1. Validate textual data presence
        if (!req.body.requestDetails) {
            return res.status(400).json({ message: "Error: Missing request details." });
        }

        // 2. Validate file uploads (Ensuring all 5 required documents are present)
        if (!req.files || Object.keys(req.files).length < 5) {
            return res.status(400).json({ message: "Error: All 5 required documents must be uploaded." });
        }

        // 3. Handle requestDetails (Parsing JSON string if necessary due to Multi-part form)
        const { requestDetails } = req.body;

        let parsedDetails = requestDetails;
        if (typeof requestDetails === 'string') {
            parsedDetails = JSON.parse(requestDetails);
        }

        // 4. Map uploaded file paths
        const documentPaths = {};
        if (req.files) {
            if (req.files.studentIdCard) documentPaths.studentIdCard = req.files.studentIdCard[0].path;
            if (req.files.fatherIdCard) documentPaths.fatherIdCard = req.files.fatherIdCard[0].path;
            if (req.files.motherIdCard) documentPaths.motherIdCard = req.files.motherIdCard[0].path;
            if (req.files.studyApproval) documentPaths.studyApproval = req.files.studyApproval[0].path;
            if (req.files.bankApproval) documentPaths.bankApproval = req.files.bankApproval[0].path;
        }

        // 5. Initialize new scholarship request
        const newRequest = new ScholarshipRequest({
            userId: req.user.id, // ID from authMiddleware payload
            requestDetails: {
                ...parsedDetails,
                documents: documentPaths // Inject file paths into the document section
            }
        });

        // 6. Save to Database
        const savedRequest = await newRequest.save();

        res.status(201).json({
            message: "Request and documents submitted successfully",
            request: savedRequest
        });

    } catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ message: "Server error while saving request", error: error.message });
    }
};

/**
 * @desc    Get the status of the logged-in user's latest request
 * @route   GET /api/requests/my-status
 * @access  Private (Student)
 */
export const getMyStatus = async (req, res) => {
    try {
        // Fetch the most recent request for the current user
        const request = await ScholarshipRequest.findOne({ userId: req.user.id }).sort({ submissionDate: -1 });

        if (!request) {
            return res.status(404).json({ message: "No request found for this user" });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching status" });
    }
};

/**
 * @desc    Get all pending requests (Admin only)
 * @route   GET /api/requests/admin/all
 * @access  Private (Admin)
 */
export const getAllPendingRequests = async (req, res) => {
    try {
        // Fetch requests from database where status is not equal to "allow"
        // Using $ne (not equal) operator to filter out approved requests
        const requests = await ScholarshipRequest.find({ status: { $ne: "allow" } })
            .select('requestDetails.personal.tz requestDetails.personal.firstName requestDetails.personal.lastName requestDetails.studies.trend status');

        res.status(200).json(requests);

    }
    catch (error) {
        res.status(500).json({ message: "Error fetching requests", error: error.message });
    }
};

/**
 * @desc    Get specific request details by ID (Admin only)
 * @route   GET /api/requests/admin/request/:id
 * @access  Private (Admin)
 */
export const getRequestById = async (req, res) => {
    try {
        // 1. Extract the ID from URL parameters
        const { id } = req.params;

        // 2. Find the request in the Database by its ID
        const request = await ScholarshipRequest.findById(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(request);

    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving request details", error: error.message });
    }
};

/**
 * @desc    Update request status (Approve/Reject)
 * @route   PUT /api/requests/admin/update-status/:id
 * @access  Private (Admin)
 */
export const updateRequestStatus = async (req, res) => {
    try {
        // 1. Extract ID from the URL
        const { id } = req.params;

        // 2. Extract the new status from request body ("allow" or "reject")
        const { status } = req.body;

        // 3. Update the document in MongoDB
        const updatedRequest = await ScholarshipRequest.findByIdAndUpdate(
            id,
            { status: status },
            // Returns the modified document instead of the original
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        // 4. Return successful response with updated data
        res.status(200).json({
            message: "Request status updated successfully",
            request: updatedRequest
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

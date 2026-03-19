import jwt from 'jsonwebtoken';

/**
 * Auth Middleware
 * Verifies the JWT token in the Authorization header.
 * Attaches the decoded user information to the request object.
 */
export const protect = (req, res, next) => {
    let token;
    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header (Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Verify and decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach decoded user payload (e.g., id, role) to the request object
            req.user = decoded;

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed'});
        }
    }

    // If no token was found in the headers
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};


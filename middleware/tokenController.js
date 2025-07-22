const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }

       req.user = {
            email: decodedToken.email,
            role: decodedToken.role,
        };

        next();
    });
};

exports.authenticateToken = authenticateToken;
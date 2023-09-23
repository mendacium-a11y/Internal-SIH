var jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken 
// Middleware function to verify incoming JWT tokens

const jwt = require('jsonwebtoken');


const verifyToken = (request, response, next) => {
    const token = request.body.token;
    if (!token) {
        return response.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        request.user = verified; // Adds the user ID to the request
        next();
    } catch (error) {
        response.status(400).send('Invalid Token');
    }
};

module.exports = verifyToken;
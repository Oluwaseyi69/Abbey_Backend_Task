const jwt = require('jsonwebtoken');



class JwtUtil {
    
    generateToken(user) {
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        return jwt.sign(
            payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = new JwtUtil();

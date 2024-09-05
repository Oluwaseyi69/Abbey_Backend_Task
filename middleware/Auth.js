// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwtUtil = require('../utils/JwtUtil')
const UserRepository = require('../repositories/UserRepository');

dotenv.config();

console.log("i am at middleware")

const authMiddleware = {
  
  authenticate: async (req, res, next) => {
    console.log("i got to middleware!!")
      try {
          const token = req.header('Authorization')?.replace('Bearer ', '');

          console.log("token:", token);
          const decoded = jwtUtil.verifyToken(token); 
          console.log("decodedRes:", decoded);
          req.user = decoded; 
          console.log(req.user);
          next(); 
      } catch (error) {
          return res.status(401).send({ error: 'Unauthorized' });
      }
  },


};

module.exports = authMiddleware;
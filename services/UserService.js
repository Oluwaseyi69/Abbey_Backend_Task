const UserRepository = require('../repositories/UserRepository');
const bcryptUtil = require('../utils/BcryptUtil');
const jwtUtil = require('../utils/JwtUtil');

class UserService {
    async registerUser(registerDto) {
      if (!registerDto.username) {
          throw new Error('Username is required');
      }
      const existingUser = await UserRepository.findByEmail(registerDto.email);
      if (existingUser) {
          throw new Error('User with this email already exists');
      }
        const hashedPassword = await bcryptUtil.hashPassword(registerDto.password);

        const user = {
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
        };

        await UserRepository.create(user);
        return user;
    }

    async loginUser(loginDto) {
      const user = await UserRepository.findByEmail(loginDto.email);
      if (!user) {
          throw new Error('User with this email does not exist');
      }

      const isPasswordValid = await bcryptUtil.comparePasswords(loginDto.password, user.password);
      if (!isPasswordValid) {
          throw new Error('Invalid email or password');
      }

      const token = jwtUtil.generateToken({ 
        id: user._id, 
        email: user.email,
       });

      return { token, user: 
        { id: user._id, 
          email: user.email,
          username: user.username,
        } 

      };

    }
   
 
  

  async logoutUser(userId) {
      const user = await UserRepository.findById(userId);
      if (!user) {
          throw new Error('User not found');
      } 

  }
}

module.exports = new UserService();

const UserService = require('../services/UserService');

class AuthController {
    async register(req, res) {
        try {
            const registerDto = req.body;
            const user = await UserService.registerUser(registerDto);
            res.status(201).send(`${user.username} registered successfully!`);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
    async login(req, res) {
      try {
          const loginDto = req.body;
          const result = await UserService.loginUser(loginDto);
          res.status(200).send(result);
    } 
        catch (error) {
          res.status(400).send({ error: error.message });
        }
    }

    
    async logout(req, res) {
        try {
            const userId = req.user.id;
            await UserService.logoutUser(userId);
            res.status(200).send('User logged out successfully!');
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }


}

module.exports = new AuthController();

const UserService = require('../services/UserService');
const jwtUtil = require('../utils/JwtUtil');

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
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const retrievedEmail = req.user.email;
      const result = await UserService.getUser(retrievedEmail);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async searchUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ error: "Email query parameter is required" });
      }

      const user = await UserService.searchUserByEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const updateDto = req.body;
      const email = req.user.email;

      const updatedUser = await UserService.updateUser(email, updateDto);

      res.status(200).send({
        message: "User updated successfully!",
        user: updatedUser,
      });
    } catch (error) {
      res.status(400).send({ errorr: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwtUtil.verifyToken(token);

      await UserService.deleteUser(decodedToken.email);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const email = req.user.email;
      await UserService.logoutUser(email);
      res.status(200).send("User logged out successfully!");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async addFriend(req, res) {
    try {
      const { connectedUserEmail } = req.body;
      const result = await UserService.addFriend(
        req.user.email,
        connectedUserEmail
      );
      res.status(201).json({ message: "Friend added successfully", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();

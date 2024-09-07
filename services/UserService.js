const UserRepository = require('../repositories/UserRepository');
const bcryptUtil = require('../utils/BcryptUtil');
const jwtUtil = require('../utils/JwtUtil');
const RelationshipService = require('../services/RelationshipService')
const RelationshipDto = require('../dtos/RelationshipDto')

class UserService {
  async registerUser(registerDto) {
    if (!registerDto.username) {
      throw new Error("Username is required");
    }
    const existingUser = await UserRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
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
      throw new Error("User with this email does not exist");
    }

    const isPasswordValid = await bcryptUtil.comparePasswords(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwtUtil.generateToken({
      id: user._id,
      email: user.email,
    });

    return {
      token,
      user: { id: user._id, email: user.email, username: user.username },
    };
  }

  async getUser(retrievedEmail) {
    const user = await UserRepository.findByEmail(retrievedEmail);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      email: user.email,
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    };
  }

  async updateUser(email, updateDto) {
    console.log("Received updateDto:", updateDto);
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    console.log("User found:", user);

    const updateFields = {};

    if (updateDto.password) {
      updateFields.password = await bcryptUtil.hashPassword(updateDto.password);
    }

    if (updateDto.firstName) updateFields.firstName = updateDto.firstName;
    if (updateDto.lastName) updateFields.lastName = updateDto.lastName;
    if (updateDto.avatar) updateFields.avatar = updateDto.avatar;
    if (updateDto.bio) updateFields.bio = updateDto.bio;

    const updatedUser = await UserRepository.findByIdAndUpdate(
      user._id,
      updateFields
    );
    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      throw new Error("Error updating user");
    }

    const token = jwtUtil.generateToken({
      id: updatedUser._id,
      email: updatedUser.email,
    });

    return {
      token,
      user: {
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
      },
    };
  }

  async searchUserByEmail(email) {
    const user = await UserRepository.findByEmail(email.toLowerCase());

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      avatar: user.avatar || "",
      bio: user.bio || "",
    };
  }

  async addFriend(token, connectedUserEmail) {
    const userEmail = token;
    const relationshipDto = new RelationshipDto(
      userEmail,
      connectedUserEmail,
      "friend"
    );
    await RelationshipService.addFriend(userEmail, relationshipDto);
    return { message: "Friend successfully added" };
  }

  async deleteUser(email) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await UserRepository.delete(user._id);

    return { message: "User deleted successfully" };
  }
}

   

  
  

module.exports = new UserService();

class RegisterDto {
  constructor(password, firstName, lastName, bio, avatar) {
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.bio = bio;
      this.avatar = avatar;
      
  }
}

module.exports = RegisterDto;

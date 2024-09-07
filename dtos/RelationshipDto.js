class RelationshipDto {
  constructor(userEmail, connectedUserEmail, type) {
      this.userEmail = userEmail;
      this.connectedUserEmail = connectedUserEmail;
      this.type = type;
      
  }
}

module.exports = RelationshipDto;

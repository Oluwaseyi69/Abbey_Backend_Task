const RelationshipRepository = require('../repositories/RelationshipRepo');

class RelationshipService {
  async addFriend(userEmail, relationshipDto) {
    console.log(userEmail, relationshipDto);

    const existingRelationship = await RelationshipRepository.findByEmails(
      userEmail,
      relationshipDto.connectedUserEmail
    );

    if (existingRelationship) {
      throw new Error("Relationship already exists");
    }

    const relationship = await RelationshipRepository.create({
      initiator: userEmail,
      reciever: relationshipDto.connectedUserEmail,
      type: relationshipDto.type,
    });

    return relationship;
  }

  async viewFriends(RelationshipDto) {
    const relationships = await RelationshipRepository.findAllByEmail(
      RelationshipDto.userEmail
    );
    return relationships;
  }
}

module.exports = new RelationshipService();

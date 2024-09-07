const Relationship = require('../model/RelationshipModel');

class RelationshipRepository {
  async findByEmails(userEmail, connectedUserEmail) {
    return Relationship.findOne({
      $or: [
        { initiator: userEmail, receiver: connectedUserEmail },
        { initiator: connectedUserEmail, receiver: userEmail },
      ],
    });
  }

  async create(relationshipData) {
    const relationship = new Relationship(relationshipData);
    return relationship.save();
  }

  async findAllByEmail(userEmail) {
    return Relationship.find({
      $or: [{ userEmail }, { connectedUserEmail: userEmail }],
    });
  }
}

module.exports = new RelationshipRepository();

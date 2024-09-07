
const RelationshipService = require('../services/relationshipService');

class RelationshipController {
    async addFriend(req, res) {
        try {
            const RelationshipDto = req.body;
            const relationship = await RelationshipService.addFriend(RelationshipDto);
            res.status(201).json({ message: 'Relationship created successfully', relationship });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async viewFriends(req, res) {
        try {
            const { userEmail } = req.query;
            const relationships = await RelationshipService.getRelationships(userEmail);
            res.status(200).json({ relationships });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

  
}

module.exports = new RelationshipController();

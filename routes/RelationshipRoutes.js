
const express = require('express');
const router = express.Router();
const RelationshipController = require('../controllers/relationshipController');

router.post('/relationships', RelationshipController.createRelationship);
router.get('/relationships', RelationshipController.getRelationships);

module.exports = router;

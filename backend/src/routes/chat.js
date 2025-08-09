const express = require('express');
const router = express.Router();
const { getChatHistory, getActiveConversations } = require('../controllers/chat');


router.get('/chat/history/:userId', getChatHistory);
router.get('/chat/conversations', getActiveConversations);

module.exports = router;
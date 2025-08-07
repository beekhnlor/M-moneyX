// backend/src/routes/chatBot.js

const express = require('express');
const router = express.Router();
const { handleWebChat } = require('../controllers/chatBot');

router.post('/chat', handleWebChat);

module.exports = router;
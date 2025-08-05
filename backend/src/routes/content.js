const express = require('express')
const router = express.Router()
const { content  } = require('../controllers/conten')
const upload = require('../middleware/upload-image')
const { authCheck } = require('../middleware/auth')

router.post('/content-upload-images',authCheck,upload.array('image',10),content)

module.exports = router
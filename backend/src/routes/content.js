const express = require('express')
const router = express.Router()
const { content,getContents,updateContent,deleteContent  } = require('../controllers/conten')
const upload = require('../middleware/upload-image')
const { authCheck } = require('../middleware/auth')

router.post('/content-upload-images',authCheck,upload.array('image'),content)
router.get('/getcontent',authCheck,getContents)
router.put('/content/:id',authCheck,upload.array('image'), updateContent);
router.delete('/delete/content/:id',authCheck,deleteContent)

module.exports = router
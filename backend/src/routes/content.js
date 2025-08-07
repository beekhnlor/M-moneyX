const express = require('express')
const router = express.Router()
const { content,getContents,updateContent,deleteContent  } = require('../controllers/conten')
const upload = require('../middleware/upload-image')
const { authCheck,authAdmin } = require('../middleware/auth')

router.post('/content-upload-images',authCheck,authAdmin,upload.array('image'),content)
router.get('/getcontent',authCheck,authAdmin,getContents)
router.put('/content/:id',authCheck,authAdmin,upload.array('image'), updateContent);
router.delete('/delete/content/:id',authCheck,authAdmin,deleteContent)

module.exports = router
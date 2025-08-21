const express = require('express')
const router = express.Router()
const { content,getContents,updateContent,deleteContent  } = require('../controllers/conten')
const {upload,uploadChatFile} = require('../middleware/upload-image')
const { authCheck,authAdmin } = require('../middleware/auth')

router.post('/content-upload-images',authCheck,authAdmin,upload.array('image'),content)
router.get('/getcontent',getContents)
router.put('/content/:id',authCheck,authAdmin,upload.array('image'), updateContent);
router.delete('/delete/content/:id',authCheck,authAdmin,deleteContent)


router.post('/chat/upload', authCheck,uploadChatFile.single('file'), (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ error: 'No file selected or file type is not allowed.' });
    }

    try {
        
        const fileUrl = req.file.path; 

  
        const fileType = req.file.mimetype.startsWith('image') ? 'image' : 'file';

        res.status(200).json({
            message: 'File uploaded successfully to Cloudinary!',
            fileUrl: fileUrl,
            fileType: fileType
        });

    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Server error during file upload process.' });
    }
});

module.exports = router
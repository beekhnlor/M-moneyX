const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary/config');

const fileFilter = (req, file, cb) => {
  
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); 
  } else {
    cb(new Error('ກະລຸນາອັບໂຫຼດສະເພາະໄຟລ໌ຮູບເທົ່ານັ້ນ!'), false);
  }
};


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: 
   {
      folder: 'M-moneyX',
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, height: 600, crop: 'limit' }], 
      public_id: `M-moneyX_${req.user.id}_${Date.now()}`, 
    }
  },
);
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: fileFilter, 
});


module.exports = upload;
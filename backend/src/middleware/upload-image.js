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
  params: async (req, files) => {
    return {
      folder: 'M-moneyX',
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, height: 600, crop: 'limit' }],
      public_id: `admin_${req.user.id}_${Date.now()}`,
    };
  },
});
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: fileFilter, 
});



//chat
const chatFileFilter = (req, file, cb) => {

  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-rar-compressed'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('ไฟล์ประเภทนี้ไม่ได้รับอนุญาตให้ทำการอัปโหลดในแชท'), false);
  }
};

const chatStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {

    const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';
    
    return {
      folder: 'M-moneyX/chat_files', 
      resource_type: resourceType,
      public_id: `chat_${req.user ? req.user.id : 'guest'}_${Date.now()}`,
    };
  },
});

const uploadChatFile = multer({
  storage: chatStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
  fileFilter: chatFileFilter,
});


module.exports = {
  upload,
  uploadChatFile
}
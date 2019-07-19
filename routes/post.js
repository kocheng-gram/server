const router = require('express').Router()
const ControllerPost = require('../controllers/post')
const _multer = require('multer')
const gcsMiddleware = require('../middlewares/storage')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.post('/', multer.single('image'), gcsMiddleware.sendUploadToGCS , ControllerPost.post)
router.get('/', ControllerPost.findAll)

module.exports = router
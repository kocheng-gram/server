const router = require('express').Router()
const ControllerPost = require('../controllers/post')
const _multer = require('multer')
const uploadToLocal = _multer( {dest: './imageTemp'} )
const gcsMiddleware = require('../middlewares/storage')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.post('/validate', uploadToLocal.single('image'), (req, res, next) => {
  if (req.file) {
      const vision = require('@google-cloud/vision');
      const client = new vision.ImageAnnotatorClient({
          keyFilename: './credentials/GrouprojectWeek2.json'
      });
      client
        .labelDetection(`./imageTemp/${req.file.filename}`)
        .then(results => {
          console.log('calculating score')
          let catData = null;

          const labels = results[0].labelAnnotations;

          for (let i = 0; i < labels.length; i++) {
            if (labels[i].description == 'Cat') catData = labels[i]
            else res.status(200).json({score: 0.1})
          }

          if (catData !== null && catData.score >= 0.9) {
            return res.status(200).json({
              score: catData.score
            })
          }
        })
        .catch(next)
  } else {
    res.status(400).end()
  }
})
router.post('/', multer.single('image'), gcsMiddleware.sendUploadToGCS , ControllerPost.post)
router.get('/', ControllerPost.findAll)

module.exports = router
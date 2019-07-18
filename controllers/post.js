const Post = require('../models/post')
class ControllerPost {
  static post(req, res, next) {
    let {caption} = req.body
    let input = {caption}
    if(req.file && req.file.gcsUrl) {
      input.image = req.file.gcsUrl
      Post.create(input)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    } else {
      next({status: 500, message: 'unable to upload'})
    }
  }
}

module.exports = ControllerPost
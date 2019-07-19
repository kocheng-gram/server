const {Schema, model} = require('mongoose')

const postSchema = new Schema({
  image: String,
  caption: String
})

const Post = model('Post', postSchema)
module.exports = Post
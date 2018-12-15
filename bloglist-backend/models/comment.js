const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
  content: String
})

module.exports = Comment
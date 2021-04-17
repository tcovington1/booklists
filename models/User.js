const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  createdAt: String,
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
  }]
})

module.exports = model('User', userSchema);
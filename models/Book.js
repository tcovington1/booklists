const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  price: Number,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
});

module.exports = model('Book', bookSchema)
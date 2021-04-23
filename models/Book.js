const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  price: Number,
  createdAt: String,
});

module.exports = model('Book', bookSchema)
const { UserInputError } =require('apollo-server')

const Book = require('../../models/Book');
const checkAuth = require('../../util/checkAuth')
const { validateBookInput } = require('../../util/validators')

module.exports = {
  // Query: {
  //   async getBooks() {

  //   }
  // },
  Mutation: {
    async addBook(_, {
      book: { title, description, author, price }
    }, context) {
      const user = checkAuth(context)
      const { valid, errors } = validateBookInput(title, description, author, price)

      if(!valid){
        throw new UserInputError("Errors", { errors })
      }

      const isExistingBook = await Book.findOne({ title })

      if(isExistingBook){
        throw new UserInputError("Book already exists", {
          errors: {
            email: 'Book already exists'
          }
        })
      }

      const newBook = new Book({
        title,
        description,
        author,
        price,
        user: user.id
      })

      const book = await newBook.save()
      user.books = book._id
      await user.save(function(){})

      return book

    }
  }
}
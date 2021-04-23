const { UserInputError, AuthenticationError } =require('apollo-server')

const Book = require('../../models/Book');
const User = require('../../models/User')
const checkAuth = require('../../util/checkAuth')
const { validateBookInput } = require('../../util/validators')

module.exports = {
  Query: {
    async getAllBooks() {
      const books = await Book.find()
      return books
    },
    async getUsersBooks(_, __, context) {
      const user = checkAuth(context)
      const fullUser = await User.findById(user.id)

      console.log(`user ${fullUser}`)

      const books = fullUser.books.map(async function(id){
        var book = await Book.findById(id);
        return book
    });

    return books
    }
  },
  Mutation: {
    async createBook(_, {
      book: { title, description, author, price }
    }, context) {
      const user = checkAuth(context)
      const { valid, errors } = validateBookInput(title, description, author, price)
      if(!valid){
        throw new UserInputError("Errors", { errors })
      }
      const isExistingBook = await Book.findOne({ title })

      if(isExistingBook) {
        throw new UserInputError("Book already exists in the library", {
          errors: {
            email: 'Book already exists in the library'
          }
        })
      } else {
        const newBook = new Book({
          title,
          description,
          author,
          price
        })

        const book = await newBook.save()
        return book
      }
    },
    async addBook(_, {bookId}, context) {
      const user = checkAuth(context)

      const fullUser = await User.findById(user.id)
      const book = await Book.findById(bookId)

      const isBookFavorited = await fullUser.books.find((userBook) => {
        return userBook.id == bookId
      })
      if (isBookFavorited) {
        throw new UserInputError("Book already in book list", {
          errors: {
            email: 'Book is already in book list'
          }
        })
      } else {
        // fullUser.books.push(book)
        await User.findByIdAndUpdate(user.id, {
          $push: { books: book },
          $inc: { bookCount: 1 },
        }); 
        return 'Book saved to favorites'
      } 
    },
    async deleteBook(_, {bookId}, context) {
      const user = checkAuth(context)
      console.log(`bookId: ${bookId}`)
      try {
        if(user) {
          await Book.findByIdAndRemove(bookId)
          return 'The book has been deleted'
        } else {
          throw new AuthenticationError('Action is not allowed. You must be a user')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}


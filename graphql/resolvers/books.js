const { UserInputError } =require('apollo-server')

const Book = require('../../models/Book');
const User = require('../../models/User')
const checkAuth = require('../../util/checkAuth')
const { validateBookInput } = require('../../util/validators')

module.exports = {
  Query: {
    async getBooks(_, __, context) {
      const user = checkAuth(context)
      try {
        const books = await Book.find()
        const userBooks = books.map((book) => {
          if(user.id == book.user) {
            return book
          }
        })
        console.log(`userBooks: ${userBooks}`)
        return userBooks
      } catch (error) {
        throw new Error(error)
      }
    }
  },
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
        const bookUsers = isExistingBook.users
        const isFavorited = bookUsers.find(bookUser => {
          return bookUser == user.id
        })

        if (isFavorited) {
          throw new UserInputError("Book already in book list", {
            errors: {
              email: 'Book is already in book list'
            }
          })
        } else {
          await isExistingBook.users.push(user.id)
          isExistingBook.save()
          console.log(`isExistingBook 2: ${isExistingBook}`)
          return isExistingBook
        } 
      } else {
        const newBook = new Book({
          title,
          description,
          author,
          price,
          users: user.id
        })
  
        const book = await newBook.save()
        await User.findByIdAndUpdate(user.id, {
          $push: { books: book._id },
          $inc: { bookCount: 1 },
        }); 
        return book
      }

    }
  }
}


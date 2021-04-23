const gql = require('graphql-tag');

module.exports = gql`
  type Book {
    id: ID!
    title: String!
    description: String!
    author: String!
    price: Int
    users: [User]
  }
  type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    books: [Book]
    bookCount: Int
  }
  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    confirmedPassword: String!
    email: String!
  }
  input addBookInput {
    title: String!
    description: String!
    author: String!
    price: Int
  }
  type Query {
    getAllBooks: [Book]
    getUsersBooks: [Book]
    me: User
  }
  type Mutation {
    addBook(bookId: ID!): String!
    createBook(book: addBookInput!): Book!
    deleteBook(bookId: ID!): String!
    register(registerInput: RegisterInput!): User!
    login(email: String!, password: String!): User!
  }
`
const bookResolvers = require('./books');
const userResolvers = require('./users');

module.exports = {
  Query: {
    ...bookResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...bookResolvers.Mutation
  }
}
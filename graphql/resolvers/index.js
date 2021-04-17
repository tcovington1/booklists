const bookResolvers = require('./books');
const userResolvers = require('./users');

module.exports = {
  Query: {
    ...bookResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...bookResolvers.Mutation
  }
}
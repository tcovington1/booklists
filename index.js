const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config')

const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => server.listen({ port:5000 }))
  .then((res) => console.log(`MongoDB connected, server running on port ${res.url}`))
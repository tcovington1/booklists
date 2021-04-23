const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } =require('apollo-server')

const checkAuth = require('../../util/checkAuth')
const { validateRegisterInput } = require('../../util/validators')
const { validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');

function generateToken(user){
  return jwt.sign({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Query: {
    // async getUsers() {

    // },
    async me(_, __, context) {
      const user =  await checkAuth(context)
      const me = await User.findById(user.id)
      console.log(me)
      return me
    }
  },
  Mutation: {
    async register(parent, {
      registerInput: { firstName, lastName, email, password, confirmedPassword } 
    }){
      const { valid, errors } = validateRegisterInput(firstName, lastName, email, password, confirmedPassword )

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // 2. Make sure user doesn't already exist
      const user = await User.findOne({ email })

      if(user) {
        throw new UserInputError('Email is already on file', {
          errors: {
            email: 'Email is already on file'
          }
        })
      }

        // 3. Hash password before storing it && Create auth token
        password = await bcrypt.hash(password, 12)

        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          createdAt: new Date().toISOString()
        })

        const res = await newUser.save()

        const token = generateToken(res)

        return {
          ...res._doc,
          id: res._id,
          token
        }
    },
    async login(parent, { email, password }) {
      const { valid, errors } =  validateLoginInput(email, password)

      if(!valid){
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ email })

      if(!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      } 

      const match = await bcrypt.compare(password, user.password)

      if(!match) {
        errors.general = 'Invalid credentials'
        throw new UserInputError('Invalid credentials', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  }

}
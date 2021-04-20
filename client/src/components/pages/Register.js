import { useState, useContext } from 'react'
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import useForm from '../../lib/useForm'
import { Error } from '../Error'

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmedPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        confirmedPassword: $confirmedPassword
        email: $email
      }
    ){
      id email firstName lastName token
    }
  }
`;

export const Register = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: ''
  });

  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData }}) {
      console.log(`results: ${userData}`)
      context.login(userData)
      props.history.push('/dashboard')
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: inputs
  })

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
 
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-14 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
                console.log(inputs)
                addUser()
              }}>
                {Object.keys(errors).length > 0 && (
                  Object.values(errors).map((value) => {
                    return <Error value={value}/>
                  })
                )}
                
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text" 
                      value={inputs.firstName}
                      onChange={handleChange} 
                      error={errors.firstName ? true : false}
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                      />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="lastName" 
                      value={inputs.lastName}
                      onChange={handleChange}
                      error={errors.lastName ? true : false} 
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                      />
                  </div>
                </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      value={inputs.email}
                      onChange={handleChange} 
                      error={errors.email ? true : false}
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                      />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                <input 
                      id="password" 
                      name="password" 
                      type="password"
                      value={inputs.password}
                      onChange={handleChange}
                      error={errors.password ? true : false}  
                      autoComplete="current-password" 
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
              </div>
              <div>
                  <label htmlFor="confirmedPassword" className="block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="mt-1">
                    <input 
                    id="confirmedPassword" 
                    name="confirmedPassword" 
                    type="password" 
                    value={inputs.confirmedPassword}
                    error={errors.confirmedPassword ? true : false}
                    onChange={handleChange}  
                    required 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up   
                </button>
                <p className="my-2 mx-2 text-center text-sm text-gray-600 max-w">
            Already have an account?
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              <Link to="/">Sign in</Link>
            </a>
          </p>
              </div>
            </form>
          </div>
        </div>
    </div>
    </>
  )
}

import { useState } from 'react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import useForm from '../lib/useForm';
import { Error } from './Error';

const CREATE_BOOK_MUTATION = gql`
    mutation createBook(
      $title: String!
      $description: String!
      $author: String!
      $price: Int
    ){
      createBook(
        book:{
        title: $title
        description: $description
        author: $author
        price: $price
        }
        ) {
          id title description author price
        }
    }
    `
export const BookForm = (props) => {
  // const [errors, setErrors] = useState({})
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: '',
    description: '',
    author: '',
    price: 0
  });

  const [createBook, { error }] = useMutation(CREATE_BOOK_MUTATION, {
    variables: inputs,
    update(_, result){
      console.log(result)
      inputs.title = ''
      inputs.description = ''
      inputs.author = ''
      inputs.price = 0

    }
  })

  return (
    <>
      <div className=" mt-8 w-1/2 bg-gray-100 flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Add a Book</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-14 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
                createBook()
              }}>
                 {/* {Object.keys(errors).length > 0 && (
                  Object.values(errors).map((value) => {
                    return <Error value={value}/>
                  })
                )} */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      value={inputs.title}
                      onChange={handleChange} 
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                      />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                <input 
                      id="description" 
                      name="description" 
                      type="textbox"
                      value={inputs.description}
                      onChange={handleChange}  
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <div className="mt-1">
                <input 
                      id="author" 
                      name="author" 
                      type="text"
                      value={inputs.author}
                      onChange={handleChange}  
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                <input 
                      id="price" 
                      name="price" 
                      type="number"
                      value={inputs.price}
                      onChange={handleChange}  
                      required 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"


const GET_ALL_BOOKS = gql`
  query getAllBooks {
    getAllBooks {
      id
      title
      description
      author
      price
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation addBook($bookId: ID!) {
  addBook(bookId: $bookId)
}
`;

export const AddBookButton = ({ bookId }) => {

  const [addBook] = useMutation(ADD_BOOK_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: GET_ALL_BOOKS
      });
      proxy.writeQuery({ query: GET_ALL_BOOKS, data})
    },
    
    variables: {
      bookId
    }
  })

  return (
    <div>
       <button className="text-indigo-600 hover:text-indigo-900" 
          onClick={addBook}>
          Add
          </button>
    </div>
  )
}

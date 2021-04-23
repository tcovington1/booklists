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

const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId)
}
`;

export const DeleteButton = ( {bookId}) => {

  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
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
          onClick={deleteBook}>
          Delete
          </button>
    </div>
  )
}

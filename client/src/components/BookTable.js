import { useState } from 'react';
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId)
}
`;
const ADD_BOOK_MUTATION = gql`
  mutation addBook($bookId: ID!) {
  addBook(bookId: $bookId)
}
`;

export default function BookTable({ bookData }) {
  const [ bookId, setBookId ] = useState('')

  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    variables: {
      bookId
    }
  })
  const [addBook] = useMutation(ADD_BOOK_MUTATION, {
    variables: {
      bookId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Add</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookData.map((book, bookIdx) => (
                  <tr key={book.id} className={bookIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userBook.description}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">This is a hardcoded description</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${book.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            setBookId(book.id)
                            addBook() 
                          }} >
                        Add
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900" 
                        onClick={() => {
                            // const bookId = parseInt(book.id)
                            setBookId(book.id)
                            // console.log(bookId)
                            // console.log(typeof bookId)
                            deleteBook() 
                          }} 
                          >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

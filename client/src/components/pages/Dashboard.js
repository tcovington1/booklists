import { useQuery, useContext } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from 'react-router-dom'

import BookData from "../BookData";
import BookTable from '../BookTable'
import { Page } from './Page'

// const GET_USER_DETAILS = gql`
//   query getUserDetails {
//     me {
//       firstName
//       lastName
//       email
//       bookCount
//     }      
//   }
// `

const GET_USER_BOOKS = gql`
query getUsersBooks{
  getUsersBooks{
    id
  	title
    description
    author
    price
  }
}
`

export const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USER_BOOKS, { fetchPolicy: "network-only" });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  console.log(`data ${data}`)

  const isBookList = data.getUsersBooks.map((book) => {
    return book
  })
  
  console.log(`isBookList: ${isBookList}`)

  return (
    <Page pageTitle={'Dashboard'}>
      <div className="rounded-md bg-blue-200 p-4 mb-8">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-cyan-800">Welcome!</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>
             The purpose of this application is to build your book wishlist! If you don't see any books in your list below
             go ahead and add one from the library. If you don't see your book in the library you can add a new book.
            </p>
          </div>
        </div>
      </div>
    </div>
      {/* { data.getUsersBooks ? <BookTable bookData={data.getUsersBooks} addEditEnabled={false}  /> : <h1>You currently don't have any books in your list. Let's get some added!</h1>} */}
      <BookTable bookData={data.getUsersBooks} addEditEnabled={false} />
       
       <div className="grid justify-items-center m-10">
        <Link to='/all-books'  className="rounded-md shadow w-15 flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
            Add a book
        </Link>
      </div>
    </Page>
  )
}

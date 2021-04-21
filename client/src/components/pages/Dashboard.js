import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from 'react-router-dom'

import BookTable from '../BookTable'
import { Page } from './Page'

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
  const { loading, error, data } = useQuery(GET_USER_BOOKS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const isBookList = data.getUsersBooks.map((book) => {
    return book
  })
  
  console.log(`isBookList: ${isBookList}`)

  return (
    <Page pageTitle={'Dashboard'}>
      { data.getUsersBooks.title ? <BookTable bookData={data.getUsersBooks} /> : <h1>You currently don't have any books in your list. Let's get some added!</h1>}
       <div className="grid justify-items-center">
        <Link to='/all-books'  className="rounded-md shadow w-15 flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
            Add a book
        </Link>
      </div>
    </Page>
  )
}

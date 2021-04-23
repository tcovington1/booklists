import { useState } from 'react'
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

import BookTable from '../BookTable'
import { Page } from "./Page";
import { BookForm } from '../BookForm'

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

export const AllBooks = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);
  const [ form, setForm ] = useState(false)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  
  return (
    <Page pageTitle={'Book Library'}>
      <div className='mb-5 text-center'>
        <h1>Either choose a book from the library or add a new book.</h1>
      </div>
      <BookTable bookData={data.getAllBooks} addEditEnabled={true} />
      <div className="grid justify-items-center m-10">
        <button onClick={() => setForm(!form)} className="rounded-md shadow w-15 flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
            { form ? 'Close' : 'Add a new book' }
        </button>
        {form && <BookForm /> }
      </div>
    </Page>
  )
}

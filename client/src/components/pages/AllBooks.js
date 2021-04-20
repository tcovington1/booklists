import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import BookTable from '../BookTable'
import { Page } from "./Page";

const GET_ALL_BOOKS = gql`
  query getAllBooks {
    getAllBooks {
      title
      description
      author
      price
    }
  }
`;

export const AllBooks = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOOKS);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  
  return (
    <Page pageTitle={'All Books'}>
      <BookTable bookData={data.getAllBooks} />
    </Page>
  )
}

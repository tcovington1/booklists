import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import BookTable from '../BookTable'
import { Page } from './Page'

const GET_USER_BOOKS = gql`
query getUsersBooks{
  getUsersBooks{
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

  return (
    <Page pageTitle={'Dashboard'}>
      <BookTable bookData={data.getUsersBooks} />
    </Page>
  )
}

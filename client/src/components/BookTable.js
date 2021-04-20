import { useQuery, useContext } from "@apollo/client";
import gql from "graphql-tag";

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
// const people = [
//   { ticker: 'AAPL', yield: '3.87%', income: '$384', shareCount: '3' },
//   { ticker: 'SPG', yield: '6.73', income: '$6,473', shareCount: '19' },
//   // More people...
// ]

export default function BookTable() {
  const { loading, error, data } = useQuery(GET_USER_BOOKS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  console.log(data)

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
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.getUsersBooks.map((userBook, bookIdx) => (
                  <tr key={userBook.title} className={bookIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{userBook.title}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userBook.description}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">This is a hardcoded description</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userBook.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${userBook.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

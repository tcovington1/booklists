import { useState } from 'react';

import { DeleteButton } from './DeleteButton'
import { AddBookButton } from './AddBookButton' 

export default function BookTable({ bookData, addEditEnabled }) {
  

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
                  { addEditEnabled && (
                    <>
                      <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Add</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </>
                  )
                  }
                  
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookData.map((book, bookIdx) => (
                  <>
                    {console.log(`book: ${book}`)}
                  <tr key={book.id} className={bookIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userBook.description}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">This is a hardcoded description</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${book.price}</td>
                   {addEditEnabled && (
                     <>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AddBookButton bookId={book.id}/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                     </>
                   )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <DeleteButton bookId={book.id} isDelete={addEditEnabled}/>
                    </td>
                  </tr>
                  </>
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

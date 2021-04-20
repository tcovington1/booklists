import { XCircleIcon } from '@heroicons/react/solid'

export const Error = ({ value }) => {
  return (
    <>
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Ooops! There was an error</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul>
                <li>
                  {value}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

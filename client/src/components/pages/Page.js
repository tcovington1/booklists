import { Nav } from '../Nav'

export const Page = ({ children, pageTitle }) => {
  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Nav />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
              {/* Add additional Dash data here */}
                {/* <DashData /> */}
              </div>
              <div className="py-4">
              {children}
              </div>
            </div>
            <button className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-15 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Add a book
                  </a>
                </button>
          </div>
        </main>
      </div>
    </>
  )
}

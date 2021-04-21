
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
          
          </div>
        </main>
      </div>
    </>
  )
}

const stats = [
  { name: 'Daily', stat: '$105.37' },
  { name: 'Monthly', stat: '$378.43' },
  { name: 'Yearly', stat: '$32,973' },
]

export default function BookData() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Your Book List</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
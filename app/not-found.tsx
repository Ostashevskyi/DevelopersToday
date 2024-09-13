import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Could not find the requested resource
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Return Home
      </Link>
    </div>
  );
}

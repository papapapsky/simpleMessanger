import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <main className="mt-20 flex justify-center">
      <div className="shadow-2xl rounded-xl bg-neutral-800 border border-gray-700  w-150 p-5 m-5 pb-10">
        <h1 className="text-center text-2xl mb-5">Page not found</h1>
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
        >
          Go to main page
        </Link>
      </div>
    </main>
  );
};

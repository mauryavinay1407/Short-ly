import { redirect } from 'next/navigation';
import URL from '@/models/url.model';
import { dbConnect } from '@/dbConfig/dbConfig';
import NotFound from '../not-found';


dbConnect();
export default async function RedirectPage({ params }: { params: { id: string } }) {
  const shortId = params.id;
  const url = await URL.findOne({ shortId });

  if (url) {
    await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitInfo: {
            timestamp: Date.now(),
          },
        },
      }
    );
    redirect(url.redirectURL);
  } else {
    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-500 mb-6">
          It might have been moved or deleted, or maybe you typed the URL incorrectly.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
    );
  }
}

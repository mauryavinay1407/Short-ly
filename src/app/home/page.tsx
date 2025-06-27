"use client";
import { GlowingButton } from '@/components/GlowingButton';
import { ModeToggle } from '@/components/ThemeToggler';
import Head from 'next/head';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loading } from '@/components/Loading'; 

const Home: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      toast.error("Please enter a URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/url', { url: originalUrl });
      if (response.status === 201) {
        setShortUrl(`${window.location.origin}/${response.data.Id}`);
        toast.success("Short URL created!");
      } else {
        toast.error(response.data.error || "Failed to shorten URL.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigator.clipboard.writeText(shortUrl);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-black w-full relative">
      <Head>
        <title>Short-ly - URL Shortener</title>
        <meta name="description" content="Shorten your URLs effortlessly with Short-ly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ModeToggle />
        <button
          className="bg-slate-700 p-2 px-4 rounded-lg hover:opacity-80 text-white"
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </button>
      </div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-gray-200 mb-4">
          Welcome to <span className="text-yellow-300">Short-ly</span>
        </h1>
        <p className="mt-3 text-lg md:text-2xl text-slate-950 dark:text-gray-300">
          Shorten your URLs effortlessly and share them with the world.
        </p>

        <div className="mt-10 flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-full md:rounded-full text-lg border-2 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition"
            placeholder="Paste your URL here"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            disabled={loading}
          />
          <GlowingButton onClick={handleShorten} disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </GlowingButton>
        </div>

        {shortUrl && (
          <div className="mt-8 flex items-center justify-between w-full max-w-lg mx-auto bg-gray-900 hover:bg-slate-950 p-4 rounded-lg border border-gray-700 transition">
            <span className="text-gray-200 text-lg truncate">{shortUrl}</span>
            <button
              onClick={copyToClipboard}
              className="ml-4 bg-yellow-300 p-2 rounded-lg text-lg font-bold text-black hover:bg-yellow-400 transition"
              title="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v10M12 7v10m4-10v10"
                />
              </svg>
            </button>
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-16 md:h-24 border-t border-gray-700 mt-8">
        <div className="text-gray-400 text-sm md:text-base">
          Copyright ©️ 2025 Short-ly. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;

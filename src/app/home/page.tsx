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
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 dark:bg-gradient-to-r from-neutral-900 via-gray-900 to-stone-900 relative">
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

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-0 text-center">
        <div className="w-full max-w-2xl mt-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to <span className="text-yellow-300">Short-ly</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Shorten your URLs effortlessly and share them with the world.
          </p>

          <div className="mt-10 flex flex-col md:flex-row w-full gap-3">
            <input
              type="text"
              className="flex-1 p-3 placeholder:text-center rounded-full text-lg border-2 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition"
              placeholder="Paste your URL here"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              disabled={loading}
            />
            <div className="w-full md:w-auto">
              <GlowingButton onClick={handleShorten} disabled={loading}>
                {loading ? "Shortening..." : "Shorten"}
              </GlowingButton>
            </div>
          </div>

          {shortUrl && (
            <div className="mt-8 flex items-center justify-between w-full bg-gray-900 hover:bg-slate-950 p-4 rounded-lg border border-gray-700 transition">
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
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">Custom Short Links</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Create memorable, custom short URLs</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">User Dashboard:</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm"> Manage, track, and delete your links in a personal dashboard.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">Analytics Ready</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Track clicks and engagement with detailed insights</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full mt-16">
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30">
          <div className="flex items-center justify-center py-6">
            <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
              Copyright ©️ 2025{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">
                Short-ly
              </span>
              . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

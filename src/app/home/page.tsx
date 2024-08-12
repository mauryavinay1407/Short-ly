"use client";
import { GlowingButton } from '@/components/GlowingButton';
import { ModeToggle } from '@/components/ThemeToggler';
import Head from 'next/head';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [originalUrl,setOriginalUrl]=useState<string>('');
  const handleShorten = async() => {
    try {
      const response = await axios.post('/api/url', { url: originalUrl });
      if (response.status === 201) {
        setShortUrl(`${window.location.origin}/${response.data.Id}`);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('An error occurred:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const router=useRouter();
  const copyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigator.clipboard.writeText(shortUrl);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-black w-full dark:border dark:border-white/[0.1] relative">
      <button className="absolute top-4 right-16 bg-slate-700 p-2 px-4 rounded-lg hover:opacity-80 text-white"
      onClick={()=>router.push('/dashboard')}
      >
        Dashboard
      </button>
      
      <Head>
        <title>Short-ly - URL Shortener</title>
        <meta name="description" content="Shorten your URLs effortlessly with Short-ly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-gray-200 mb-4">
          Welcome to <span className="text-yellow-300">Short-ly</span>
        </h1>

        <p className="mt-3 text-lg md:text-2xl text-slate-950 dark:text-gray-300">
          Shorten your URLs effortlessly and share them with the world.
        </p>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row w-full max-w-sm md:max-w-lg mx-auto">
          <input
            type="text"
            className="w-full p-1 md:p-3 rounded-full text-lg bg-transparent border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-gray-900 dark:text-gray-200"
            placeholder="Paste your URL here"
            onChange={(e)=>setOriginalUrl(e.target.value)}
          />
          <GlowingButton onClick={handleShorten}> Shorten </GlowingButton>
        </div>

        {shortUrl && (
          <div className="mt-8 flex items-center justify-between w-full max-w-sm md:max-w-lg mx-auto bg-gray-900 hover:bg-slate-950 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-200 text-lg truncate">{shortUrl}</p>
            <button
              onClick={copyToClipboard}
              className="ml-4 bg-yellow-300 p-2 rounded-lg text-lg font-bold text-black hover:bg-yellow-400"
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

      <footer className="flex items-center justify-center w-full h-16 md:h-24 border-t border-gray-700 mt-8 md:mt-0">
        <div className="flex items-center justify-center text-gray-400 text-sm md:text-base">
          Copyright ©️ 2024 Short-ly All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Home;

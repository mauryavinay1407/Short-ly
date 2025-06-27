'use client';
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { FaArrowLeft } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Link from 'next/link';
import axios from 'axios';

const PAGE_SIZE = 5;

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-2">
      <div className="h-[1.8rem] bg-gray-300 rounded w-52" />
    </td>
    <td className="p-2">
      <div className="h-[1.8rem] bg-gray-300 rounded w-48" />
    </td>
    <td className="p-2">
      <div className="h-[1.8rem] bg-gray-300 rounded w-10" />
    </td>
    <td className="p-2">
      <div className="h-[1.8rem] bg-gray-300 rounded w-20" />
    </td>
    <td className="p-2">
      <div className="h-[1.8rem] bg-gray-300 rounded w-8" />
    </td>
  </tr>
);

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios
      .get(`/api/url?userId=${user.id}`)
      .then((res) => setUrls(res.data.urls))
      .catch(() => setUrls([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (shortId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this URL?'
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/url?shortId=${shortId}`);
      setUrls((prev) => prev.filter((url) => url.shortId !== shortId));
    } catch (err) {
      alert('Failed to delete URL.');
    }
  };

  const paginatedUrls = urls.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(urls.length / PAGE_SIZE);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 dark:bg-gradient-to-r from-neutral-900 via-gray-900 to-stone-900">
      <div className="w-full max-w-5xl mt-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Link href="/home" className="text-xl">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-gray-100">
            My URL's
          </h1>
          <div className="flex items-center">
          <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-700">
                <th className="p-2 text-left">Short URL</th>
                <th className="p-2 text-left">Original URL</th>
                <th className="p-2 text-left">Clicks</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-[2px] text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : paginatedUrls.length > 0 ? (
                paginatedUrls.map((url) => (
                  <tr
                    key={url.shortId}
                    className="border-b border-gray-300 dark:border-slate-700"
                  >
                    <td className="p-2 w-52 max-w-[13rem] truncate">
                      <a
                        href={`/${url.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline block"
                      >
                        {typeof window !== 'undefined'
                          ? `${window.location.origin}/${url.shortId}`
                          : url.shortId}
                      </a>
                    </td>
                    <td className="p-2 w-48 max-w-[12rem] truncate">
                      {url.redirectURL}
                    </td>
                    <td className="p-2 w-10">{url.clickCount}</td>
                    <td className="p-2 w-20">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                    <td
                      className="p-2 w-8 cursor-pointer"
                      onClick={() => handleDelete(url.shortId)}
                    >
                      <MdDeleteOutline size={24} color="red" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No URLs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-300 dark:bg-slate-700"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="px-2 py-1">
              {page} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-300 dark:bg-slate-700"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

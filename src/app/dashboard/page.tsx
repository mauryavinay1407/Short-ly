'use client';
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { FaArrowLeft } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Link from 'next/link';
import axios from 'axios';
import { Modal } from '@/components/Modal';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PAGE_SIZE = 5;

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-2 w-52">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
    <td className="p-2 w-48">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
    <td className="p-2 w-10">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
    <td className="p-2 w-20">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
    <td className="p-2 w-8">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
    <td className="p-2 w-20">
      <div className="h-[1.8rem] w-full bg-gray-300 rounded" />
    </td>
  </tr>
);


const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [analyticsUrl, setAnalyticsUrl] = useState<any | null>(null);

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

  const openAnalytics = (url: any) => setAnalyticsUrl(url);
  const closeAnalytics = () => setAnalyticsUrl(null);

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
                <th className="p-[2px] text-left">Analytics</th>
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
                    <td className="p-2 w-52 max-w-[16rem] truncate">
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
                    <td className="p-2 w-48 max-w-[16rem] truncate">
                      {url.redirectURL}
                    </td>
                    <td className="p-2 w-10">{url.clickCount}</td>
                    <td className="p-2 w-24">
                      {new Date(url.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td
                      className="p-2 w-8 cursor-pointer"
                      onClick={() => handleDelete(url.shortId)}
                    >
                      <MdDeleteOutline size={24} color="red" />
                    </td>
                    <td className="p-2 w-4">
                      <button
                        className="text-blue-500 underline"
                        onClick={() => openAnalytics(url)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
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
        {/* Analytics Modal */}
        {analyticsUrl && (
          <Modal onClose={closeAnalytics}>
            <h2 className="text-xl font-bold mb-4">
              Analytics for {analyticsUrl.shortId}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  analyticsUrl.visitInfo
                    .map((v: any) => ({
                      date: new Date(v.timestamp).toLocaleDateString(),
                      count: 1,
                    }))
                    // Group by date
                    .reduce((acc: any[], curr: any) => {
                      const found = acc.find((a) => a.date === curr.date);
                      if (found) found.count += 1;
                      else acc.push({ ...curr });
                      return acc;
                    }, [])
                }
              >
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#facc15" />
              </LineChart>
            </ResponsiveContainer>
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 rounded text-black font-semibold"
              onClick={closeAnalytics}
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

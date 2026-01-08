import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUrl, getUrlStats } from '../../redux/actions/urlActions';
import { format } from 'date-fns';
import { FaCopy, FaTrash, FaExternalLinkAlt, FaChartBar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const URLTable = () => {
  const { urls, loading } = useSelector((state) => state.url);
  const dispatch = useDispatch();
  const [expandedUrl, setExpandedUrl] = useState(null);
  const [showStats, setShowStats] = useState(null);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('URL copied to clipboard!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      dispatch(deleteUrl(id));
    }
  };

  const handleViewStats = async (id) => {
    try {
      const stats = await dispatch(getUrlStats(id));
      setShowStats({ id, stats });
    } catch (error) {
      // Error handled in action
    }
  };

  const truncateUrl = (url, length = 50) => {
    return url.length > length ? `${url.substring(0, length)}...` : url;
  };

  if (loading && urls.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No URLs created yet.</p>
        <p className="text-gray-400 mt-2">Create your first short URL!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Original URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {urls.map((url) => (
            <tr key={url.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="max-w-xs">
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setExpandedUrl(expandedUrl === url.id ? null : url.id)}
                    title={url.longUrl}
                  >
                    {truncateUrl(url.longUrl)}
                  </span>
                  {expandedUrl === url.id && (
                    <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                      {url.longUrl}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                  {url.shortCode}
                </code>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <a
                    href={`/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {window.location.origin}/{url.shortCode}
                  </a>
                  <button
                    onClick={() => handleCopy(`${window.location.origin}/${url.shortCode}`)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaCopy />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold">{url.clicks || 0}</span>
              </td>
              <td className="px-6 py-4">
                {format(new Date(url.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewStats(url.id)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="View Stats"
                  >
                    <FaChartBar />
                  </button>
                  <a
                    href={`/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 p-1"
                    title="Visit URL"
                  >
                    <FaExternalLinkAlt />
                  </a>
                  <button
                    onClick={() => handleDelete(url.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">URL Statistics</h3>
              <button
                onClick={() => setShowStats(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Clicks</p>
                <p className="text-2xl font-bold">{showStats.stats.totalClicks || 0}</p>
              </div>
              {/* Add more stats here as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLTable;
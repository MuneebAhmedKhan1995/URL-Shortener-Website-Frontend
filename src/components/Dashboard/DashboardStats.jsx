import React from 'react';
import { useSelector } from 'react-redux';
import { FaLink, FaMousePointer, FaChartLine } from 'react-icons/fa';

const DashboardStats = () => {
  const { urls, totalUrls, limitReached } = useSelector((state) => state.url);
  
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const averageClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total URLs</p>
            <p className="text-3xl font-bold text-gray-800">{totalUrls}</p>
            <p className="text-xs text-gray-500 mt-1">Max 100 URLs allowed</p>
          </div>
          <FaLink className="text-4xl text-blue-500" />
        </div>
        {limitReached && (
          <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
            ⚠️ URL limit reached. Please upgrade to create more URLs.
          </div>
        )}
      </div>

      <div className="card bg-gradient-to-r from-green-50 to-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{totalClicks}</p>
            <p className="text-xs text-gray-500 mt-1">All time clicks</p>
          </div>
          <FaMousePointer className="text-4xl text-green-500" />
        </div>
      </div>

      <div className="card bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Avg. Clicks/URL</p>
            <p className="text-3xl font-bold text-gray-800">{averageClicks}</p>
            <p className="text-xs text-gray-500 mt-1">Average performance</p>
          </div>
          <FaChartLine className="text-4xl text-purple-500" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
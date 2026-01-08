import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserUrls } from '../redux/actions/urlActions';
import { getProfile } from '../redux/actions/authActions';
import ShortenForm from '../components/URLShortener/ShortenForm';
import DashboardStats from '../components/Dashboard/DashboardStats';
import URLTable from '../components/Dashboard/URLTable';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { urls, loading } = useSelector((state) => state.url);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchUserUrls());
  }, [dispatch]);

  if (loading && urls.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage and track your shortened URLs</p>
        </div>
      </div>

      <ShortenForm />
      <DashboardStats />
      
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your URLs</h2>
          <span className="text-sm text-gray-500">
            {urls.length} URL{urls.length !== 1 ? 's' : ''}
          </span>
        </div>
        <URLTable />
      </div>
    </div>
  );
};

export default Dashboard;
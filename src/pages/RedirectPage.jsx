import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { FaExclamationTriangle } from 'react-icons/fa';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const response = await fetch(`/api/${shortCode}`, {
          method: 'GET',
        });

        if (response.redirected) {
          window.location.href = response.url;
        } else if (response.status === 404) {
          setError('Short URL not found');
        } else {
          const data = await response.json();
          if (data.longUrl) {
            window.location.href = data.longUrl;
          } else {
            setError('Invalid URL');
          }
        }
      } catch (err) {
        setError('Failed to redirect. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    redirectToOriginalUrl();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Redirecting to your destination...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <a
          href="/"
          className="btn-primary"
        >
          Go Back Home
        </a>
      </div>
    );
  }

  return null;
};

export default RedirectPage;
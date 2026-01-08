import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrl } from '../../redux/actions/urlActions';
import { FaLink, FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const dispatch = useDispatch();
  const { loading, limitReached } = useSelector((state) => state.url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (limitReached) {
      toast.error('You have reached the maximum limit of 100 URLs. Please upgrade.');
      return;
    }

    if (!longUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      const result = await dispatch(shortenUrl(longUrl));
      if (result) {
        setShortenedUrl(result);
        setLongUrl('');
      }
    } catch (error) {
      // Error handled in action
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      const fullUrl = `${window.location.origin}/${shortenedUrl.shortCode}`;
      navigator.clipboard.writeText(fullUrl);
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <div className="card mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shorten Your URL
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className="input-field pl-10"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || limitReached}
            className="btn-primary flex-shrink-0 w-full md:w-auto px-8"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {limitReached && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              ⚠️ You've reached the maximum of 100 URLs. Please upgrade your account to create more short URLs.
            </p>
          </div>
        )}
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium mb-2">✅ URL shortened successfully!</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a
                href={`/${shortenedUrl.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {window.location.origin}/{shortenedUrl.shortCode}
              </a>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-gray-600"
                title="Copy URL"
              >
                <FaCopy />
              </button>
            </div>
            <a
              href={`/${shortenedUrl.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              <FaExternalLinkAlt className="inline mr-1" />
              Visit
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
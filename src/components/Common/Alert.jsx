import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../redux/slices/alertSlice';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Alert = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.alert);

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeAlert(alerts[0].id));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center p-4 rounded-lg shadow-lg max-w-md ${
            alert.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex-shrink-0 mr-3">
            {alert.type === 'success' ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : (
              <FaExclamationCircle className="text-red-500 text-xl" />
            )}
          </div>
          <div className="flex-grow">
            <p
              className={`font-medium ${
                alert.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {alert.message}
            </p>
          </div>
          <button
            onClick={() => dispatch(removeAlert(alert.id))}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
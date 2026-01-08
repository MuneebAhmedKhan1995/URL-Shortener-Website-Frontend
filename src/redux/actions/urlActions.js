import {
  fetchUrlsStart,
  fetchUrlsSuccess,
  fetchUrlsFailure,
  shortenUrlStart,
  shortenUrlSuccess,
  shortenUrlFailure,
  deleteUrlStart,
  deleteUrlSuccess,
  deleteUrlFailure,
} from '../slices/urlSlice';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://URL-Shortener-backend.vercel.app/api'
  : 'http://localhost:5000/api';

export const fetchUserUrls = () => async (dispatch, getState) => {
  try {
    dispatch(fetchUrlsStart());
    const { token } = getState().auth;
    
    const response = await fetch(`${API_BASE_URL}/url/myurls`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch URLs');
    }

    dispatch(fetchUrlsSuccess(data));
  } catch (error) {
    dispatch(fetchUrlsFailure(error.message));
    toast.error(error.message);
  }
};

export const shortenUrl = (longUrl) => async (dispatch, getState) => {
  try {
    dispatch(shortenUrlStart());
    const { token } = getState().auth;
    
    const response = await fetch(`${API_BASE_URL}/url/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to shorten URL');
    }

    dispatch(shortenUrlSuccess(data));
    toast.success('URL shortened successfully!');
    return data;
  } catch (error) {
    dispatch(shortenUrlFailure(error.message));
    toast.error(error.message);
    throw error;
  }
};

export const deleteUrl = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteUrlStart());
    const { token } = getState().auth;
    
    const response = await fetch(`${API_BASE_URL}/url/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete URL');
    }

    dispatch(deleteUrlSuccess(id));
    toast.success('URL deleted successfully!');
  } catch (error) {
    dispatch(deleteUrlFailure(error.message));
    toast.error(error.message);
  }
};

export const getUrlStats = (id) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    
    const response = await fetch(`${API_BASE_URL}/url/${id}/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch stats');
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
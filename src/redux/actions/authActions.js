import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  setUser 
} from '../slices/authSlice';
import toast from 'react-hot-toast';

const API_BASE_URL = 
process.env.NODE_ENV === 'production' 
? 'https://URL-Shortener-backend.vercel.app/api'
: 'http://localhost:5000/api';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    dispatch(loginSuccess(data));
    toast.success('Login successful!');
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error(error.message);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    dispatch(registerSuccess(data));
    toast.success('Registration successful!');
  } catch (error) {
    dispatch(registerFailure(error.message));
    toast.error(error.message);
  }
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    
    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    dispatch(setUser(data.user));
  } catch (error) {
    console.error('Profile fetch error:', error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'auth/logout' });
  toast.success('Logged out successfully');
};
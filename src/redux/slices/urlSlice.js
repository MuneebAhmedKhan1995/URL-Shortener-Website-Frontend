import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: [],
  currentUrl: null,
  loading: false,
  error: null,
  stats: null,
  totalUrls: 0,
  limitReached: false,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    fetchUrlsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUrlsSuccess: (state, action) => {
      state.loading = false;
      state.urls = action.payload.urls;
      state.totalUrls = action.payload.total;
      state.limitReached = action.payload.total >= 100;
    },
    fetchUrlsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    shortenUrlStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    shortenUrlSuccess: (state, action) => {
      state.loading = false;
      state.urls.unshift(action.payload);
      state.totalUrls += 1;
      state.limitReached = state.totalUrls >= 100;
    },
    shortenUrlFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUrlStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUrlSuccess: (state, action) => {
      state.loading = false;
      state.urls = state.urls.filter(url => url.id !== action.payload);
      state.totalUrls -= 1;
      state.limitReached = state.totalUrls >= 100;
    },
    deleteUrlFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUrlError: (state) => {
      state.error = null;
    },
    clearCurrentUrl: (state) => {
      state.currentUrl = null;
    },
  },
});

export const {
  fetchUrlsStart,
  fetchUrlsSuccess,
  fetchUrlsFailure,
  shortenUrlStart,
  shortenUrlSuccess,
  shortenUrlFailure,
  deleteUrlStart,
  deleteUrlSuccess,
  deleteUrlFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  clearUrlError,
  clearCurrentUrl,
} = urlSlice.actions;

export default urlSlice.reducer;
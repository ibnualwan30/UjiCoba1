// src/services/api.js - Frontend API Service
import axios from 'axios';

// Base URL backend (sesuaikan dengan port backend Anda)
const BASE_URL = 'http://localhost:5000/api';

// Create axios instance dengan konfigurasi default
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (untuk logging atau token nanti)
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (untuk handle error global)
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// API Methods
const api = {
  // Test koneksi ke backend
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  // Upload dan analisis gambar
  analyzeImage: async (imageFile) => {
    try {
      // Buat FormData untuk upload file
      const formData = new FormData();
      formData.append('image', imageFile);

      console.log('📤 Uploading image:', imageFile.name, 'Size:', imageFile.size);

      const response = await apiClient.post('/detection/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Progress tracking (opsional)
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`📊 Upload progress: ${progress}%`);
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || 'Analysis failed');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check if backend is running.');
      } else {
        // Something else happened
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  },

  // Get history deteksi
  getDetectionHistory: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/detection/history', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get history: ${error.message}`);
    }
  },

  // Get detail deteksi berdasarkan ID
  getDetectionById: async (id) => {
    try {
      const response = await apiClient.get(`/detection/history/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get detection: ${error.message}`);
    }
  },

  // Delete deteksi dari history
  deleteDetection: async (id) => {
    try {
      const response = await apiClient.delete(`/detection/history/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete detection: ${error.message}`);
    }
  }
};

export default api;
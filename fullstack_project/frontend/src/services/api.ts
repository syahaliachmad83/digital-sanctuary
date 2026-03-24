import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 1. Inisialisasi Instance Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Opsional: timeout jika server FastAPI terlalu lama merespons
  timeout: 10000, 
});

// 2. Request Interceptor (Satpam sebelum request berangkat)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ambil token dari Local Storage (atau State Management seperti Zustand/Redux)
    const token = localStorage.getItem('access_token');
    
    // Jika token ada, sisipkan ke header Authorization
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Satpam saat respons kembali dari FastAPI)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Jika request sukses, langsung kembalikan datanya saja
    return response;
  },
  (error: AxiosError) => {
    // Tangani error global di sini
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Sesi kedaluwarsa atau token tidak valid. Silakan login kembali.");
        
        // Hapus token yang rusak/kedaluwarsa
        localStorage.removeItem('access_token');
        
        // Opsional: Redirect paksa ke halaman login (tergantung setup router Anda)
        // window.location.href = '/login'; 
      }
    } else if (error.request) {
      console.error("Tidak ada respons dari server. Pastikan FastAPI berjalan.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
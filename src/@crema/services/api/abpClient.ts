import axios from "axios";

/**
 * Axios instance dùng chung cho mọi call tới ABP Backend API.
 * - baseURL lấy từ biến môi trường VITE_API_BASE_URL
 * - Request interceptor: tự động inject Bearer token từ localStorage
 * - Response interceptor: handle lỗi 401 (token hết hạn / chưa đăng nhập)
 */
const abpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor — inject access_token nếu có
abpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("abp_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
abpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xóa token cũ, user cần login lại
      localStorage.removeItem("abp_access_token");
      localStorage.removeItem("abp_refresh_token");
      // Có thể dispatch event để AbpAuthProvider bắt và cập nhật state
      window.dispatchEvent(new Event("abp:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default abpClient;

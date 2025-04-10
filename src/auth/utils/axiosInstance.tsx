// src/utils/axiosInstance.ts
import axios from "axios";

import { TokenService } from "../services/token.service";
import { refreshAccessToken } from "../api/auth.api";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // adapt this to your Spring backend
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token automatiquement si erreur 403
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        TokenService.clearTokens();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const { accessToken } = await refreshAccessToken(refreshToken);
        TokenService.setTokens(accessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        TokenService.clearTokens();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

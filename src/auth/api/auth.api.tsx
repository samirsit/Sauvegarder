// src/api/auth.api.ts

import axios from "axios";
import { LoginRequest, TokenResponse } from "../type/auth.type";

export const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  const response = await axios.post(
    "http://localhost:8080/auth/login",
    payload
  );
  return response.data;
};
/*
export const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenResponse> => {
  const response = await axios.post(
    "http://localhost:8080/auth/refresh-token",
    { refreshToken }
  );
  return response.data;
};
*/
export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  const response = await axios.post(
    "http://localhost:8080/auth/refresh-token",
    {
      refresh_token: refreshToken, // 🟢 le nom doit matcher exactement avec le @RequestBody Token du backend
    }
  );

  return {
    accessToken: response.data.access_token, // ajuste selon ta réponse backend
  };
};

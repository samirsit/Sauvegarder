// src/utils/axiosInstance.ts
import axios from "axios";
import { TokenService } from "../services/token.service";
import { refreshAccessToken } from "../api/auth.api";

// Création de l'instance axios
const instance = axios.create({
  baseURL: "http://localhost:8080/api", // adapte cela à ton backend
});

// Intercepteur de requêtes pour ajouter le token d'accès
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses pour gérer le rafraîchissement automatique du token si une erreur 401 ou 403 survient
instance.interceptors.response.use(
  (response) => response, // Réponse réussie, rien à modifier
  async (error) => {
    const originalRequest = error.config;

    // Si le token a expiré (401 ou 403) et qu'on n'a pas déjà essayé de rafraîchir
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marque la requête pour éviter une boucle infinie

      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        // Si aucun refresh token n'est disponible, déconnecte l'utilisateur
        TokenService.clearTokens();
        window.location.href = "/"; // Redirige l'utilisateur vers la page de connexion
        return Promise.reject(error);
      }

      try {
        // Tente de rafraîchir le token avec le refreshToken
        const { accessToken } = await refreshAccessToken(refreshToken);

        // Sauvegarde les nouveaux tokens
        TokenService.setTokens(accessToken, refreshToken);

        // Modifie l'en-tête de la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Refait la requête avec le nouveau token
        return axios(originalRequest);
      } catch (err) {
        // Si le rafraîchissement échoue, déconnecte l'utilisateur
        TokenService.clearTokens();
        window.location.href = "/"; // Redirige vers la page de connexion
        return Promise.reject(err);
      }
    }

    // Si l'erreur n'est pas liée à l'authentification, rejette l'erreur
    return Promise.reject(error);
  }
);

export default instance;

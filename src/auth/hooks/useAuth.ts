// src/hooks/useAuth.ts
/*import { useState } from "react";
import { login } from "../api/auth.api";
import { TokenService } from "../services/token.service";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await login({ email, password });
      TokenService.setTokens(accessToken, refreshToken);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return { loginUser, error };
};
*/
// src/auth/hooks/useAuth.ts
import { useState } from "react";
import axios from "axios";
import { TokenService } from "../services/token.service";

export const useAuth = () => {
  const [error, setError] = useState("");

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        TokenService.setTokens(access_token, refresh_token);
        // Rediriger vers le dashboard
        window.location.href = "/dashboard";
      } else {
        setError("Tokens manquants dans la réponse du serveur.");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue.");
      }
    }
  };

  return { loginUser, error };
};

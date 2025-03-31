import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `http://localhost:8080/auth`;
  private _userToken = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);

  userToken = this._userToken.asReadonly();
  isConnected = computed(() => !!this._userToken());

  constructor() {
    const storedToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedToken) this._userToken.set(storedToken);
    if (storedRefreshToken) this._refreshToken.set(storedRefreshToken);
  }

  login(
    email: string,
    password: string
  ): Observable<{ access_token: string; refresh_token: string }> {
    return this.http
      .post<{ message: string; access_token: string; refresh_token: string }>(
        `${this.apiUrl}/login`,
        { email, password }
      )
      .pipe(
        tap((response) => {
          console.log('Réponse du backend :', response);

          if (response?.access_token && response?.refresh_token) {
            this.saveToken(response.access_token, response.refresh_token);
          } else {
            console.error('Les tokens sont invalides ou manquants !', response);
            throw new Error('Tokens invalides ou manquants.');
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de la connexion :', error);
          return throwError(() => error);
        })
      );
  }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this._userToken.set(accessToken);
    this._refreshToken.set(refreshToken);
    console.log('Token sauvegardé :', accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken') ?? null;
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this._userToken.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Déconnexion réussie');
  }

  // Méthode pour supprimer l'ancien token
  private removeToken(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<{ access_token: string; refresh_token: string }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('Aucun refresh token trouvé');
      return throwError(() => new Error('Aucun refresh token trouvé'));
    }

    return this.http
      .post<{
        access_token: string;
        refresh_token?: string;
        refreshToken?: string;
      }>(`${this.apiUrl}/refresh-token`, { refresh_token: refreshToken })
      .pipe(
        map((response) => {
          const newRefreshToken =
            response.refresh_token || response.refreshToken;
          if (!newRefreshToken) {
            throw new Error('Le refresh token rafraîchi est manquant.');
          }
          return {
            access_token: response.access_token,
            refresh_token: newRefreshToken,
          };
        }),
        tap(({ access_token, refresh_token }) => {
          this.removeToken();
          this.saveToken(access_token, refresh_token);
          console.log("Token d'accès rafraîchi :", access_token);
        }),
        catchError((error) => {
          console.error('Erreur lors du rafraîchissement du token :', error);
          return throwError(() => error);
        })
      );
  }
}

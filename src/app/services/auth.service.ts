import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

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
    const storedToken = localStorage.getItem('jwtToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedToken) {
      this._userToken.set(storedToken);
    }
    if (storedRefreshToken) {
      this._refreshToken.set(storedRefreshToken);
    }
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

          if (response && response.access_token && response.refresh_token) {
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
    localStorage.setItem('jwtToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this._userToken.set(accessToken);
    this._refreshToken.set(refreshToken);
    console.log('Token sauvegardé :', accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this._userToken.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    console.log('Déconnexion réussie');
  }

  refreshToken(): Observable<{ access_token: string; refresh_token: string }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('Aucun refresh token trouvé');
      return throwError(() => new Error('Aucun refresh token trouvé'));
    }

    return this.http
      .post<{ access_token: string; refresh_token: string }>(
        `${this.apiUrl}/refresh-token`,
        { refreshToken }
      )
      .pipe(
        tap((response) => {
          if (response && response.access_token && response.refresh_token) {
            this.saveToken(response.access_token, response.refresh_token);
            console.log("Token d'accès rafraîchi :", response.access_token);
          } else {
            console.error(
              'Les tokens rafraîchis sont invalides ou manquants !',
              response
            );
            throw new Error('Tokens rafraîchis invalides ou manquants.');
          }
        }),
        catchError((error) => {
          console.error('Erreur lors du rafraîchissement du token :', error);
          return throwError(() => error);
        })
      );
  }
}

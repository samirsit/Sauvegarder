import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  register(
    username: string,
    email: string,
    password: string,
    role: string = 'ADMIN'
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, {
        username,
        password,
        email,
        role,
      })
      .pipe(catchError(this.handleError));
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    console.log('Token saved:', token); // Vérifiez que le token est bien sauvegardé dans localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'état : ${error.status}\nMessage : ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}

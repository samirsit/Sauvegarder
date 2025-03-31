import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Students } from '../model/students';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private _students = signal<Students[]>([]);
  private apiUrl = `http://localhost:8080/api/students`;

  constructor() {}

  // GET - Récupérer tous les étudiants
  getStudents(): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      : new HttpHeaders();

    return this.http
      .get<Students[]>(`${this.apiUrl}/all-students`, { headers })
      .pipe(
        tap((response) => {
          this._students.set(response);
        }),
        catchError((error) => {
          if (error.status === 403) {
            // Tentative de rafraîchissement du token
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                // Nouvelle tentative avec le nouveau token
                const newToken = this.authService.getToken();
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.get<Students[]>(
                  `${this.apiUrl}/all-students`,
                  { headers: newHeaders }
                );
              }),
              catchError((refreshError) => {
                // Si le refresh échoue aussi
                console.error(
                  'Échec du rafraîchissement du token:',
                  refreshError
                );
                this.authService.logout();
                return throwError(() => refreshError);
              })
            );
          }
          // Pour les autres erreurs
          console.error('Erreur API:', error);
          return throwError(() => error);
        })
      );
  }

  // GET - Ajouter des étudiants
  createStudents(students: Students) {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      : new HttpHeaders();

    return this.http
      .post<Students>(`${this.apiUrl}/save-student`, students, { headers })
      .pipe(
        tap((response) => {
          this._students.update((students) => [...students, response]);
        }),
        catchError((error) => {
          if (error.status === 403) {
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                const newToken = this.authService.getToken();
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.post<Students>(
                  `${this.apiUrl}/save-student`,
                  students,
                  { headers: newHeaders }
                );
              }),
              catchError((refreshError) => {
                console.error(
                  'Échec du rafraîchissement du token:',
                  refreshError
                );
                this.authService.logout();
                return throwError(() => refreshError);
              })
            );
          }
          console.error('Erreur API:', error);
          return throwError(() => error);
        })
      );
  }

  getStudentsByCode(code: string): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      : new HttpHeaders();

    const params = { code };

    return this.http
      .get<Students[]>(`${this.apiUrl}/code`, { headers, params })
      .pipe(
        tap((response) => {
          this._students.set(response);
        }),
        catchError((error) => {
          if (error.status === 403) {
            // Tentative de rafraîchissement du token
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                // Nouvelle tentative avec le nouveau token
                const newToken = this.authService.getToken();
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.get<Students[]>(
                  `${this.apiUrl}/all-students`,
                  {
                    headers: newHeaders,
                  }
                );
              }),
              catchError((refreshError) => {
                // Si le refresh échoue aussi
                console.error(
                  'Échec du rafraîchissement du token:',
                  refreshError
                );
                this.authService.logout();
                return throwError(() => refreshError);
              })
            );
          }
          // Pour les autres erreurs
          console.error('Erreur API:', error);
          return throwError(() => error);
        })
      );
  }

  getStudentsByEmail(email: string): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      : new HttpHeaders();

    const params = { email };

    return this.http
      .get<Students[]>(`${this.apiUrl}/email`, { headers, params })
      .pipe(
        tap((response) => {
          this._students.set(response);
        }),
        catchError((error) => {
          if (error.status === 403) {
            // Tentative de rafraîchissement du token
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                // Nouvelle tentative avec le nouveau token
                const newToken = this.authService.getToken();
                const newHeaders = new HttpHeaders({
                  Authorization: `Bearer ${newToken}`,
                });
                return this.http.get<Students[]>(
                  `${this.apiUrl}/all-students`,
                  {
                    headers: newHeaders,
                  }
                );
              }),
              catchError((refreshError) => {
                // Si le refresh échoue aussi
                console.error(
                  'Échec du rafraîchissement du token:',
                  refreshError
                );
                this.authService.logout();
                return throwError(() => refreshError);
              })
            );
          }
          // Pour les autres erreurs
          console.error('Erreur API:', error);
          return throwError(() => error);
        })
      );
  }
}

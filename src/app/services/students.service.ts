import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
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

  private handleAuthError<T>(
    operation: string,
    url: string,
    params?: HttpParams
  ) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 403) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = this.authService.getToken();
            const newHeaders = new HttpHeaders({
              Authorization: `Bearer ${newToken}`,
            });
            return params
              ? this.http.get<T>(url, { headers: newHeaders, params })
              : this.http.get<T>(url, { headers: newHeaders });
          }),
          catchError((refreshError) => {
            console.error(
              `Échec du rafraîchissement du token pour ${operation}:`,
              refreshError
            );
            this.authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      console.error(`Erreur API pour ${operation}:`, error);
      return throwError(() => error);
    };
  }

  getStudents(): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<Students[]>(`${this.apiUrl}/all-students`, { headers })
      .pipe(
        tap((response) => this._students.set(response)),
        catchError(
          this.handleAuthError<Students[]>(
            'getStudents',
            `${this.apiUrl}/all-students`
          )
        )
      );
  }

  createStudents(students: Students): Observable<Students> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<Students>(`${this.apiUrl}/save-student`, students, { headers })
      .pipe(
        tap((response) => this._students.update((list) => [...list, response])),
        catchError(
          this.handleAuthError<Students>(
            'createStudents',
            `${this.apiUrl}/save-student`
          )
        )
      );
  }

  getStudentsByCode(code: string): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    const params = new HttpParams().set('code', code);

    return this.http
      .get<Students[]>(`${this.apiUrl}/code`, { headers, params })
      .pipe(
        catchError(
          this.handleAuthError<Students[]>(
            'getStudentsByCode',
            `${this.apiUrl}/code`,
            params
          )
        )
      );
  }

  getStudentsByEmail(email: string): Observable<Students[]> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    const params = new HttpParams().set('email', email);

    return this.http
      .get<Students[]>(`${this.apiUrl}/email`, { headers, params })
      .pipe(
        catchError(
          this.handleAuthError<Students[]>(
            'getStudentsByEmail',
            `${this.apiUrl}/email`,
            params
          )
        )
      );
  }

  deleteStudentsByCode(code: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .delete<void>(`${this.apiUrl}/code?code=${code}`, { headers })
      .pipe(
        catchError(
          this.handleAuthError<void>(
            'deleteStudentsByCode',
            `${this.apiUrl}/code?code=${code}`
          )
        )
      );
  }

  deleteStudentsByEmail(email: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    const params = new HttpParams().set('email', email);

    return this.http
      .delete<void>(`${this.apiUrl}/email?email=${email}`, { headers, params })
      .pipe(
        catchError(
          this.handleAuthError<void>(
            'deleteStudentsByEmail',
            `${this.apiUrl}/email?email=${email}`,
            params
          )
        )
      );
  }

  updateStudents(students: Students, code: string): Observable<Students> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .put<Students>(`${this.apiUrl}/code?code=${code}`, students, { headers })
      .pipe(
        catchError(
          this.handleAuthError<Students>(
            'updateStudents',
            `${this.apiUrl}/code?code=${code}`
          )
        )
      );
  }
}

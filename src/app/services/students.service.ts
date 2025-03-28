import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
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
          console.error(
            'Erreur lors de la récupération des étudiants :',
            error
          );
          throw error;
        })
      );
  }
}

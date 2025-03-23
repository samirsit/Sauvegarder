import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../../model/students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Students[]> {
    // Récupérer le token depuis le localStorage (ou un autre mécanisme de stockage)
    const token = localStorage.getItem('jwtToken'); // Par exemple, si vous stockez le token ici

    // Vérifiez si un token est disponible avant d'ajouter l'en-tête Authorization
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token, // Ajouter le token au header
        })
      : new HttpHeaders();

    return this.http.get<Students[]>(`${this.baseUrl}/all-students`, {
      headers,
    });
  }
}

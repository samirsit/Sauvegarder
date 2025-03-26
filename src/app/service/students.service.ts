import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../model/students';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs'; // Pour gérer les erreurs de manière propre

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les étudiants
  getUsers(): Observable<Students[]> {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('jwtToken');

    // Créer les headers avec le token si disponible
    const headers = token
      ? new HttpHeaders({
          Authorization: 'Bearer ' + token, // Ajouter le token au header
        })
      : new HttpHeaders();

    return this.http
      .get<any[]>(`${this.baseUrl}/all-students`, { headers })
      .pipe(
        // Transformation des données pour correspondre au modèle Students
        map((data) => {
          console.log('Raw Data:', data);
          return data.map((student) => ({
            code: student.code,
            firstname: student.firstName,
            lastname: student.lastname,
            email: student.email,
            phone: student.phone,
            speciality: student.speciality,
            entryDate: student.entryAt ? new Date(student.entryAt) : null,
            departureDate: student.firstDepartureMissionAt
              ? new Date(student.firstDepartureMissionAt)
              : null,
            createdDate: student.createdAt ? new Date(student.createdAt) : null,
          }));
        }),
        // Gestion des erreurs si l'appel échoue
        catchError((error) => {
          console.error('Erreur lors de la récupération des étudiants:', error);
          return of([]); // Retourner un tableau vide en cas d'erreur
        })
      );
  }
}

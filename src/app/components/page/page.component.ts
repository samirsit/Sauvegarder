import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { Students } from '../../model/students';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page',
  imports: [CommonModule, FormComponent, FormsModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  standalone: true, // Utilisez standalone pour un composant autonome
})
export class PageComponent implements OnInit {
  students: Students[] = [];
  filterStudents: Students[] = [];
  showForm = false;
  searchQuery: string = ''; // Stocke la valeur de l'entrée de l'utilisateur
  searchType: string = 'code'; // Type de recherche sélectionné (par défaut : code)

  constructor(
    private authService: AuthService,
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des étudiants :', error);
        if (error.status === 401) {
          console.log('Déconnexion due à une erreur 401');
          this.authService.logout();
          this.router.navigateByUrl('');
        }
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Méthode appelée lorsque le formulaire est soumis
  onFormSubmitted() {
    console.log('Le formulaire a été soumis !');
    // Ici, vous pouvez ajouter la logique nécessaire après la soumission du formulaire
  }
  onSubmit() {
    if (!this.searchQuery.trim()) {
      console.error('Veuillez entrer une valeur pour rechercher.');
      return;
    }

    // Appel de la méthode appropriée en fonction du type de recherche
    if (this.searchType === 'code') {
      this.studentsService.getStudentsByCode(this.searchQuery).subscribe({
        next: (response) => {
          this.filterStudents = response; // Stocke les résultats
          console.log('Résultats par code:', response);
        },
        error: (err) => {
          console.error('Erreur lors de la recherche par code:', err);
        },
      });
    } else if (this.searchType === 'email') {
      this.studentsService.getStudentsByEmail(this.searchQuery).subscribe({
        next: (response) => {
          this.filterStudents = response; // Stocke les résultats
          console.log('Résultats par email:', response);
        },
        error: (err) => {
          console.error('Erreur lors de la recherche par email:', err);
        },
      });
    }
  }
}

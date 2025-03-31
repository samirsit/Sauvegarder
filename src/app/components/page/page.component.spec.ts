import { Component, inject, OnInit } from '@angular/core';
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
  private authService = inject(AuthService);
  private router = inject(Router);
  private studentsService = inject(StudentsService);

  students: Students[] = [];

  constructor() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  // Fonction pour récupérer les étudiants
  loadStudents(): void {
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

  // Propriété pour gérer l'affichage du formulaire
  showForm = false;

  // Méthode pour afficher/masquer le formulaire
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Méthode pour gérer la soumission du formulaire
  onFormSubmitted(): void {
    this.loadStudents(); // Recharge la liste des étudiants après l'ajout
    this.toggleForm(); // Cache le formulaire après l'ajout
  }
}
